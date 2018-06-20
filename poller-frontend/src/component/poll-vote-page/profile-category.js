import React from 'react'
import { connect } from 'react-redux'
// import { checkProfileExists } from '../../action/profile-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {recompose, compose} from 'recompose'
import {ageValidation} from '../../lib/util.js'



import {
  profileUpdate,
} from '../../action/profile-actions.js'
import classnames from 'classnames';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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

import country_list from '../../lib/countries.js'
import profession_list from '../../lib/professions.js'
import ethnicity_list from '../../lib/ethnicities.js'

import MaterialStyles from '../../style/material-ui-style'


const styles = theme => ({
  container: theme.overrides.MuiPaper,
  listItem:theme.overrides.MuiListItem.container,
  cardHeader:theme.overrides.PollCard.cardHeader,
  cardContent:theme.overrides.PollCard.cardContent,
  // listItemText:theme.overrides.MuiListItem.container
})


const ProfileCategory = ({...props})=> {
  let {classes} = props
  let {age, profession, religion, ethnicity, gender, country} = props.userProfile

  let profileInformation = {
    'Age':age,
    'Profession':profession_list[profession], 
    'Religion': religion, 
    'Ethnicity':ethnicity_list[ethnicity], 
    'Gender': gender, 
    'Country':country_list[country]
  }

    console.log('this is the profile information!!!!!', props, profileInformation)
     return (
       <div>
        {Object.keys(profileInformation).map((category,i)=>
          <div key={i}> 
            <CardContent className={classes.cardContent}>
             <Toolbar className={classes.cardContent}>
              <Typography variant="subheading" style={{width:'50%'}}>
                {category}
              </Typography>
            <div>
              <List>
                <ListItem
                  button
                  className={classes.listItem}
                >
                  <ListItemText
                    primary={profileInformation[category] ? profileInformation[category]: "Unknown"}
                  />
                </ListItem>
              </List>
            </div>
          </Toolbar>
        </CardContent>
      </div>)}
    </div>
    )
}

export const mapStateToProps = state => ({
    userProfile: state.userProfile,
  })
  
export const mapDispatchToProps = dispatch => ({
})







export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(ProfileCategory);