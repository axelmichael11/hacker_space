

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



import ReportButton from './report-button.js'
// import ProfileButton from './settings-button.js'
// import MyPollsButton from './poll-create-button.js'


const styles= {

}
class CardMenu extends React.Component{
    constructor(props, context) {
        super(props, context)
        this.state = {
          anchorEl: null,
        }
        this.handleMenu = this.handleMenu.bind(this)
        this.handleClose = this.handleClose.bind(this)
      }

      handleMenu(event){
        this.setState({ anchorEl: event.currentTarget });
      };
     
      handleClose(){
        this.setState({ anchorEl: null });
      };
      


    render(){
        console.log('this.PROPS on the Card MENu', this.context, this.props.history)
         const { anchorEl } = this.state;
         const open = Boolean(anchorEl);


        return (
            <div>
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
                  <ReportButton/>
                </Menu>

           </div>
        )
    }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
    userProfile: state.userProfile,
})

export const mapDispatchToProps = dispatch => ({
})

export default compose(
  // These are both single-argument HOCs
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CardMenu)




