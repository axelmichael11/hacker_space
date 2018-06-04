import React from 'react';
import PropTypes from 'prop-types';


import { Link, withRouter } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'
import InfiniteScroll from 'react-infinite-scroller'
import {  compose } from 'recompose'

import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Delete from '@material-ui/icons/Delete';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


const styles = theme =>({
    container: theme.overrides.MuiPaper.root,
    cardHeader:theme.overrides.PollCard.cardHeader,
    deleteButton: theme.overrides.MuiIcon
})


const UserPollCard = ({question, subject, author_username, created_at, classes, theme, pollActions, poll }) =>
<div className={classes.container}>
 <Paper square elevation={2} className={classes.container}>
            <Card>
            <CardHeader
                action={pollActions}
                className={classes.cardHeader}
            />
            <Link to={{
            pathname:`/poll/${author_username}/${created_at}`,
            state: {question, subject, author_username, created_at }
            }}
            style={{ textDecoration: 'none' }}
            >
            <CardContent>
                <Typography variant="headline" component="h1">
                   "{question}"
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="subheading" component="p">
                    {subject}
                </Typography>
                <Typography variant="subheading" component="p">
                    {'Posted By: '+author_username}
                </Typography>
            </CardContent>
            </Link>
            </Card>
    </Paper>
</div>


export default compose(
    withRouter,
    withStyles(styles, {withTheme:true}),
)(UserPollCard);