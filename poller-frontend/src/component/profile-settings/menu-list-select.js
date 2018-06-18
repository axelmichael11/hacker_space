import React from 'react'
import { connect } from 'react-redux'
// import { checkProfileExists } from '../../action/profile-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {recompose, compose} from 'recompose'
import {ageValidation} from '../../lib/util.js'




import PropTypes from 'prop-types';
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
  ageSelect:{
    marginLeft: 15,
  },
  listContainer: theme.overrides.MuiListItem.container,
  listItem:theme.overrides.MuiListItem,
  listTitle: theme.overrides.MuiListItem.title,
})


const MenuListSelect = ({list, listTitle, handleOpenList, selectedItem, anchorEl, handleCloseList,  classes, theme, renderMenuItems, changeListValue })=> {


      return (
      <CardContent className={classes.cardContent}>
        <Toolbar className={classes.cardContent}>
            <Typography variant="subheading" component="h3" className={classes.listTitle}>
                {listTitle}
            </Typography>
        <div className={classes.listContainer}>
         <List component="nav">
      <ListItem
        button
        aria-haspopup="true"
        aria-controls="lock-menu"
        aria-label="When device is locked"
        onClick={handleOpenList}
        className={classes.listItem}
      >
        <ListItemText
          primary={selectedItem}
          // secondary={country_list[this.state.country]}
          // className={classes.listContainer}
        />
        <DropDownArrowIcon/>

      </ListItem>
    </List>
    <Menu
      id="lock-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleCloseList}
      PaperProps={{
        style: {
          maxHeight: 48 * 4.5,
          maxWidth: 300,
        },
      }}
    >
      <MenuItem
      value={null}
      style={{...classes.text}}
      onClick={event => changeListValue(null)}
      >
        I don't wish to answer
      </MenuItem>
      {renderMenuItems(list, changeListValue)}
    </Menu>
    </div>
    </Toolbar>
    </CardContent>
    )
}


// list, listTitle, handleListItemClick, selectedItem, anchorEl, handleCloseList,
MenuListSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  listTitle: PropTypes.string.isRequired,
  handleOpenList: PropTypes.func.isRequired,
  changeListValue: PropTypes.func.isRequired, 
  selectedItem: PropTypes.string.isRequired,
  handleCloseList: PropTypes.func.isRequired,
  // anchorEl: PropTypes.object,
  renderMenuItems: PropTypes.func.isRequired
};




export default compose(
  withStyles(styles, {withTheme:true}),
)(MenuListSelect);