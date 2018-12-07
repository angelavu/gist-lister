import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header';
import Adapter from 'enzyme-adapter-react-16';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { BrowserRouter } from 'react-router-dom';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Header Tests', function() {
    const themeDark = createMuiTheme({
        palette: {
            type: 'dark'
        }
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider theme={themeDark}>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </MuiThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders title and tests with containsMatchingElement', () => {
        const wrapper = shallow(<Header />);
        const target = <Typography>Gist Lister</Typography>;
        expect(wrapper.dive().containsMatchingElement(target)).toBe(true);
    });
});
