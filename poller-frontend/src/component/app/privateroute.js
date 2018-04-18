import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest, loggedIn, redirectTo, checkAuthorization }) => {
  // Add your own authentication on the below line.
//   const {loggedIn} = this.props.loggedIn

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
        )
      }
    />
  )
}
export const mapStateToProps = state => ({
    loggedIn: state.loggedIn
  })
  
  export const mapDispatchToProps = dispatch => ({
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)