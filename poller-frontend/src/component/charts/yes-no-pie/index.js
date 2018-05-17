import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory'
import AppBar from 'material-ui/AppBar'

import '../../../style/index.scss'
import Chip from 'material-ui/Chip';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MaterialStyles from '../../../style/material-ui-style'



class PieResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noColorScale: this.getColorsArray(this.props.noData),
      yesColorScale: this.getColorsArray(this.props.yesData)
    }
    this.renderYesPie = this.renderYesPie.bind(this)
    this.renderNoPie = this.renderNoPie.bind(this)
    this.renderLegendKey = this.renderLegendKey.bind(this)
  }

  getColorsArray(data){
    let color_data = []
    data.map((category)=>{
      console.log('category....!',category, this.props.colorCategories)
        color_data.push(this.props.colorCategories[category.x])
    })
    console.log('COLOR DATAAA', color_data)
    return color_data;
  }
  
renderYesPie(){
  console.log('this.props on Yes PIE', this.props)

  return (
      this.props.totalsData.yesVotes === 0 ? <NoVotes/> :
      <div>  
        <VictoryPie
         labelComponent={<VictoryTooltip/>}
          innerRadius={50}
          data={this.props.yesData}
          padAngle={1}
          animate={{ duration: 2000 }}
          style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
          labelRadius={90}
          colorScale={this.state.yesColorScale}
        />
        </div>
  )
}


renderNoPie(){
  console.log('this.props on NO PIE', this.props)
  return (
      this.props.totalsData.noVotes === 0 ? <NoVotes/> :
      <div> 
        <VictoryPie
         labelComponent={<VictoryTooltip/>}
          innerRadius={50}
          data={this.props.noData}
          padAngle={1}
          animate={{ duration: 2000 }}
          style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
          labelRadius={90}
          colorScale={this.state.noColorScale}
        />
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
      return(
        <div>
           <Card  style={{maxWidth: 1000, margin: 'auto', marginBottom: 15, textAlign:'center'}}>
            <AppBar
              style={{...MaterialStyles.appBarTitle, margin:'auto' }}
              title={this.props.title}
              showMenuIconButton={false}
            />
            <CardMedia>
              <div className="yes-no-pie-container">
                <div  className="yes-no-pie">
                <CardText style={{...MaterialStyles.title,display:'inline-block', 
                  padding: "0px", 
                  marginBottom:10, 
                  marginTop:10 }}
                          > Yes Votes </CardText>
               {this.renderYesPie()}
                </div>
                <div className="yes-no-pie">
                <CardText style={{...MaterialStyles.title,display:'inline-block', 
                  padding: "0px", 
                  marginBottom:10, 
                  marginTop:10 }}
                          > No Votes </CardText>  
                {this.renderNoPie()}
                </div>
              </div>
              <div>
              <Paper style={MaterialStyles.legendStyle}>
                   {this.renderLegendKey()}
                </Paper>
                </div>
            </CardMedia>    
          </Card>
        </div>
      )
  }
}

export default PieResults