

import React from 'react'
import { withRouter } from 'react-router'
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



class LoggedInMenu extends React.Component{

    constructor(props) {
        super(props)
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
        // if (value = 1) this.props.push('/home')
        // if (value = 3) this.props.push('/settings')
        // if (value = 4) this.props.logout()
      }
    
      handleOnRequestChange(value){
        this.setState({
          openMenu: value,
        });
      }

    render(){
        console.log('this.PROPS on the MENu', this.props, this.props.history)
        return (
            <div>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                open={this.state.openMenu}
                onRequestChange={this.handleOnRequestChange}
                onChange={this.handleOnItemChange}
              >
                <MenuItem value="1" primaryText={"Home"} />
                <MenuItem value="2" primaryText="Explore" />
                <MenuItem value="3" primaryText="Settings" />
                <AuthLockButton />
              </IconMenu>
              </div>
        )
    }
}

export const mapStateToProps = state => ({
  history: state.history
})

export const mapDispatchToProps = dispatch => ({
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoggedInMenu))