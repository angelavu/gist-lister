import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import ElfHeader from '../components/ElfHeader';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('App Tests', function() {
    const themeDark = createMuiTheme({
        palette: {
            type: 'dark'
        }
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider theme={themeDark}>
                <App />
            </MuiThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('expects ElfHeader component', () => {
        const wrapper = shallow(<App />);
        const component = <ElfHeader />;
        expect(wrapper.contains(component)).toEqual(true);
    });
});
