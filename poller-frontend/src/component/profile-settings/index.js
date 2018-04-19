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
import * as util from '../../lib/util.js'
import uuid from 'uuid/v1'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import country_list from './countries.js'

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props)
    console.log('this is hte props on profile settings', props)
    this.state = {...this.props.userProfile, openProfileAlert:false, religious:false}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOpenCreateProfileAlert = this.handleOpenCreateProfileAlert.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
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

  handleCountryChange(event, index, value){
    this.setState({value});
  }

  updateGender() {
    this.setState((oldState) => {
      return {
        gender: !oldState.checked,
      };
    });
  }

  updateReligious() {
    this.setState((oldState) => {
      return {
        religious: !oldState.checked,
      };
    });
  }


  render() {
    const underlineFocus = {
      borderBottomColor: '#3AB08F',
    }

    const formStyle = {
      marginLeft: 3,
    }
    console.log('profile SETINGS',this.state)
    return (
      <div className="profile-form">
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

          <Card>
          <CardHeader
              title={this.props.userProfile.username}
              subtitle={this.props.userProfile.email}
              avatar={this.props.userProfile.picture}
            />
            <CardMedia>
            <form onSubmit={this.handleSubmit}>
              <Divider />
              <TextField
                type="text"
                name="Age"
                value={this.state.age}
                onChange={this.handleChange}
                underlineShow={false}
                rows={1}
                style={formStyle}
                hintText="Age"
              />
              <Divider />
              <SelectField
                floatingLabelText="Country"
                value={this.state.value}
                onChange={this.handleCountryChange}
              >
               {
                country_list.map((country, i)=>{
                  return <MenuItem value={i} primaryText={country} />
                })
              }
              </SelectField>
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
            </CardMedia>
          </Card>
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