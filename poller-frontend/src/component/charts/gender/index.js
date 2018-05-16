import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory'
import AppBar from 'material-ui/AppBar'

import '../../../style/index.scss'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
 
import MaterialStyles from '../../../style/material-ui-style'
import NoVotes from '../no-votes-render'


class GenderPieResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      

        yesGenderData: this.getYesGenderData(),
        noGenderData: this.getNoGenderData()
    }
    this.renderYesPie = this.renderYesPie.bind(this)
    this.renderNoPie = this.renderNoPie.bind(this)
  }


  getYesGenderData() {

    return [
      { x: "Female", y: this.props.yesVoteData.female_total },
      { x: "Male", y: this.props.yesVoteData.male_total },
      { x: "Unknown", y: this.props.yesVoteData.gender_null_total },
    ];
  }

  getNoGenderData() {

    return [
      { x: "Female", y: this.props.noVoteData.female_total },
      { x: "Male", y: this.props.noVoteData.male_total },
      { x: "Unknown", y: this.props.noVoteData.gender_null_total },
    ];
  }

renderYesPie(){
  return (
      this.props.totalsData.yesVotes === 0 ? <NoVotes/> :
      <div>  
        <VictoryPie
        labelComponent={<VictoryTooltip/>}
          innerRadius={50}
          data={this.state.yesGenderData}
          padAngle={1}
          animate={{ duration: 2000 }}
          style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
          labelRadius={90}
        />
        </div>
  )
}


renderNoPie(){
  return (
      this.props.totalsData.noVotes === 0 ? <NoVotes/> :
      <div> 
        <VictoryPie
                labelComponent={<VictoryTooltip/>}

          innerRadius={50}
          data={this.state.noGenderData}
          padAngle={1}
          animate={{ duration: 2000 }}
          style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
          labelRadius={90}
        />
        </div>
  )
}

  render(){
    console.log('religious pie charts', this.props, this.state)
      return(
        <div>
           <Card  style={{maxWidth: 1000, margin: 'auto', marginBottom: 15, textAlign:'center'}}>
            <AppBar
              style={{...MaterialStyles.title, margin:'auto' }}
              title={'Gender'}
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
              <div className="yes-no-pies-legend">
                {/* <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Female"
                        onClick={() => this.select(0)}
                    />
                    </BottomNavigation>
                </Paper> */}
              <VictoryLegend 
                x={125} 
                y={10}
                height={50}
                orientation="horizontal"
                gutter={20}
                style={{ border: { stroke: "black" } }}
                colorScale={[ "navy", "blue", "cyan" ]}
                data={[
                  { name: "Female" }, { name: "Male" }, { name: "Unknown" }
                ]}
              />
              </div>
            </CardMedia>    
          </Card>
        </div>
      )
  }



}

export default GenderPieResults