import React from 'react'
import { connect } from 'react-redux'
// import { checkProfileExists } from '../../action/profile-actions.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {recompose, compose} from 'recompose'
import {ageValidation} from '../../lib/util.js'



import {
  profileUpdate,
} from '../../action/profile-actions.js'
import classnames from 'classnames';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import MenuList from '@material-ui/core/MenuList';
import Snackbar from '@material-ui/core/Snackbar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import country_list from '../../lib/countries.js'
import profession_list from '../../lib/professions.js'
import ethnicity_list from '../../lib/ethnicities.js'

import MaterialStyles from '../../style/material-ui-style'





const styles = theme => ({
  container: theme.overrides.MuiPaper,
  ageSelect:{
    marginLeft: 15,
  },
  buttonContainer: theme.overrides.MuiButton.root.container,
  button: theme.overrides.MuiButton.root.button,
  cardStack:{
    backgroundColor: theme.palette.primary.main,
    fontFamily: theme.typography.fontFamily,
    fontSize:30,
    height:20,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
  },
  text: theme.typography.text,
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actions: {
    display: 'flex',
  },
  cardHeader:{
    root:{
      fontFamily: theme.typography.fontFamily,
      color:'#fff',
      backgroundColor: theme.palette.secondary.main,
    },
    textAlign:'center',
    fontFamily: theme.typography.fontFamily,
    color:'#fff',
    backgroundColor: theme.palette.secondary.main,
  },
  cardContent:{
    root:{
      fontFamily: theme.typography.fontFamily,
      backgroundColor: theme.palette.secondary.main,
    },
    textAlign:'center',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  }
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
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
      ageError: false,
      ageErrorText:'Not a valid Age',
      updatedAutoHideDuration: 4000,
      updatedMessage: 'Profile Successfully Updated',
      updatedOpen: false,
      updateErrorOpen: false,
      updateErrorMessage:'There was an error updating your profile Information'
    }
    this.handleHelpExpand = this.handleHelpExpand.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpdateAlert = this.handleUpdateAlert.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleEthnicityChange = this.handleEthnicityChange.bind(this)
    this.updateMaleCheckBox = this.updateMaleCheckBox.bind(this)
    this.updateFemaleCheckBox = this.updateFemaleCheckBox.bind(this)
    this.handleProfessionChange = this.handleProfessionChange.bind(this)
    this.updateReligionNoCheckBox = this.updateReligionNoCheckBox.bind(this)
    this.updateReligionYesCheckBox = this.updateReligionYesCheckBox.bind(this)
    this.profileUpdateSubmit = this.profileUpdateSubmit.bind(this);
    this.handleAgeChange = this.handleAgeChange.bind(this)
    this.renderAges = this.renderAges.bind(this)
    this.handleUpdatedSnackBarRequest = this.handleUpdatedSnackBarRequest.bind(this)
    this.handleUpdateErrorSnackBarRequest = this.handleUpdateErrorSnackBarRequest.bind(this)
    this.renderMenuItems = this.renderMenuItems.bind(this)
  }

  componentWillMount() {
    console.log('this.props', this.props.userProfile)
  }

  
  handleUpdateAlert(){
    this.setState({profileUpdateAlert: !this.state.profileUpdateAlert});
  };

  handleAgeChange(e) {
    let value = parseInt(e.target.value)
    console.log('this should be the value now!',0 > value || 110 < value,  typeof value, ageValidation(value))
    if (ageValidation(value)){
      this.setState({ ageError: true })
    } else {
      if (value === NaN){
        value = null
      }
      this.setState({ age: value, ageError: false })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    // this.props.profileUpdate(this.state)
    // this.props.history.push('/dashboard')
  }

  handleHelpExpand(){
    this.setState({ helpExpanded: !this.state.helpExpanded });
  }

  handleCountryChange(e){
    let value =e.target.value
    console.log('hitting country!!!', value)

    this.setState({country: value});
  }

  handleEthnicityChange(e){
    let value = e.target.value
    console.log('hitting ethnicity!!!', value, ethnicity_list[value], ethnicity_list[value.toString()])
    

    this.setState({ethnicity: value});
  }

  handleProfessionChange(e){
    let value = e.target.value
    console.log('hitting profession!!!', value)

    this.setState({profession: value});
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
    .catch(err=>{
      console.log('this is the error updating profile', err)
      if (err===500){
        this.handleUpdateErrorSnackBarRequest()
        this.handleUpdateAlert()

      }
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
  handleUpdateErrorSnackBarRequest(){
    this.setState((oldState)=>{
      return {
        updateErrorOpen: !oldState.updateErrorOpen,
      }
    });
  }

  renderMenuItems(list){
    let {classes} = this.props
    return Object.keys(list).map((key, i)=>{
      console.log(key, list[key])
        return (<MenuItem
        key={i}
        value={key}
        style={{...classes.text}}
        >
        {list[key]}
        </MenuItem>
        )
      })
  }


  render() {
    const actions = [<Button
      label="Cancel"
      primary={true}
      onClick={this.handleUpdateAlert}
    />,
    <Button
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
    let {classes, theme} = this.props
    console.log('profile SETINGS ',this.state, this.props)
    return (
      <div>
        <Dialog
            open={this.state.profileUpdateAlert}
            modal={false}
        >
          <DialogTitle id="alert-dialog-title">"Are you sure?"</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            This information can be updated or deleted at anytime. Do you still want to update your information?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <div className={classes.container}>

            <Button 
              onClick={this.handleUpdateAlert} 
              className={classes.button}
            >
              Cancel
            </Button>
            </div>
            <div className={classes.container}>

            <Button 
              onClick={this.profileUpdateSubmit} 
              autoFocus
              className={classes.button}
            >
              Update Profile
            </Button>
            </div>
          </DialogActions>
        </Dialog>


        <Paper className={classes.container}>
          <Card>
            <CardActions 
              disableActionSpacing
              onClick={this.handleHelpExpand}
            >
                <Typography className={classes.text}>
                  Help
                </Typography>
                
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.helpExpanded,
                  })}
                  // onClick={this.handleExpandClick}
                  aria-expanded={this.state.helpExpanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
            <Collapse in={this.state.helpExpanded} timeout="auto" unmountOnExit>
              <CardContent>
                  <Typography className={classes.text}>
                Update your profile information if you want this information to be anonomysously submitted when
                  answering questions! None of these fields are required,
                  and no demographic information specific to you is shown in the results of a poll.
                  These can be updated as often as necessary. Why not make this app a little more interesting?
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Paper>

        <form className={classes.container} noValidate onSubmit={this.handleSubmit} autoComplete="off">
        <Paper className={classes.container}>
          <Card>
          <CardContent className={classes.cardHeader}>
                <Typography variant="headline" component="h1" className={classes.cardHeader}>
                    {this.props.userProfile.nickname}
                </Typography>
                <Typography variant="subheading" component="h5"  className={classes.cardHeader}>
                    {this.props.userProfile.email}
                </Typography>
            </CardContent>
            <Divider/>
            <CardContent className={classes.cardContent}>
              <Toolbar className={classes.cardContent}>
                <Typography variant="subheading" component="h3" style={{marginRight:15}}>
                    Age
                </Typography>
                <TextField
                  id="Age"
                  label={this.state.ageError ? this.state.ageErrorText : null}
                  value={this.state.age}
                  onChange={this.handleAgeChange}
                  type="number"
                  error={this.state.ageError}
                  className={classes.ageSelect}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                />
              </Toolbar>
            </CardContent>
            <Divider/>
            <CardContent className={classes.cardContent}>
              <Toolbar>
                <Typography variant="subheading" component="h3" style={{display:'block'}}>
                    Gender
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.maleCheckBox}
                      value={this.state.maleCheckBox}
                      onChange={this.updateMaleCheckBox}
                        label="Male"
                        style={MaterialStyles.checkbox}
                    />
                  }
                  label="Male"
                />
                 <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.femaleCheckBox}
                      value={this.state.femaleCheckBox}
                      onChange={this.updateFemaleCheckBox}
                        label="Female"
                        style={MaterialStyles.checkbox}
                    />
                  }
                  label="Female"
                />
              </Toolbar>
            </CardContent>
            <Divider/>

            <CardContent className={classes.cardContent}>
              <Toolbar>
                <Typography variant="subheading" component="h3">
                    Religious
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.relgion}
                      value={this.state.religionYesCheckBox}
                      onChange={this.updateReligionYesCheckBox}
                        label="Yes"
                        style={MaterialStyles.checkbox}
                    />
                  }
                  label="Yes"
                />
                 <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.religionNoCheckBox}
                      value={this.state.religionNoCheckBox}
                      onChange={this.updateReligionNoCheckBox}
                        label="No"
                        style={MaterialStyles.checkbox}
                    />
                  }
                  label="No"
                />
              </Toolbar>
            </CardContent>
            <Divider/>
            <CardContent className={classes.cardContent}>
              <Toolbar className={classes.cardContent}>
                <Typography variant="subheading" component="h3" style={{marginRight:15}}>
                    Country
                </Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">Country</InputLabel>
                  <Select
                    autoWidth={true}
                    value={this.state.country}
                    onChange={this.handleCountryChange}
                    MenuProps={MenuProps}
                  >
                    <MenuItem
                      value={null}
                      style={{...classes.text}}
                      >
                      None
                      </MenuItem>
                   {this.renderMenuItems(country_list)}
                  </Select>
                </FormControl>
              </Toolbar>
            </CardContent>
            <Divider/>
            <CardContent className={classes.cardContent}>
              {/* <Toolbar className={classes.cardContent}> */}
                <Typography variant="subheading" component="h3" style={{marginRight:15}}>
                    Profession
                </Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">Profession</InputLabel>
                  <Select
                    autoWidth={true}
                    value={this.state.profession}
                    onChange={this.handleProfessionChange}
                    MenuProps={MenuProps}
                  >
                    <MenuItem
                      value={null}
                      style={{...classes.text}}
                      >
                      None
                      </MenuItem>
                   {this.renderMenuItems(profession_list)}
                  </Select>
                </FormControl>
              {/* </Toolbar> */}
            </CardContent>
            <Divider/>
            <CardContent className={classes.cardContent}>
              <Toolbar className={classes.cardContent}>
                <Typography variant="subheading" component="h3" style={{marginRight:15}}>
                    Ethnicity
                </Typography>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="age-simple">Ethnicity</InputLabel>
                  <Select
                    autoWidth={true}
                    value={ this.state.ethnicity}
                    onChange={this.handleEthnicityChange}
                    MenuProps={MenuProps}
                  >
                    <MenuItem
                      value={null}
                      style={{...classes.text}}
                    >
                    None
                    </MenuItem>
                   {this.renderMenuItems(ethnicity_list)}
                  </Select>
                </FormControl>
              </Toolbar>
            </CardContent>
            <Divider/>
            <CardContent className={classes.container}>
            <div className={classes.buttonContainer}>
              <Button 
              variant="outlined"
              onClick={this.handleUpdateAlert} 
              className={classes.button}>
              Update Profile
              </Button>
            </div>
            </CardContent>
          </Card>
         </Paper >
         </form>
         <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          onClose={this.handleUpdatedSnackBarRequest}
          open={this.state.updatedOpen}
          message={this.state.updatedMessage}
          action={null}
          onClick={this.updatedOpen}

          autoHideDuration={this.state.updatedAutoHideDuration}
          // onActionClick={this.handleUpdatedSnackBarRequest}
          // onRequestClose={this.handleUpdatedSnackBarRequest}
        />
         <Snackbar

          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          onClose={this.handleUpdateErrorSnackBarRequest}
          open={this.state.updateErrorOpen}
          message={this.state.updateErrorMessage}
          action={null}
          onClick={this.handleUpdatedSnackBarRequest}

          autoHideDuration={this.state.updatedAutoHideDuration}
          // onActionClick={this.handleUpdateErrorSnackBarRequest}
          // onRequestClose={this.handleUpdateErrorSnackBarRequest}
        />
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




export default compose(
  withStyles(styles, {withTheme:true}),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileSettings)


