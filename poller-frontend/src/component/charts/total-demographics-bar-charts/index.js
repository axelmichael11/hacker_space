import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar'

import {VictoryBar, VictoryStack, VictorySelectionContainer, Bar, VictoryChart, VictoryGroup, VictoryAxis} from 'victory'
import MaterialStyles from '../../../style/material-ui-style'

// import '../../style/index.scss'

class TotalDemographicBarCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        religionData: this.getReligionData(),
        genderData: this.getGenderData(),
        // transitionData: this.getTransitionData(),
        colorScale: [
            "#D85F49",
            "#F66D3B",
            "#D92E1D",
            "#D73C4C",
            "#FFAF59",
            "#E28300",
            "#F6A57F"
          ],

    }

  }


  getYesData() {
    // const rand = () => Math.max(Math.floor(Math.random() * 10000), 1000);

    return [
        { x: 'Religious', y: this.props.voteData.religion_data.yes_religion_total},
        { x: 'Not Religious', y: this.props.voteData.religion_data.no_religion_total},
        { x: 'Unknown', y: this.props.voteData.religion_data.null_religion_total},
      ];
  }
    getNoData() {
    // const rand = () => Math.max(Math.floor(Math.random() * 10000), 1000);

    return [
        { x: 'Religious', y: this.props.voteData.religion_data.yes_religion_total},
        { x: 'Not Religious', y: this.props.voteData.religion_data.no_religion_total},
        { x: 'Unknown', y: this.props.voteData.religion_data.null_religion_total},
      ];
  }



//   getTransitionData() {
//     const data = random(6, 9);
//     return range(data).map((datum) => {
//       return {
//         x: datum,
//         y: random(2, 9),
//         label: `#${datum}`
//       };
//     });
//   }


  render(){
      console.log('total demographics GRAPH DATA!', this.state, this.props)
      const style = {
        parent: { data: { fill: "black"}, margin: "2%", maxWidth: "100%" }
      };
      return(
          <div>
              <Card  style={{maxWidth: 450, margin: 'auto', marginBottom: 15 }}>
                    <AppBar
                      style={{...MaterialStyles.title, margin:'auto' }}
                      title={this.props.title}
                      showMenuIconButton={false}
                    />
                  <CardMedia>
                  <VictoryChart
                            // domainPadding={{ x: 100 }}
                        >
                        <VictoryAxis/>
                        <VictoryGroup 
                            offset={25}
                            colorScale={["tomato", "orange", "gold"]}
                            animate={{
                                duration: 2000,
                                onLoad: { duration: 1000 }
                              }}
                        >
                        
                            <VictoryBar
                            data={this.state.religionData}
                            categories={{ x: ["dogs", "cats", "mice"] }}
                            />
                            
                        </VictoryGroup>
                        </VictoryChart>
                  </CardMedia>
                  </Card>
          </div>
      )
  }




}

export default TotalDemographicBarCharts





// <VictoryStack 
// colorScale="heatmap"
//   containerComponent={
//       <VictorySelectionContainer
//           selectionStyle={{
//           stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
//           }}
//           onSelection={(points, bounds, props)=>console.log(points, bounds, props)}
//           />
//       }
//   animate={{
//       duration: 2000,
//       onLoad: { duration: 1000 }
//   }}
//   labels={["Religious", "Gender", "Profession"]}
//   >

//       <VictoryBar
//       // dataComponent={
//       //     <Bar
//       //       events={{
//       //         onClick: (evt) => {
//       //             console.log(evt)
//       //         }
//       //       }}
//       //     />
//       //   }
//       style={{
//           data: {
//           stroke: (d, active) => active ? "black" : "none",
//           strokeWidth: 2
//           }
//       }}
//       size={(datum, active) => active ? 5 : 3}
//       data={this.state.religionData}
//       />

// </VictoryStack>