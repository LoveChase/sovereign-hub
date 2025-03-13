import { useEffect } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../../../ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../../ui-component/cards/TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';

import { gridSpacing } from 'store/constant';
import useDashboardData from 'hooks/useDashboardData';

// assets
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const {
        totalBookings,
        completedBookings,
        pendingBookings,
        cancelledBookings,
        recentBookings,
        loading: isLoading,
        error
    } = useDashboardData();

    console.log('Dashboard Data:', {
        totalBookings,
        completedBookings,
        pendingBookings,
        cancelledBookings,
        recentBookings
    });

    // Prepare data for the bar chart
    const bookingData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            {
                name: 'Completed',
                data: Array(12).fill(0)
            },
            {
                name: 'Pending',
                data: Array(12).fill(0)
            },
            {
                name: 'Cancelled',
                data: Array(12).fill(0)
            }
        ]
    };

    // Process bookings into monthly data
    if (recentBookings && recentBookings.length > 0) {
        console.log('Processing bookings for chart:', recentBookings);
        
        recentBookings.forEach(booking => {
            const date = new Date(booking.pickupDate);
            const month = date.getMonth(); // 0-based index (0 = January)
            const status = booking.status.toLowerCase();
            
            console.log('Processing booking:', {
                date: date.toISOString(),
                month,
                status,
                pickupDate: booking.pickupDate
            });
            
            // Increment the appropriate counter based on status and month
            if (status === 'completed') {
                bookingData.series[0].data[month]++;
            } else if (status === 'pending') {
                bookingData.series[1].data[month]++;
            } else if (status === 'cancelled') {
                bookingData.series[2].data[month]++;
            }
        });

        console.log('Final chart data:', bookingData);
    } else {
        console.log('No bookings available for chart');
    }

    if (error) {
        return (
            <MainCard>
                <Typography color="error">Error loading dashboard data. Please try again later.</Typography>
            </MainCard>
        );
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <TotalIncomeLightCard
                            isLoading={isLoading}
                            total={totalBookings}
                            label="Total Bookings"
                            icon={<DirectionsCarIcon fontSize="inherit" />}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <TotalIncomeLightCard
                            isLoading={isLoading}
                            total={pendingBookings}
                            label="Pending Bookings"
                            icon={<PendingActionsIcon fontSize="inherit" />}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <TotalIncomeLightCard
                            isLoading={isLoading}
                            total={completedBookings}
                            label="Completed Rides"
                            icon={<CheckCircleIcon fontSize="inherit" />}
                        />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={12}>
                        <TotalIncomeLightCard
                            isLoading={isLoading}
                            total={cancelledBookings}
                            label="Cancelled Bookings"
                            icon={<CancelIcon fontSize="inherit" />}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} bookingData={bookingData} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} recentBookings={recentBookings} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
