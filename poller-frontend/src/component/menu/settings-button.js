import React from 'react'
import { withRouter, Route } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import LoginPage from '../login'



import FlatButton from 'material-ui/FlatButton'
import FontAwesome from 'react-fontawesome' 

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import MenuItem from 'material-ui/MenuItem';




class SettingsButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
        this.nextPath = this.nextPath.bind(this)
      }

    nextPath(){
        this.props.history.push('/settings')
    }

    render(){
        console.log('this.PROPS on the home button', this.context, this.props.history)
        return (
            <div>
                <MenuItem onClick={()=>this.nextPath()} primaryText={"Settings"} />
            </div>
        )
    }
}

export const mapStateToProps = state => ({
})

export const mapDispatchToProps = dispatch => ({
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsButton))