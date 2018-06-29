import React from 'react';
import PropTypes from 'prop-types';
import Date from 'datejs'

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
    deleteButton: theme.overrides.MuiIcon,
    titleFont:{
        title: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
        }
    },
    cardContent:{
        root:{
          wordWrap: 'break-word'
        }
      }
})


const UserPollCard = ({classes, theme, pollActions, poll }) =>{
    return (
    <div className={classes.container}>
    <Paper square elevation={2} className={classes.container}>
                <Card style={{padding:7}}>
                <CardHeader
                    action={pollActions}
                    className={classes.cardHeader}
                    title={poll.author_username}
                    // style={{color:'white'}}
                    classes={{
                        title: classes.cardHeader
                    }}
                />
                <Link to={{
                pathname:`/poll/${poll.author_username}/${poll.created_at}`,
                state: poll,
                }}
                style={{ textDecoration: 'none' }}
                >
                <CardContent className={classes.cardContent}>
                    <Typography variant="display3">
                    "{poll.question}"
                    </Typography>
                </CardContent>
                <CardContent>
                <Typography variant="subheading" component="p">
                        {poll.subject}
                    </Typography>
                <Typography variant="subheading" component="p">
                        Poll Expiration: {poll.expiration} hours
                    </Typography>
                
                    {/* <Typography variant="subheading" component="p">
                        {'Author: '+poll.author_username}
                    </Typography> */}
                </CardContent>
                </Link>
                </Card>
        </Paper>
    </div>
    )
}


export default compose(
    withRouter,
    withStyles(styles, {withTheme:true}),
)(UserPollCard);