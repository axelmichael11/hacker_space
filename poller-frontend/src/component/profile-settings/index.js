import React from 'react'
import { connect } from 'react-redux'
// import { checkProfileExists } from '../../action/profile-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import FontAwesome from 'react-fontawesome' 

import {
  profileUpdate,
} from '../../action/profile-actions.js'

import Pets from 'material-ui/svg-icons/action/pets'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import TimePicker from 'material-ui/TimePicker'
import RaisedButton from 'material-ui/RaisedButton'
import LandingContainer from '../landing-container'
import * as util from '../../lib/util.js'
import uuid from 'uuid/v1'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props)
    console.log('this is hte props on profile settings', props)
    this.state = {...this.props.userProfile, openProfileAlert:false}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOpenCreateProfileAlert = this.handleOpenCreateProfileAlert.bind(this)
  }

  componentWillMount() {
    console.log('this.props', this.props.userProfile)
  }

  
  handleOpenCreateProfileAlert(){
    this.setState({openProfileAlert: !this.state.openProfileAlert});
  };


  handleChange(e) {
    let { value, name, files } = e.target
    this.setState({ [name]: value })
    
  }

  handleSubmit(e) {
    e.preventDefault()
    // this.props.profileUpdate(this.state)
    // this.props.history.push('/dashboard')
  }

  render() {
    const underlineFocus = {
      borderBottomColor: '#3AB08F',
    }

    const formStyle = {
      marginLeft: 20,
    }
    console.log('profile SETINGS',this.state, this.props)
    return (
      <div className="profile-form">
        <LandingContainer/>
        <MuiThemeProvider>
          <Dialog
              title="Welcome to Poller!"
              actions={<FlatButton
                label="OK"
                primary={true}
                onClick={this.handleOpenCreateProfileAlert}
              />}
              modal={false}
              open={this.state.openProfileAlert}
              onRequestClose={this.handleOpenCreateProfileAlert}
            >
              Welcome to Poller! We didn't find a profile for you... Before you get started you have to fill out a profile!
          </Dialog>

          <Paper style={{margin:'0 auto', width: 'flex', display:'center'}} zDepth={2}>
            <form onSubmit={this.handleSubmit}>


              <TextField
                type="username"
                name="username"
                hintText={this.state.username}
                value={this.state.username}
                onChange={this.handleChange}
                underlineShow={false}
                style={formStyle}
              />
              <Divider />
              <TextField
                type="text"
                name="bio"
                value={this.state.bio}
                onChange={this.handleChange}
                underlineShow={false}
                multiLine={true}
                rows={4}
                style={formStyle}
                hintText="Enter a Bio"
              />
              <Divider />
              <TextField
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                underlineShow={false}
                style={formStyle}
                hintText="Phone Number"
              />
              <Divider />
              <TextField
                type="text"
                name="budget"
                value={this.state.budget}
                onChange={this.handleChange}
                underlineShow={false}
                style={formStyle}
                hintText="Budget"
              />
              <Divider />
              <TextField
                type="text"
                name="ocupation"
                value={this.state.ocupation}
                onChange={this.handleChange}
                underlineShow={false}
                style={formStyle}
                hintText="Occupation"
              />
              <Divider />
      

              <RaisedButton
                style={{ margin: 20 }}
                label="Submit"
                type="submit"
              />
            </form>
          </Paper>
        </MuiThemeProvider>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  userProfile: state.userProfile
})

export const mapDispatchToProps = dispatch => ({
  profileUpdate: (profileToUpdate)=> dispatch(profileUpdate(profileToUpdate)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)