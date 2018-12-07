import React, { Component } from 'react';
import '../css/App.css';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    rightIcon: {
        marginLeft: theme.spacing.unit
    }
});

class ShowNewGist extends Component {
    constructor() {
        super();
        const gistUnknown = {
            0: {
                htmlUrl: '#',
                id: 'unknown',
                gitPullUrl: '#',
                description: 'unknown',
                ownerLogin: 'unknown',
                avatarUrl: 'unknown',
                files: 'unknown'
            }
        };

        this.state = {
            gitCount: 0,
            gitGist: gistUnknown,
            index: 0,
            prev_disabled_btn: true,
            next_disabled_btn: true
        };
    }

    fetchGitList = () => {
        this.setState({ next_disabled_btn: false });

        const that = this;
        fetch('/gists/get-basic-list')
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                //console.log('parsed json', json);
                let newState = {
                    gitCount: json.count,
                    gitGist: json.result
                };
                that.setState(() => newState);
            })
            .catch(function(ex) {
                console.log(
                    'parsing failed, URL bad, network down, or similar',
                    ex
                );
            });
    };

    gistIterator(id) {
        //console.log(id);

        let index = this.state.index;
        let length = this.state.gitCount;

        if (id === 'prevGist') {
            if (index !== 0) {
                this.setState({ index: this.state.index - 1 });
                this.setState({ prev_disabled_btn: false });
            }

            if (index < length) {
                this.setState({ next_disabled_btn: false });
            }

            if (index === 1) {
                this.setState({ prev_disabled_btn: true });
            }
        }

        if (id === 'nextGist') {
            if (index >= 0 && index < length - 1) {
                this.setState({ index: this.state.index + 1 });
                this.setState({ prev_disabled_btn: false });
            }

            if (index === length - 2) {
                this.setState({ next_disabled_btn: true });
            }
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                {/*get Git info*/}
                <p className="App-intro">
                    Git HTML URL:{' '}
                    <a href={this.state.gitGist[this.state.index].htmlUrl}>
                        {this.state.gitGist[this.state.index].htmlUrl}
                    </a>
                </p>
                <p className="App-intro">
                    Git ID: {this.state.gitGist[this.state.index].id}
                </p>
                <p className="App-intro">
                    Git Pull URL:{' '}
                    <a href={this.state.gitGist[this.state.index].gitPullUrl}>
                        {this.state.gitGist[this.state.index].gitPullUrl}
                    </a>
                </p>
                <p className="App-intro">
                    Git Description:{' '}
                    {this.state.gitGist[this.state.index].description}
                </p>
                <p className="App-intro">
                    Git Owner Login:{' '}
                    {this.state.gitGist[this.state.index].ownerLogin}
                </p>
                <div>
                    <p>
                        <img
                            className="avatar"
                            src={this.state.gitGist[this.state.index].avatarUrl}
                            alt="Git Avatar"
                        />
                    </p>
                </div>
                <p className="App-intro">
                    Git Files: {this.state.gitGist[this.state.index].files}
                </p>

                <Button
                    id="prevGist"
                    variant="raised"
                    color="primary"
                    onClick={e => this.gistIterator('prevGist', e)}
                >
                    Back
                </Button>

                <Button
                    id="queryGitGistsBtn"
                    variant="raised"
                    color="primary"
                    onClick={this.fetchGitList}
                >
                    <Icon className={classes.rightIcon}>account_box</Icon> Query
                    Git Gists
                </Button>

                <Button
                    id="nextGist"
                    variant="raised"
                    color="primary"
                    onClick={e => this.gistIterator('nextGist', e)}
                >
                    Next
                </Button>

                <pre>
                    {this.state.index} / { this.state.gitCount === 0 ? '?' : this.state.gitCount - 1 }
                </pre>
            </div>
        );
    }
}

ShowNewGist.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ShowNewGist);
