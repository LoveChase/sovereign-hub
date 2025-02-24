import { useState, useEffect } from 'react';
import { getCurrentUser } from 'api/auth';
import { getBookings } from 'api/bookings';
import axios, { AxiosError } from 'axios';

interface ApiErrorResponse {
    status: string;
    message: string;
}

interface Booking {
    _id: string;
    userId: string;
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    pickupTime: string;
    passengers: number;
    hours: number;
    specialRequests: string;
    status: 'pending' | 'completed' | 'cancelled';
    amount: number;
    createdAt: string;
    updatedAt: string;
}

interface DashboardData {
    totalBookings: number;
    completedBookings: number;
    pendingBookings: number;
    cancelledBookings: number;
    recentBookings: Booking[];
    userDetails: {
        firstName: string;
        lastName: string;
        email: string;
    } | null;
    loading: boolean;
    error: string | null;
}

const useDashboardData = (): DashboardData => {
    const [data, setData] = useState<DashboardData>({
        totalBookings: 0,
        completedBookings: 0,
        pendingBookings: 0,
        cancelledBookings: 0,
        recentBookings: [],
        userDetails: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                console.log('Fetching dashboard data...');
                const token = localStorage.getItem('serviceToken');
                console.log('Token:', token);

                if (!token) {
                    throw new Error('No authentication token found');
                }

                const [userResponse, bookingsResponse] = await Promise.all([
                    getCurrentUser(),
                    getBookings()
                ]);

                console.log('User response:', userResponse);
                console.log('Bookings response:', bookingsResponse);

                // Extract bookings array from response and ensure it's an array
                const bookings = Array.isArray(bookingsResponse.data?.bookings) 
                    ? bookingsResponse.data.bookings 
                    : [];

                // Sort bookings by creation date (newest first)
                const sortedBookings = [...bookings].sort((a, b) => 
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                
                setData({
                    totalBookings: bookings.length,
                    completedBookings: bookings.filter((b: Booking) => b.status === 'completed').length,
                    pendingBookings: bookings.filter((b: Booking) => b.status === 'pending').length,
                    cancelledBookings: bookings.filter((b: Booking) => b.status === 'cancelled').length,
                    recentBookings: sortedBookings.slice(0, 5), // Get last 5 bookings
                    userDetails: userResponse.data?.user ? {
                        firstName: userResponse.data.user.firstName,
                        lastName: userResponse.data.user.lastName,
                        email: userResponse.data.user.email
                    } : null,
                    loading: false,
                    error: null
                });
            } catch (error) {
                console.error('Dashboard data fetch error:', error);
                
                let errorMessage = 'Failed to load dashboard data';
                
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<ApiErrorResponse>;
                    errorMessage = axiosError.response?.data?.message 
                        || axiosError.message 
                        || errorMessage;
                    
                    console.error('Error details:', {
                        message: axiosError.message,
                        response: axiosError.response?.data,
                        status: axiosError.response?.status
                    });
                }
                
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: errorMessage
                }));
            }
        };

        fetchDashboardData();
    }, []);

    return data;
};

export default useDashboardData; 