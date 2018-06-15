import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {VictoryPie, VictoryLegend, VictoryTooltip, VictoryLabel} from 'victory'
import AppBar from 'material-ui/AppBar'

import '../../../style/index.scss'
import Chip from 'material-ui/Chip';

import MaterialStyles from '../../../style/material-ui-style'
import Typography from '@material-ui/core/Typography';


class NoData extends React.Component {
  
  render(){
    console.log('yes-no pie charts', this.props, this.state)
      return(
        <div className="no-data">
            <Typography variant="subheading" component="h3" style={{width:'100%' , margin:'auto', }} >No has one voted this way...</Typography>
        </div>
      )
  }
}

export default NoData