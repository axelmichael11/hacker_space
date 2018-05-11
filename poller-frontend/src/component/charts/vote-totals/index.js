import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar'

import {VictoryBar} from 'victory'
import MaterialStyles from '../../../style/material-ui-style'

// import '../../style/index.scss'

class TotalVotesGraph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        data: this.getData(),
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


  getData() {
    const rand = () => Math.max(Math.floor(Math.random() * 10000), 1000);

    return [
        { x: 'Yes', y: this.props.totalVotesData.yesVotes },
        { x: 'No', y: this.props.totalVotesData.noVotes },
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
      console.log('total bar GRAPH DATA!', this.state, this.props)
      const style = {
        parent: { data: { fill: "black"}, margin: "2%", maxWidth: "100%" }
      };
      return(
          <div>
              <Card  style={{maxWidth: 450, margin: 'auto', marginBottom: 15 }}>
                    <AppBar
                      style={{...MaterialStyles.title, margin:'auto' }}
                      title={'Vote Results'}
                      showMenuIconButton={false}
                    />
                  <CardMedia>
                  <VictoryBar name="Bar-1"
                        style={style}
                        labels={(d) => d.y+"%"}
                        data={this.state.data}
                    />
                  </CardMedia>
                  </Card>
          </div>
      )
  }




}

export default TotalVotesGraph