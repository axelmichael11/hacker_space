import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import {compose} from 'recompose'
import MaterialStyles from '../../style/material-ui-style'


import Face from '@material-ui/icons/face'
// import SpeakerNotes from '@material-ui/icons/speaker-notes'
// import Assessment from '@material-ui/icons/assessment'
// import SwapVert from '@material-ui/icons/swap-vert'


import FlatButton from 'material-ui/FlatButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


import AuthLockButton from  '../auth0-lock'
import NavigateGettingStartedButton from '../getting-started-button'

import '../../style/index.scss'

const styles = theme=> ({
  container: theme.overrides.MuiPaper,
  middle_icon: {
    display:'center',
    margin:'auto',
    width: 50,
    height: 50,
    textAlign: 'center',
    position: 'relative'
  }
})
class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.gettingStarted = this.gettingStarted.bind(this)
  }

  gettingStarted(){
  }

  render() {
    console.log('THIS>PROPS ON LOGIN PAGE', this.props)
    let {classes, theme} = this.props;
    return (
      <div>
          <Paper elevation={2} className={classes.container}>
            <p id="title">Poller</p>

            <div id="parent">
                <Face className={classes.middle_icon}/>
            </div>

            <NavigateGettingStartedButton/>
          </Paper>

          <Paper elevation={2} className={classes.container}>
            <AuthLockButton style={{margin: 15}}/>
          </Paper>
      </div>
    )
  }
}


LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};


export default compose(
  // These are both single-argument HOCs

  withStyles(MaterialStyles, {withTheme:true})
)(LoginPage)
