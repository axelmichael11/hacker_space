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
import occupation_list from './occupations.js'
import AppBar from 'material-ui/AppBar'



const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
  selectFieldWidth: {
    width: 150,
    display:'inline-block',
    margin:'auto'
  },
};


class ProfileSettings extends React.Component {
  constructor(props) {
    super(props)
    console.log('this is hte props on profile settings', props)
    this.state = {...this.props.userProfile, openProfileAlert:false, country: this.props.userProfile.country}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleOpenCreateProfileAlert = this.handleOpenCreateProfileAlert.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleEthnicityChange = this.handleEthnicityChange.bind(this)
    this.updateGenderMale = this.updateGenderMale.bind(this)
    this.updateGenderFemale = this.updateGenderFemale.bind(this)
    this.handleOccupationChange = this.handleOccupationChange.bind(this)
    this.updateReligionNoCheckBox = this.updateReligionNoCheckBox.bind(this)
    this.updateReligionYesCheckBox = this.updateReligionYesCheckBox.bind(this)
    this.profileUpdateSubmit = this.profileUpdateSubmit.bind(this)
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
    console.log('this is the country change event', value, index)
    this.setState({country: value});
  }

  handleEthnicityChange(event, index, value){
    this.setState({ethnicity: value})
  }

  handleOccupationChange(event,index,value){
    this.setState({occupation: value})
  }

  updateGenderMale() {
    this.setState((oldState) => {
      return {
        gender: !oldState.gender,
      };
    });
  }
  updateGenderFemale() {
    this.setState((oldState) => {
      return {
        gender: !oldState.gender,
      };
    });
  }

  updateReligionYesCheckBox() {
    this.setState((oldState) => {
      return {
        religion: !oldState.checked,
      };
    });
  }
  updateReligionNoCheckBox(){
    this.setState((oldState) => {
      return {
        religion: !oldState.checked,
      };
    });
  }
  profileUpdateSubmit(){
    let {age, ethnicity, occupation, gender, country, religion} = this.state;
    this.profileToUpdate({age, ethnicity, occupation, gender, country, religion})
  }


  render() {
    const underlineFocus = {
      borderBottomColor: '#3AB08F',
    }

    const formStyle = {
      marginLeft: 3,
    }
    console.log('profile SETINGS STATE',occupation_list, this.state, 'pROPS',this.props.userProfile)
    return (
      <div className="profile-form" style={{maxWidth: 450, margin: 'auto'}}>
        <MuiThemeProvider>
          <div>
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
          </div>
          <Card>
          <CardHeader
              title="Edit Profile"
              style={{margin:'auto'}}
            />
          <CardHeader
              title={this.props.userProfile.nickname}
              subtitle={this.props.userProfile.email}
              avatar={this.props.userProfile.picture}
            />
            <CardMedia>
            <form onSubmit={this.handleSubmit}>
              <Divider />
              <TextField
                type="text"
                name="Age"
                value={this.age}
                onChange={this.handleChange}
                underlineShow={false}
                rows={1}
                style={formStyle}
                hintText="Age"
              />
              <Divider />
              <SelectField
                floatingLabelText="Country"
                value={this.state.country}
                onChange={this.handleCountryChange}
                style={styles.selectFieldWidth}
              >
               <MenuItem value={null} primaryText="" />
               {
                country_list.map((country, i)=>{
                  return <MenuItem value={i} primaryText={country} />
                })
              }
              </SelectField>
              <SelectField
                floatingLabelText="Ethnicity"
                value={this.state.ethnicity}
                onChange={this.handleEthnicityChange}
                style={styles.selectFieldWidth}
              >
                <MenuItem value={null} primaryText="" />
                <MenuItem value={1} primaryText="Asian" />
                <MenuItem value={2} primaryText="Native Hawaiian or Other Pacific Islander" />
                <MenuItem value={3} primaryText="Black, Afro-Caribbean, or African American" />
                <MenuItem value={4} primaryText="Latino"/>
                <MenuItem value={5} primaryText="Native American or Alaskan Native" />
                <MenuItem value={6} primaryText="White/Causasian"/>
                <MenuItem value={7} primaryText="Middle Eastern or Arab American"/>
              </SelectField>

              <SelectField
                floatingLabelText="Occupation"
                value={this.state.occupation}
                onChange={this.handleOccupationChange}
                style={styles.selectFieldWidth}
              >
               <MenuItem value={null} primaryText="" />
              {
              occupation_list.map((item, index) => {
                <MenuItem value={index} primaryText={item}/>
              })  
               }
              </SelectField>
              
              <Checkbox
              checked={this.state.gender ? true: false}
              onCheck={this.updateGenderMale}
                label="Male"
                style={styles.checkbox}
              />
              <Checkbox
              checked={this.state.gender ? false: true}
              onCheck={this.updateGenderFemale}
                label="Female"
                style={styles.checkbox}
              />
              <Divider />
              <CardHeader
              title="Are you religious?"
              style={{margin:'auto'}}
              />
              <Checkbox
                checked={this.state.religion ? true: false}
                onCheck={this.updateReligionYesCheckBox}
                  label="Yes"
                  style={styles.checkbox}
                />
              <Checkbox
                checked={this.state.religion ? false: true}
                onCheck={this.updateReligionNoCheckBox}
                  label="No"
                  style={styles.checkbox}
                />
                <Divider/>

              <RaisedButton
                style={{ margin: 20 }}
                label="Update Profile"
                type="submit"
                onClick={this.profileUpdateSubmit}
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