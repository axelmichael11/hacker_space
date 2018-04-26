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

import ChatIcon from 'material-ui/svg-icons/communication/chat'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import country_list from './countries.js'
import occupation_list from './occupations.js'
import AppBar from 'material-ui/AppBar'

import MaterialStyles from '../../style/material-ui-style'
import Snackbar from 'material-ui/Snackbar';

const styles = {
  title:{
    fontSize: 20,
    fontFamily: "Play",
    margin:'auto'
  },
  text :{
    fontSize: 8,
    fontFamily: "Play",
    margin:'auto'
  },
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
    marginLeft: 10,
  },
  selectFieldWidth: {
    width: 250,
    display:'inline-block',
    margin:'auto'
  },
};


class ProfileSettings extends React.Component {
  constructor(props) {
    super(props)
    console.log('this is hte props on profile settings', props)
    this.state = {...this.props.userProfile, 
      profileUpdateAlert:false,
      maleCheckBox: this.props.userProfile.gender=="M" ? true : false,
      femaleCheckBox: this.props.userProfile.gender=="F" ? true : false,
      religionYesCheckBox: this.props.userProfile.religion ? true : false,
      religionNoCheckBox: this.props.userProfile.religion==false ? true : false,
      ageErrorText:'',
      updatedAutoHideDuration: 4000,
      updatedMessage: 'Profile Successfully Updated',
      updatedOpen: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdateAlert = this.handleUpdateAlert.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleEthnicityChange = this.handleEthnicityChange.bind(this)
    this.updateMaleCheckBox = this.updateMaleCheckBox.bind(this)
    this.updateFemaleCheckBox = this.updateFemaleCheckBox.bind(this)
    this.handleOccupationChange = this.handleOccupationChange.bind(this)
    this.updateReligionNoCheckBox = this.updateReligionNoCheckBox.bind(this)
    this.updateReligionYesCheckBox = this.updateReligionYesCheckBox.bind(this)
    this.profileUpdateSubmit = this.profileUpdateSubmit.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.renderAges = this.renderAges.bind(this)
    this.handleUpdatedSnackBarRequest = this.handleUpdatedSnackBarRequest.bind(this)
  }

  componentWillMount() {
    console.log('this.props', this.props.userProfile)
  }

  
  handleUpdateAlert(){
    this.setState({profileUpdateAlert: !this.state.profileUpdateAlert});
  };

  handleAgeChange(event, index, value) {
    console.log('this should be the value now!', value)
    this.setState({ age: value })
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
    this.setState({profession: value})
  }

  updateMaleCheckBox() {
    this.setState((oldState) => {
      if (oldState.femaleCheckBox) {
        return {
          femaleCheckBox: !oldState.femaleCheckBox,
          maleCheckBox: !oldState.maleCheckBox,
          gender: "M",
        };
      }
      if (oldState.maleCheckBox) {
        return {
        maleCheckBox: !oldState.maleCheckBox,
          gender: null,
        }
      }
      if (!oldState.maleCheckBox) {
        return {
          maleCheckBox: !oldState.maleCheckBox,
          gender: "M",
        }
      }
    });
  }


  updateFemaleCheckBox() {
    this.setState((oldState) => {
      if (oldState.maleCheckBox) {
        return {
          femaleCheckBox: !oldState.femaleCheckBox,
          maleCheckBox: !oldState.maleCheckBox,
          gender: "F",
        };
      }
      if (oldState.femaleCheckBox) {
        return {
        femaleCheckBox: !oldState.femaleCheckBox,
          gender: null,
        }
      }
      if (!oldState.femaleCheckBox) {
        return {
          femaleCheckBox: !oldState.femaleCheckBox,
          gender: "F",
        }
      }
    });
  }

  updateReligionYesCheckBox(){
    this.setState((oldState) => {
      if (oldState.religionNoCheckBox) {
        return {
          religionYesCheckBox: !oldState.religionYesCheckBox,
          religionNoCheckBox: !oldState.religionNoCheckBox,
          religion: true,
        };
      }
      if (oldState.religionYesCheckBox) {
        return {
          religionYesCheckBox: !oldState.religionYesCheckBox,
          religion: null,
        }
      }
      if (!oldState.religionYesCheckBox) {
        return {
          religionYesCheckBox: !oldState.religionYesCheckBox,
          religion: true,
        }
      }
    });
  }

  updateReligionNoCheckBox(){
    this.setState((oldState) => {
      if (oldState.religionYesCheckBox) {
        return {
          religionYesCheckBox: !oldState.religionYesCheckBox,
          religionNoCheckBox: !oldState.religionNoCheckBox,
          religion: false,
        };
      }
      if (oldState.religionNoCheckBox) {
        return {
          religionNoCheckBox: !oldState.religionNoCheckBox,
          religion: null,
        }
      }
      if (!oldState.religionNoCheckBox) {
        return {
          religionNoCheckBox: !oldState.religionNoCheckBox,
          religion: false,
        }
      }
    });
  }
  profileUpdateSubmit(){
    let {age, ethnicity, profession, gender, country, religion} = this.state;
    this.props.profileToUpdate({age, ethnicity, profession, gender, country, religion})
    .then((profile)=>{
      this.handleUpdatedSnackBarRequest()
      this.handleUpdateAlert()
    })
  }

  renderAges(){
    let ages = Array.from({length: 100}, (v, k) => k+1);
    return ages.map((age)=>{
      return (
      <MenuItem value={age} primaryText={age} />
      )
    })
  }

  handleUpdatedSnackBarRequest(){
    this.setState((oldState)=>{
      return {
        updatedOpen: !oldState.updatedOpen,
      }
    });
  }


  render() {
    const actions = [<FlatButton
      label="Cancel"
      primary={true}
      onClick={this.handleUpdateAlert}
    />,
    <FlatButton
      label="Update Information"
      primary={true}
      onClick={this.profileUpdateSubmit}
    />]


    const underlineFocus = {
      borderBottomColor: '#3AB08F',
    }

    const formStyle = {
      marginLeft: 3,
    }
    console.log('profile SETINGS ',MaterialStyles)
    return (
      <div className="profile-form" style={{maxWidth: 450, margin: 'auto'}}>
        <MuiThemeProvider>
          <div>
          <Dialog
              title="Are You Sure?"
              actions={actions}
              modal={false}
              open={this.state.profileUpdateAlert}
            >
              This information can be updated or deleted at anytime. Do you still want to update your information?
          </Dialog>
          </div>
          <Card style={MaterialStyles.title}>
          <CardHeader
              title="Edit Profile"
              style={MaterialStyles.title}
             
            />
            <CardText style={MaterialStyles.text}>
            Update your profile information if you want this information to be anonomysously submitted when
            answering questions! None of these fields are required,
            and no demographic information specific to you is shown in the results of a poll.
            These can be updated as often as necessary. Why not make this app a little more interesting?
          </CardText>
          <CardHeader
              title={this.props.userProfile.nickname}
              subtitle={this.props.userProfile.email}
              avatar={this.props.userProfile.picture}
              style={MaterialStyles.title}
            />
            <CardMedia style={{margin:10}}>
            <form onSubmit={this.handleSubmit}>
              <Divider />
              <SelectField
                floatingLabelText="Age"
                value={this.state.age}
                onChange={this.handleAgeChange}
                style={MaterialStyles.selectFieldWidth}
              >
               <MenuItem value={null} primaryText="" />
               {
                this.renderAges()
              }

              </SelectField>


              <Divider />
              <SelectField
                floatingLabelText="Country"
                value={this.state.country}
                onChange={this.handleCountryChange}
                style={MaterialStyles.selectFieldWidth}
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
                style={MaterialStyles.selectFieldWidth}
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
                value={this.state.profession}
                onChange={this.handleOccupationChange}
                style={MaterialStyles.selectFieldWidth}
              >
               <MenuItem value={null} primaryText="" />
              {
              occupation_list.map((item, i) => {
                return <MenuItem value={i} primaryText={item}/>
              })  
               }
              </SelectField>
              
              <Checkbox
              checked={this.state.maleCheckBox}
              onCheck={this.updateMaleCheckBox}
                label="Male"
                style={MaterialStyles.checkbox}
              />
              <Checkbox
              checked={this.state.femaleCheckBox}
              onCheck={this.updateFemaleCheckBox}
                label="Female"
                style={MaterialStyles.checkbox}
              />
              <Divider />
              <CardHeader
              title="Are you religious?"
              style={MaterialStyles.title}
              />
              <Checkbox
                checked={this.state.religionYesCheckBox}
                onCheck={this.updateReligionYesCheckBox}
                  label="Yes"
                  style={MaterialStyles.checkbox}
                />
              <Checkbox
                checked={this.state.religionNoCheckBox}
                onCheck={this.updateReligionNoCheckBox}
                  label="No"
                  style={MaterialStyles.checkbox}
                />
                <Divider/>

              <RaisedButton
                style={{ margin: 20 }}
                label="Update Profile"
                type="submit"
                onClick={this.handleUpdateAlert}
                style={MaterialStyles.text}
              />
            </form>
            </CardMedia>
          </Card>
          <Snackbar
          open={this.state.updatedOpen}
          message={this.state.updatedMessage}
          action={null}
          autoHideDuration={this.state.updatedAutoHideDuration}
          onActionClick={this.handleUpdatedSnackBarRequest}
          onRequestClose={this.handleUpdatedSnackBarRequest}
        />
        </MuiThemeProvider>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  userProfile: state.userProfile
})

export const mapDispatchToProps = dispatch => ({
  profileToUpdate: (profile)=> dispatch(profileUpdate(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)