

import React from 'react'
import { withRouter, Route } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import LoginPage from '../login'

import AuthLockButton from '../auth0-lock'
import { login, logout } from '../../action/auth-actions.js'
import * as util from '../../lib/util.js'

import FlatButton from 'material-ui/FlatButton'
import FontAwesome from 'react-fontawesome' 

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';


import ExploreButton from './Explore-button.js'
import SettingsButton from './settings-button.js'
import PollCreateButton from './poll-create-button.js'

class NavMenu extends React.Component{
    constructor(props, context) {
        super(props, context)
        this.state = {
          openMenu: false,
        }
        this.handleOpenMenu = this.handleOpenMenu.bind(this)
        this.handleOnRequestChange = this.handleOnRequestChange.bind(this);
        // this.logout = this.logout.bind(this)
        this.handleOnItemChange = this.handleOnItemChange.bind(this)
      }

      handleOpenMenu(){
        this.setState({
          openMenu: true,
        });
      }
      handleOnItemChange(value){
        // if (value = 3) this.props.history.push('settings')
        // if (value = 4) this.props.logout()
      }
    
      handleOnRequestChange(value){
        this.setState({
          openMenu: value,
        });
      }

    render(){
        console.log('this.PROPS on the MENu', this.context, this.props.history)
        return (
            <div>
                  <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  open={this.state.openMenu}
                  onRequestChange={this.handleOnRequestChange}
                  onChange={this.handleOnItemChange}
                >
                  <ExploreButton />
                  <PollCreateButton/>
                  <SettingsButton />
                  <AuthLockButton />
                </IconMenu>
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


export default connect(mapStateToProps, mapDispatchToProps)(NavMenu)