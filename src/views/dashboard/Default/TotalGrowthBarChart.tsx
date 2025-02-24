import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';

// types
import { ThemeMode } from 'types/config';

interface ChartData {
    name: string;
    data: number[];
}

interface TotalGrowthBarChartProps {
    isLoading: boolean;
    bookingData?: {
        labels: string[];
        series: {
            name: string;
            data: number[];
        }[];
    };
}

const TotalGrowthBarChart = ({ isLoading, bookingData }: TotalGrowthBarChartProps) => {
    const theme = useTheme();
    const mode = theme.palette.mode;

    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    const defaultChartData = {
        height: 480,
        type: 'bar' as const,
        options: {
            chart: {
                id: 'bar-chart',
                stacked: true,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom' as const,
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%'
                }
            },
            xaxis: {
                type: 'category' as const,
                categories: bookingData?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        colors: [
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary,
                            primary
                        ]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: mode === ThemeMode.DARK ? darkLight : grey200
            },
            tooltip: {
                theme: mode === ThemeMode.DARK ? 'dark' : 'light'
            },
            legend: {
                position: 'right' as const,
                offsetY: 40,
                labels: {
                    colors: primary
                }
            },
            fill: {
                opacity: 1
            }
        },
        series: bookingData?.series || [
            {
                name: 'Completed',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: 'Pending',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            },
            {
                name: 'Cancelled',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    };

    const [chartData] = useState(defaultChartData);

    if (isLoading) {
        return <SkeletonTotalGrowthBarChart />;
    }

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h3">Booking Trends</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Chart {...chartData} />
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default TotalGrowthBarChart;
