import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar'

import {VictoryBar, VictoryStack, VictorySelectionContainer} from 'victory'
import MaterialStyles from '../../../style/material-ui-style'

// import '../../style/index.scss'

class TotalDemographicBarCharts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        // data: this.getData(),
        // transitionData: this.getTransitionData(),
        // colorScale: [
        //     "#D85F49",
        //     "#F66D3B",
        //     "#D92E1D",
        //     "#D73C4C",
        //     "#FFAF59",
        //     "#E28300",
        //     "#F6A57F"
        //   ],

    }

  }


//   getData() {
//     const rand = () => Math.max(Math.floor(Math.random() * 10000), 1000);

//     return [
//         { x: 'Yes', y: this.props.totalVotesData.yesVotes },
//         { x: 'No', y: this.props.totalVotesData.noVotes },
//       ];
//   }



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
      console.log('total bar GRAPH DATA!', this.state, this.props)
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
                  <VictoryStack style={style}
                    containerComponent={
                    <VictorySelectionContainer
                        selectionStyle={{
                        stroke: "tomato", strokeWidth: 2, fill: "tomato", fillOpacity: 0.1
                        }}
                        
                    />
                    }
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                      }}
                    labels={["Age", "Country", "Ethnicity"]}
                >
                    <VictoryBar
                    style={{
                        data: {
                        fill: "tomato",
                        stroke: (d, active) => active ? "black" : "none",
                        strokeWidth: 2
                        }
                    }}
                    size={(datum, active) => active ? 5 : 3}
                    data={[
                        { x: 1, y: -5 },
                        { x: 2, y: 4 },
                        { x: 3, y: 2 },
                        { x: 4, y: 3 },
                        { x: 5, y: 1 },
                        { x: 6, y: -3 },
                        { x: 7, y: 3 }
                    ]}
                    />
                    <VictoryBar
                    style={{
                        data: {
                        fill: "orange",
                        stroke: (d, active) => active ? "black" : "none",
                        strokeWidth: 2
                        }
                    }}
                    size={(datum, active) => active ? 5 : 3}
                    data={[
                        { x: 1, y: -3 },
                        { x: 2, y: 5 },
                        { x: 3, y: 3 },
                        { x: 4, y: 0 },
                        { x: 5, y: -2 },
                        { x: 6, y: -2 },
                        { x: 7, y: 5 }
                    ]}
                    />
                    <VictoryBar
                    style={{
                        data: {
                        fill: "gold",
                        stroke: (d, active) => active ? "black" : "none",
                        strokeWidth: 2
                        }
                    }}
                    data={[
                        { x: 1, y: 5 },
                        { x: 2, y: -4 },
                        { x: 3, y: -2 },
                        { x: 4, y: -3 },
                        { x: 5, y: -1 },
                        { x: 6, y: 3 },
                        { x: 7, y: -3 }
                    ]}
                    />
          </VictoryStack>
                  </CardMedia>
                  </Card>
          </div>
      )
  }




}

export default TotalDemographicBarCharts