
import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {VictoryPie, VictoryLegend, VictoryTooltip, VictoryLabel} from 'victory'
import AppBar from 'material-ui/AppBar'

import '../../../style/index.scss'
import Chip from 'material-ui/Chip';

import MaterialStyles from '../../../style/material-ui-style'
import Typography from '@material-ui/core/Typography';




class HoverLabel extends React.Component {
    render() {
      const {x, y, orientation, title, vote} = this.props;
      if (x =="Unknown"){
          return <Typography variant="title" component="h3">{`${y} of voters who voted ${vote} have an Unknown ${this.props.title}`}</Typography>
      } else {
        return <Typography variant="title" component="h3">{`${y} of voters who voted ${vote} are ${x}`}</Typography>
      }
    }
}

export default HoverLabel