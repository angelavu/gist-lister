import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import { Link } from 'react-router-dom';

export const gitItems = (
    <div>
        <ListItem button component={Link} to="/">
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Git User" />
        </ListItem>
        <ListItem button component={Link} to="/show-new-gist">
            <ListItemIcon>
                <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Show New Gist" />
        </ListItem>
    </div>
);
