import axios from 'utils/axios';

// Types
interface CreateBookingData {
    pickupLocation: string;
    dropoffLocation: string;
    pickupDate: string;
    pickupTime: string;
    passengers: number;
    hours: number;
    specialRequests?: string;
    amount: number;
}

interface UpdateBookingStatusData {
    status: 'pending' | 'confirmed' | 'cancelled';
}

// API endpoints
export const endpoints = {
    create: '/bookings',
    list: '/bookings',
    getById: (id: string) => `/bookings/${id}`,
    updateStatus: (id: string) => `/bookings/${id}/status`,
    cancel: (id: string) => `/bookings/${id}/cancel`
};

// API functions
export const createBooking = async (data: CreateBookingData) => {
    const response = await axios.post(endpoints.create, data);
    return response.data;
};

export const getBookings = async () => {
    const response = await axios.get(endpoints.list);
    return response.data;
};

export const getBookingById = async (id: string) => {
    const response = await axios.get(endpoints.getById(id));
    return response.data;
};

export const updateBookingStatus = async (id: string, data: UpdateBookingStatusData) => {
    const response = await axios.patch(endpoints.updateStatus(id), data);
    return response.data;
};

export const cancelBooking = async (id: string) => {
    const response = await axios.post(endpoints.cancel(id));
    return response.data;
}; 