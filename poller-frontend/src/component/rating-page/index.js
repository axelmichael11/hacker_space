
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {  compose } from 'recompose'

import '../../style/index.scss'



import {
  pollsFetch,
  pollDelete,
  pollSend,
  } from '../../action/user-polls-actions.js'

  
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
  import IconButton from '@material-ui/core/IconButton';
  import Collapse from '@material-ui/core/Collapse';
  import MoreVertIcon from '@material-ui/icons/MoreVert';
  import Avatar from '@material-ui/core/Avatar';
  import TextField from '@material-ui/core/TextField';
  import Toolbar from '@material-ui/core/Toolbar';
  import FormControlLabel from '@material-ui/core/FormControlLabel';



const styles = theme =>({
  button: theme.overrides.MuiButton,
  menuItem: theme.overrides.MuiMenuItem,
  
})

class RatingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const {classes} = this.props;
    return (
        <div>
            <Typography variant="headline" >
               Coming Soon...        
              </Typography>
        </div>
      )
    }
  }


    
export default compose(
  withStyles(styles, {withTheme:true}),
)(RatingPage);

