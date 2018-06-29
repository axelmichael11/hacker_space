import React from 'react'
import {compose} from 'recompose'
import { withRouter, Route } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });



class ProfileButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {}
        this.nextPath = this.nextPath.bind(this)
      }

    nextPath(){
        this.props.history.push('/settings')
        this.props.handleClose()
    }

    render(){
        return (
            <div>
                <MenuItem onClick={()=>this.nextPath()}>Profile</MenuItem>
            </div>
        )
    }
}

export const mapStateToProps = state => ({
})

export const mapDispatchToProps = dispatch => ({
})


  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter
  )(ProfileButton)