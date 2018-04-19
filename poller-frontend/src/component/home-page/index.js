
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'





import LoginPage from '../login'


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
   
  }

  componentWillMount() {
    console.log(this.props.history)
  }
  

  render() {
    console.log('this is the state and props on HomePage', this.state, this.props, this.context)
    return (
      <div>
        <div>Home Page!</div>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn
  })
  
  export const mapDispatchToProps = dispatch => ({

    
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomePage)