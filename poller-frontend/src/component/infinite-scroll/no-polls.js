import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {VictoryPie, VictoryLegend, VictoryTooltip, VictoryLabel} from 'victory'
import AppBar from 'material-ui/AppBar'

import '../../style/index.scss'
import Chip from 'material-ui/Chip';

import MaterialStyles from '../../style/material-ui-style'
import Typography from '@material-ui/core/Typography';


class NoPolls extends React.Component {
  
  render(){
    console.log('yes-no pie charts', this.props, this.state)
      return(
        <div className="no-data">
            <Typography variant="headline" component="h3" style={{width:'100%' , margin:'auto', textAlign:'center' }}>No Polls Listed...</Typography>
        </div>
      )
  }
}

export default NoPolls