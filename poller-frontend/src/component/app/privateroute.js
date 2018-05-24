import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import ProfileSettings from '../profile-settings'
import LandingContainer from '../landing-container'
const PrivateRoute = ({ component: Component, loggedIn, redirectTo, ...rest }) => {
  return (
    <Route
    {...rest}
    render={(props) =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
      )
    }/>
  );
};


const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

export default PrivateRoute