// material-ui
import { useTheme } from '@mui/material/styles';

// types
import { ThemeMode } from 'types/config';

import logo from 'assets/images/logo.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO PNG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <img src={logo} alt="Sovereign Ride" width="92" />
    );
};

export default Logo;
