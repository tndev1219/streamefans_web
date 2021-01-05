/**
 * App Dark Theme
 */
import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
   palette: {
      type: 'dark',
      types: {
         dark: {
            background: {
               paper: '#333',
               default: '#333',
               appBar: '#333',
               contentFrame: '#333',
               chip: '#333',
               avatar: '#333',
               tabs: '#333',
            },
         },
      },
      primary: {
         light: grey[400],
         main: grey[700],
         dark: grey[900],
         contrastText: '#fff',
      },
      secondary: {
         light: grey[700],
         main: grey[700],
         dark: grey[700],
         contrastText: '#fff',
      },
      background: {
         paper: '#333',
         default: '#333',
         appBar: '#333',
         contentFrame: '#333',
         chip: '#333',
         avatar: '#333',
         tabs: '#333',
      },
   },
   status: {
      danger: 'orange',
   },
   typography: {
      button: {
         fontWeight: 400,
         textAlign: 'capitalize',
      },
   },
});

export default theme;
