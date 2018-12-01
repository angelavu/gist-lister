import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const themeDark = createMuiTheme({
    palette: {
        type: 'dark'
    }
});

ReactDOM.render(
    <MuiThemeProvider theme={themeDark}>
        <App />
    </MuiThemeProvider>,
    document.getElementById('root')
);
registerServiceWorker();
