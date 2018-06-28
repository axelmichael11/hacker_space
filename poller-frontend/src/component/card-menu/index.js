

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
// import ResponsiveDialog from './responsive-dialog'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


import ReportButton from './report-button.js'
// import ProfileButton from './settings-button.js'
// import MyPollsButton from './poll-create-button.js'

import MenuList from '@material-ui/core/MenuList';



const styles= {

}
const CardMenu = ({...props}) => {
         const { anchorEl } = props;
         const open = Boolean(anchorEl);
        return (
            <div>
                <Menu
                  id="card-menu"
                  PaperProps={{
                    style: {
                      height: 70,
                      width: 200,
                    },
                  }}
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
                  onClose={props.handleClose}
                >
                {props.renderMenuButtons()}
                </Menu>

           </div>
        )
    }



CardMenu.propTypes = {
  renderMenuButtons: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  // anchorEl: PropTypes.isRequired
}


export default compose(
  // These are both single-argument HOCs
  withStyles(styles)
)(CardMenu)




