import React from 'react';
import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom'


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


import MaterialStyles from '../../style/material-ui-style'


import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import MenuList from '@material-ui/core/MenuList';
import Snackbar from '@material-ui/core/Snackbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DropDownArrowIcon from '@material-ui/icons/ArrowDropDown'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import ArrayBackIcon from '@material-ui/icons/arrowback';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    container: theme.overrides.MuiPaper.root,
    helpBarButton:theme.uniqueStyles.helpBarButton,
    backButton: theme.uniqueStyles.backButton,
    text: theme.typography.text,
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    actions: {
      display: 'flex',
    },
})



const Help = ({...props}) => {
  console.log('hitting help FEATRURE', props)
  return (
<div className={props.classes.container}>
<Button
          size='small'
          className={props.classes.backButton}
          onClick={props.history.goBack}
        >
          <ArrayBackIcon/>
        </Button>


            <Button
            className={props.classes.helpBarButton}
            size='small'
            >
            <CardActions 
              disableActionSpacing
              onClick={props.handleHelpExpand}
              disableActionSpacing
              className="help-card-actions"
              style={{boxSizing:'initial'}}
            >
                <Typography className={props.classes.text} variant="title">
                  Help
                </Typography>
                
                <IconButton
                  className={classnames(props.classes.expand, {
                    [props.classes.expandOpen]: props.helpExpanded,
                  })}
                  // onClick={this.handleExpandClick}
                  aria-expanded={props.helpExpanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon style={{color:'white'}}/>
                </IconButton>
              </CardActions>
            <Collapse in={props.helpExpanded} timeout="auto" unmountOnExit>
              <CardContent>
                  <Typography className={props.classes.text}>
                  {props.helpText}
                </Typography>
              </CardContent>
            </Collapse>
            </Button>
        </div>
  )
}

Help.proptypes = {
    helpText: PropTypes.string.isRequired,
    handleHelpExpand: PropTypes.func.isRequired,
    helpExpanded: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
}


const HelpTab = compose(
  withRouter,
    withStyles(styles, {withTheme:true}),
    )(Help);
    
export default HelpTab