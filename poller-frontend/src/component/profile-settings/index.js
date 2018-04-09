import React from 'react'
import { connect } from 'react-redux'
// import { profileUpdateRequest } from '../../action/profile-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


import RaisedButton from 'material-ui/RaisedButton'
import LandingContainer from '../landing-container'
import * as util from '../../lib/util.js'

import Avatar from 'material-ui/Avatar'

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.profile
      ? { ...props.profile }
      : {
        username: '',
        age:'',
        profession: '',
        ethnicity: '',
        state: '',
        religious: '',
        gender: '',
      }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (this.props.profile) this.setState(this.props.profile)
    if (!this.props.avatar) {
      console.log('will mount avatar', this.props.avatar)
      try {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.setState({ preview: userInfo.picture })
      } catch (err) {
        util.logError(err)
      }
    }
  }

  handleChange(e) {
    let { value, name, files } = e.target
    this.setState({ [name]: value })
    
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.profileUpdate(this.state)
    this.props.history.push('/dashboard')
  }

  render() {
    const underlineFocus = {
      borderBottomColor: '#3AB08F',
    }

    const formStyle = {
      marginLeft: 20,
    }
    console.log(this.state)
    return (
      <div className="profile-form">
        <LandingContainer avatar={this.state.preview} />
        <MuiThemeProvider>
          <Paper zDepth={2}>
            <form onSubmit={this.handleSubmit}>
              <Avatar
                style={{ marginTop: '25px', marginLeft: '10px' }}
                src={this.state.preview}
              />
              <RaisedButton
                containerElement="label"
                label="Upload Photo"
                style={{ margin: 20 }}
              >
                <div className="previewComponent">
                  <input
                    type="file"
                    name="avatar"
                    value={this.state.avatar}
                    onChange={this.handleChange}
                    style={{ display: 'none' }}
                  />
                </div>
              </RaisedButton>
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
              <Checkbox
                checkedIcon={<Smoke />}
                uncheckedIcon={<SmokeFree style={{ fill: 'red' }} />}
                value={this.state.smoke}
                onChange={this.handleChange}
                iconStyle={{ fill: 'black' }}
                style={{ margin: 20, float: 'left' }}
                label="Smoker"
                labelStyle={{ opacity: '.3' }}
              />
              <Checkbox
                checkedIcon={<Pets />}
                uncheckedIcon={<Pets style={{ fill: 'red ' }} />}
                value={this.state.smoke}
                onChange={this.handleChange}
                iconStyle={{ fill: 'black' }}
                style={{ margin: 20 }}
                label="Pets"
                labelStyle={{ opacity: '.3' }}
              />
              <Divider />
              <TimePicker
                hintText="Regular Hours"
                style={formStyle}
                dialogStyle={{
                  backgroundColor: '#3AB08F',
                }}
                dialogBodyStyle={{
                  color: 'black',
                }}
                underlineShow={false}
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
  profile: state.profile,
})

export const mapDispatchToProps = dispatch => ({
  profileUpdate: profile => dispatch(profileUpdateRequest(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)