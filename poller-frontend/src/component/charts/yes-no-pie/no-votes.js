import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {VictoryPie, VictoryLegend, VictoryTooltip, VictoryLabel} from 'victory'
import AppBar from 'material-ui/AppBar'

import '../../../style/index.scss'
import Chip from 'material-ui/Chip';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MaterialStyles from '../../../style/material-ui-style'


class NoVotes extends React.Component {
  
  render(){
    console.log('yes-no pie charts', this.props, this.state)
      return(
        <div>
            <CardText style={{...MaterialStyles.text,display:'inline-block', 
                  padding: "0px", 
                  marginBottom:10, 
                  marginTop:10 }}
                          > No one voted this way... No data to display </CardText>
        </div>
      )
  }
}

export default NoVotes