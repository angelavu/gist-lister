import React from 'react';
import ReactDOM from 'react-dom';
import GitUser from '../components/GitUser';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
configure({ adapter: new Adapter() });

describe('GitUser Tests', function() {
    const themeDark = createMuiTheme({
        palette: {
            type: 'dark'
        }
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <MuiThemeProvider theme={themeDark}>
                <GitUser />
            </MuiThemeProvider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders git login after button click', () => {
        const wrapper = shallow(<GitUser />);
        const login = <p className="App-intro">Git Login: angelavu</p>;
        wrapper.find('#queryGitUserBtn').simulate('click');
        expect(wrapper.containsMatchingElement(login)).toBe(true);
    });
});
