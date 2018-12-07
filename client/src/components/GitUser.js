import React, { Component } from 'react';
import '../css/App.css';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    rightIcon: {
        marginLeft: theme.spacing.unit
    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        backgroundColor: '#fff',
        margin: '2em'
    },
});

class GitUser extends Component {
    constructor() {
        super();
        this.state = {
            login: 'Unknown Github login'
        };
    }

    queryGithubUser = () => {
        const that = this;
        fetch('/git-api/user')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                //console.log('parsed json', json);
                that.setState(() => json.body);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                {/*get Git info*/}
                <Paper className={classes.root} elevation={1}>
                    <h1>Query Angela's GitHub</h1>
                    <p className="App-intro">Git Login: {this.state.login}</p>
                    <p className="App-intro">Git Name: {this.state.name}</p>
                    <p className="App-intro">
                        Git Public Repos: {this.state.public_repos}
                    </p>
                    <p className="App-intro">Git HTML URL: {this.state.html_url}</p>
                    <div>
                        <p>
                            <img
                                className="avatar"
                                src={this.state.avatar_url}
                                alt="Git Avatar"
                            />
                        </p>
                    </div>

                    <Button
                        id="queryGitUserBtn"
                        variant="raised"
                        color="primary"
                        onClick={this.queryGithubUser}
                    >
                        <Icon className={classes.rightIcon}>account_box</Icon> Query
                        Git user
                    </Button>
                </Paper>
            </div>
        );
    }
}

GitUser.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GitUser);
