import React from 'react'
import {  compose, branch, renderComponent } from 'recompose'
import classnames from 'classnames';
import NoVotes from './no-votes'


import {VictoryPie, VictoryLegend, VictoryTooltip, VictoryLabel} from 'victory'

import '../../../style/index.scss'

import MaterialStyles from '../../../style/material-ui-style'


import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class PieResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noColorScale: this.getColorsArray(this.props.noData),
      yesColorScale: this.getColorsArray(this.props.yesData),
      toolTipColor: null,
    }
    this.renderYesPie = this.renderYesPie.bind(this)
    this.renderNoPie = this.renderNoPie.bind(this)
    this.renderLegendKey = this.renderLegendKey.bind(this)
  }

  getColorsArray(data){
    let color_data = []
    if (data.length> 0){
      data.map((category)=>{
        console.log('category....!',category, this.props.colorCategories)
          color_data.push(this.props.colorCategories[category.x])
      })
      console.log('COLOR DATAAA', color_data)
    }
  
    return color_data;
  }
  
renderYesPie(){
  console.log('this.props on Yes PIE', this.props)

  return (
    <div className="yes-no-pie">

      <Typography variant="subheading" component="h3"> Yes Votes </Typography>

      {this.props.totalsData.yesVotes === 0 ? <NoVotes/> :
        <VictoryPie
         labelComponent={
            <VictoryTooltip
              x={345}
              y={375}
              dx={0}
              dy={0}
              orientation={'bottom'}
              pointerLength={0}
              pointerWidth={0}
              style={MaterialStyles.pie_hover_text}
              events={{onClick:(e)=>console.log(e)}}
              text={(data) => data.y+"% of users who voted yes "+this.props.labelSentence+data.x}
              labelComponent={<VictoryLabel/>}
            />}
          innerRadius={10}
          data={this.props.yesData}
          padAngle={1}
          animate={{ duration: 2000 }}
          style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
          labelRadius={90}
          colorScale={this.state.yesColorScale}
        />}
        </div>
  )
}


renderNoPie(){
  console.log('this.props on NO PIE', this.props)
  
  return (
    <div className="yes-no-pie"> 
      <Typography variant="subheading" component="h3"> No Votes </Typography>

      {this.props.totalsData.noVotes === 0 ? <NoVotes/> :
        <VictoryPie
         labelComponent={
          <VictoryTooltip
            x={325}
            y={375}
            dx={0}
            dy={0}
            orientation={'bottom'}
            pointerLength={0}
            pointerWidth={0}
            style={MaterialStyles.pie_hover_text}
            events={{onClick:(e)=>console.log(e)}}
            text={(data) => data.y+"% of users who voted no "+this.props.labelSentence+data.x}
            labelComponent={<VictoryLabel/>}
          />}
          innerRadius={10}
          data={this.props.noData}
          padAngle={1}
          animate={{ duration: 2000 }}
          style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
          labelRadius={90}
          colorScale={this.state.noColorScale}
        />}
        </div>
  )
}

renderLegendKey(){
    return(
            Object.keys(this.props.colorCategories).map((category, i)=>{
                return (
                    <div key={i}>
                    <Chip style={{...MaterialStyles.legendChip, backgroundColor:this.props.colorCategories[category]}}>
                        {category}
                    </Chip>
                    </div>
                )
            })
    )
}

  render(){
    console.log('yes-no pie charts', this.props, this.state)
    let {classes} = this.props
      return(
        <div>
          <Card>
            <CardActions 
              disableActionSpacing
              onClick={()=> this.props.handleDataExpand(this.props.expandedState)}
            >
                <Typography className={this.props.classes.text}>
                  {this.props.title}
                </Typography>
                
                <IconButton
                  className={classnames(this.props.classes.expand, {
                    [this.props.classes.expandOpen]: this.props.dataExpanded,
                  })}
                  // onClick={this.handleExpandClick}
                  aria-expanded={this.props.dataExpanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
            <Collapse in={this.props.dataExpanded} timeout="auto" unmountOnExit>
              <CardContent>
                  <Typography className={this.props.classes.text}>
                  <div className="yes-no-pie-container">
                    {this.renderYesPie()}  
                    {this.renderNoPie()}
                 </div>
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      )
  }
}


export default compose(
  // connect(mapStateToProps, mapDispatchToProps),
  // withStyles(styles, {withTheme:true}),
)(PieResults);