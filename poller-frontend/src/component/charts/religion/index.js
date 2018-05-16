import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {VictoryPie, VictoryLegend, VictoryTooltip} from 'victory'
import AppBar from 'material-ui/AppBar'

import '../../../style/index.scss'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MaterialStyles from '../../../style/material-ui-style'
import NoVotes from '../no-votes-render'


class ReligionPieResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        yesReligionData: this.getYesReligionData(),
        noReligionData: this.getNoReligionData()
    }
    this.renderYesPie = this.renderYesPie.bind(this)
    this.renderNoPie = this.renderNoPie.bind(this)
  }


  getYesReligionData() {

    return [
      { x: "Religious", y: this.props.yesVoteData.yes_religion_total },
      { x: "Not Religious", y: this.props.yesVoteData.no_religion_total },
      { x: "Unknown", y: this.props.yesVoteData.null_religion_total },
    ];
  }

  getNoReligionData() {

    return [
      { x: "Religious", y: this.props.noVoteData.yes_religion_total },
      { x: "Not Religious", y: this.props.noVoteData.no_religion_total },
      { x: "Unknown", y: this.props.noVoteData.null_religion_total },
    ];
  }

renderYesPie(){
  return (
      this.props.totalsData.yesVotes === 0 ? <NoVotes/> :
      <div>  
        <VictoryPie
         labelComponent={<VictoryTooltip/>}
          innerRadius={50}
          data={this.state.yesReligionData}
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
          data={this.state.noReligionData}
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
              title={'Religion'}
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
              <VictoryLegend 
                x={125} 
                y={10}
                height={50}
                orientation="horizontal"
                gutter={20}
                style={{ border: { stroke: "black" } }}
                colorScale={[ "navy", "blue", "cyan" ]}
                data={[
                  { name: "Religious" }, { name: "Not Religious" }, { name: "Unknown" }
                ]}
              />
              </div>
            </CardMedia>    
          </Card>
        </div>
      )
  }

//   render() {
//     console.log('THIS>PROPS ON LOGIN PAGE', this.props)
//     return (
//       <div>
//         <MuiThemeProvider>
//           <Paper zdepth={2} style={styles.login_container}>
//           <VictoryPie
//             style={{ ...this.state.style, labels: { fontSize: 0 } }}
//             data={this.state.data}
//             innerRadius={100}
//             animate={{ duration: 2000 }}
//             colorScale={this.state.colorScale}
//             dataComponent={<BorderLabelSlice />}
//           />
//           </Paper>
//         </MuiThemeProvider>

//       </div>
//     )
//   }


}

export default ReligionPieResults