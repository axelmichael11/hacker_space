import React from 'react'
import { withRouter, Route } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import MenuItem from '@material-ui/core/MenuItem';


class MyPollsButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
        this.nextPath = this.nextPath.bind(this)
      }

    nextPath(){
        this.props.history.push('/pollcreate')
        this.props.handleClose()

    }
    render(){
        console.log('this.PROPS on the pollcreate button', this.context, this.props.history)
        return (
            <div>
                <MenuItem onClick={()=>this.nextPath()}>My Polls</MenuItem>
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyPollsButton))