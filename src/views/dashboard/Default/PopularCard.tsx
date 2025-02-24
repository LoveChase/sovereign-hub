import React from 'react';

// material-ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

interface PopularCardProps {
    isLoading: boolean;
    recentBookings?: Array<{
        _id: string;
        pickupLocation: string;
        dropoffLocation: string;
        status: string;
        pickupDate: string;
        pickupTime: string;
        amount: number;
    }>;
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'completed':
            return 'success';
        case 'pending':
            return 'warning';
        case 'cancelled':
            return 'error';
        default:
            return 'default';
    }
};

const PopularCard = ({ isLoading, recentBookings = [] }: PopularCardProps) => {
    const [anchorEl, setAnchorEl] = React.useState<Element | (() => Element) | null | undefined>(null);

    const handleClick = (event: React.SyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (isLoading) {
        return <SkeletonPopularCard />;
    }

    return (
        <>
            <MainCard content={false} title="Recent Bookings">
                <CardContent>
                    {recentBookings.length === 0 ? (
                        <Typography variant="body2" color="textSecondary">
                            No recent bookings found.
                        </Typography>
                    ) : (
                        recentBookings.map((booking, index) => (
                            <React.Fragment key={booking._id}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item>
                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        bgcolor: 'primary.light',
                                                        color: 'primary.dark'
                                                    }}
                                                >
                                                    <DirectionsCarIcon fontSize="small" />
                                                </Avatar>
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography variant="subtitle1">
                                                    {booking.pickupLocation} → {booking.dropoffLocation}
                                                </Typography>
                                                <Typography variant="subtitle2" color="textSecondary">
                                                    {new Date(booking.pickupDate).toLocaleDateString()} at {new Date(booking.pickupTime).toLocaleTimeString()}
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    Amount: ${booking.amount}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Chip
                                                    label={booking.status}
                                                    size="small"
                                                    color={getStatusColor(booking.status) as any}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {index < recentBookings.length - 1 && (
                                    <Divider sx={{ my: 1.5 }} />
                                )}
                            </React.Fragment>
                        ))
                    )}
                </CardContent>
            </MainCard>
        </>
    );
};

export default PopularCard;
