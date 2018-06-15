import React from 'react'
import {  compose, branch, renderComponent } from 'recompose'
import classnames from 'classnames';
import NoData from './no-data'
import HoverLabel from './hover-label'

import {VictoryPie, VictoryLegend, VictoryTooltip, VictoryLabel, VictoryContainer} from 'victory'

import '../../../style/index.scss'

import MaterialStyles from '../../../style/material-ui-style'

import { withStyles } from '@material-ui/core/styles';

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





const styles = theme =>({
  text:{
    root:{
      margin:'auto',
    },
  },
  legendContainer: {
    width: '90%',
    margin: 'auto',
    marginBottom:20,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  legendStyle:{
    maxWidth: 300,
    margin: 'auto', 
    marginBottom: 15, 
    textAlign:'center',
    position:'relative'
  },
  legendChip:{
    root:{marginTop:5,
    marginBottom:5,  
    fontFamily:'Play', 
    position:'relative'
}
},
  cardHeader:theme.overrides.PollCard.cardHeader,
  // collapse:theme.overrides.MuiCollapse,
  resultActionCard: theme.overrides.MuiCardActions,
  expandMoreIcon:{
    colorPrimary: theme.palette.secondary.main
  }
})




class PieResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      noColorScale: this.getColorsArray(this.props.noData),
      yesColorScale: this.getColorsArray(this.props.yesData),
      toolTipColor: null,
      helpText:''
    }
    this.renderYesPie = this.renderYesPie.bind(this)
    this.renderNoPie = this.renderNoPie.bind(this)
    this.renderLegendKey = this.renderLegendKey.bind(this)
    this.renderHelpText = this.renderHelpText.bind(this)
    this.handleUpdateHelpText = this.handleUpdateHelpText.bind(this)
    this.handleClearHelpText = this.handleClearHelpText.bind(this)

  }

  renderHelpText(){
    console.log('THIS IS THE DATA!')
    return (<div style={{}}>
    <Typography variant="subheading" style={{textAlign:'center'}}> {this.state.helpText}</Typography>
    </div>)
  }

  handleUpdateHelpText(d, vote){
    console.log("HANLDE HELP TEXT METHOD", d)
    if (d.x=="Unknown"){
      this.setState({helpText:`${d.y}% of voters who voted ${vote} have an Unknown ${this.props.title}`})
    } else {
      this.setState({helpText:`${d.y}% of voters who voted ${vote} are ${d.x}`})
    }
  }

  handleClearHelpText(){
    this.setState({helpText:""})
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
  let {classes} = this.props

  return (
    <div className="yes-no-pie">
      <Typography variant="headline" component="h3" align="center" className="yes-no-votes-title"> Yes Votes </Typography>
      {this.props.totalsData.yesVotes === 0 ? <NoData/> :
        
        <VictoryPie
        containerComponent={<VictoryContainer 
          style={{width:'100%'}}
        />}
        // eventKey={(data)=>console.log('EVENT KEY DATA', data)}
        events={[
          {target: "data",
          eventHandlers: {
            onMouseOver: () => ({
              target:"data",
              mutation: (props) => this.handleUpdateHelpText(props.datum, 'YES')
            })
          },
        },
        {target: "data",
          eventHandlers: {
            onMouseOut: () => ({
              target:"data",
              mutation: (props) => this.handleClearHelpText()
            })
          },
        },
        ]}
          innerRadius={10}
          data={this.props.yesData}
          padAngle={1}
          animate={{ duration: 2000 }}
          style={{ labels: { fontSize: 20, fontFamily:'Play', fontWeight: "bold" }, width:'50%' }}
          labelRadius={90}
          colorScale={this.state.yesColorScale}
        />
        }
        </div>
  )
}


renderNoPie(){
  console.log('this.props on NO PIE', this.props)
  let {classes} = this.props

  return (
    <div className="yes-no-pie"> 
      <Typography variant="headline" component="h3" align="center" className="yes-no-votes-title"> No Votes </Typography>

      {this.props.totalsData.noVotes === 0 ? <NoData/> :
     
        <VictoryPie
        containerComponent={<VictoryContainer 
          style={{width:'100%'}}
        />}         
        events={[
          {target: "data",
          eventHandlers: {
            onMouseOver: () => ({
              target:"data",
              mutation: (props) => this.handleUpdateHelpText(props.datum, 'NO')
            })
          },
        },
        {target: "data",
          eventHandlers: {
            onMouseOut: () => ({
              target:"data",
              mutation: (props) => this.handleClearHelpText()
            })
          },
        },
        ]}
          innerRadius={10}
          data={this.props.noData}
          padAngle={1}
          animate={{ duration: 2000 }}
          // style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold",width:'50%' } }}
          labelRadius={90}
          colorScale={this.state.noColorScale}
        />
        }
        </div>
  )
}

renderLegendKey(){
  let {classes} = this.props

    return(
          <div>
            <Paper className={classes.legendContainer}>
            {
            Object.keys(this.props.colorCategories).map((category, i)=>{
                return (
                    <div key={i}>
                    <Chip 
                    style={{backgroundColor:this.props.colorCategories[category], margin: 5 }}
                    label={category}
                    />
                    </div>
                )
            })
          }
            </Paper>
          </div>
    )
}

  render(){
    console.log('yes-no pie charts', this.props, this.state)
    let {classes} = this.props
      return(
        <div>
                <Paper square elevation={2} className={classes.container}>
            <CardActions 
              disableActionSpacing
              onClick={()=> this.props.handleDataExpand(this.props.expandedState)}
              classes={classes.MuiResultActionCard}
              className="category-card-actions"
            >
                <Typography classes={classes.text} align="center" variant="title" className="category-title">
                  {this.props.title}
                </Typography>
                
                <IconButton
                  className={classnames(this.props.classes.expand, {
                    [this.props.classes.expandOpen]: this.props.dataExpanded,
                  })}
                  // onClick={this.handleExpandClick}
                  aria-expanded={this.props.dataExpanded}
                  aria-label="Show more"
                  // className={classes.expandMoreIcon}
                >
                  <ExpandMoreIcon className={classes.expandMoreIcon}/>
                </IconButton>
              </CardActions>
            <Collapse in={this.props.dataExpanded} timeout="auto">
                    {this.renderYesPie()}  
                    {this.renderNoPie()}
                    {this.renderHelpText()}
                    {this.renderLegendKey()}
            </Collapse>
            </Paper>
        </div>
      )
  }
}


export default compose(
  // connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(PieResults);