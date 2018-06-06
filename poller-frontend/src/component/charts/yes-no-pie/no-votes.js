import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {VictoryPie, VictoryLegend, VictoryTooltip, VictoryLabel} from 'victory'
import AppBar from 'material-ui/AppBar'

import '../../../style/index.scss'
import Chip from 'material-ui/Chip';

import MaterialStyles from '../../../style/material-ui-style'
import Typography from '@material-ui/core/Typography';


class NoVotes extends React.Component {
  
  render(){
    console.log('yes-no pie charts', this.props, this.state)
      return(
        <div>
            <Typography variant="subheading" component="h3"> No one voted this way... No data to display </Typography>
        </div>
      )
  }
}

export default NoVotes