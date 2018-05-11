import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import VictoryPie from 'victory'

// import '../../style/index.scss'

import DemoPieCharts from './demo'
class ReligionPie extends React.Component {
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
//       { x: "Not Religious", y: rand(), label: "Not Religious", fill: "blue" },
//       { x: "Religious", y: this.props.religionData },
//       { x: "Unknown", y: rand() },
//     ];
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
      return(
        <DemoPieCharts/>
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

export default ReligionPie