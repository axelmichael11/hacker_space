

import React from 'react'
import { withRouter, Route } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {compose} from 'recompose'


import AuthLockButton from '../auth0-lock'
import { login, logout } from '../../action/auth-actions.js'
import * as util from '../../lib/util.js'

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import ResponsiveDialog from './responsive-dialog'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


import ReportButton from './report-button.js'
// import ProfileButton from './settings-button.js'
// import MyPollsButton from './poll-create-button.js'
import LoadingHOC from '../loading'


const SubmitReportButton = ({...props}) =>{
  return (
    <div 
    // className={props.classes.buttonContainer}
    >
     <ListItem button className={props.classes.button} onClick={props.onClick}>
        <ListItemIcon>
            {props.buttonIcon}
        </ListItemIcon>
        <ListItemText inset primary={props.buttonTitle}/>
    </ListItem>
    </div>
  )
}

const FeedBackReportButton = LoadingHOC(SubmitReportButton)


const styles= {

}
class CardMenu extends React.Component{
    constructor(props, context) {
        super(props, context)
        this.state = {
          anchorEl: null,
          // dialogs
          reportDialog: false,

        }
        this.handleMenu = this.handleMenu.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleOpenReportDialog = this.handleOpenReportDialog.bind(this)
      }

      handleMenu(event){
        this.setState({ anchorEl: event.currentTarget });
      };
     
      handleClose(){
        this.setState({ anchorEl: null, reportDialog: false });
      };

      handleOpenReportDialog(){
        this.setState({ reportDialog: true });
      }




      


    render(){
        console.log('this.PROPS on the Card MENu', this.state, this.props)
         const { anchorEl } = this.state;
         const open = Boolean(anchorEl);
        
        return (
            <div>
               <ResponsiveDialog
                dialogTitle={"Report This Poll"}
                dialogContent={"Is this poll offensive? Please report if so and we will review this shortly! Sorry for the material :("}
                // DialogSubmitButton={FeedBackReportButton}
                dialogOpen={this.state.reportDialog}
                handleClose={this.handleClose}
                submitText="Report Poll"
                />

                  <IconButton
                //   aria-owns={open ? 'menu-appbar' : null}
                //   aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <ReportButton poll={this.props.poll} handleOpenReportDialog={this.handleOpenReportDialog}/>
                </Menu>

           </div>
        )
    }
}

export const mapStateToProps = state => ({
    userProfile: state.userProfile,
})

export const mapDispatchToProps = dispatch => ({
})

export default compose(
  // These are both single-argument HOCs
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CardMenu)




