
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'

import {  compose } from 'redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {withInfiniteScroll} from '../infinite-scroll'
import {
    Step,
    Stepper,
    StepButton,
    StepContent,
  } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import MaterialStyles from '../../style/material-ui-style'
import AppBar from 'material-ui/AppBar'
import '../../style/index.scss'

import {getPublicPolls} from '../../action/public-poll-actions.js'
import LoginPage from '../login'
import SettingsButton from '../menu/settings-button.js'
import Loading from '../loading'


const List = ({ list }) => {
  <div className="list">
  {list.map(poll => <div className="list-row" key={item.objectID}>
      <Link to={{
                pathname:`/poll/${poll.author_username}/${poll.created_at}`,
                state: poll
                }}>
                <Card  style={{maxWidth: 450, margin: 'auto', marginBottom: 15 }}>
                  <AppBar
                    style={{...MaterialStyles.title, margin:'auto' }}
                    title={null}
                    showMenuIconButton={false}
                  />
                <CardMedia>
                  <CardText style={{...MaterialStyles.title,display:'inline-block'}}
                  >
                    "<CardText style={{...MaterialStyles.title,display:'inline-block'}}>
                        {poll.question}
                      </CardText>
                    "
                  </CardText>
                </CardMedia>
                <Card>
                  <CardHeader
                    title={poll.subject}
                    subtitle={'Posted By: '+poll.author_username}
                    style={MaterialStyles.title}
                  />
                  </Card>
                </Card>
              </Link>
  </div>)}
</div>
}



class ExplorePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      polls: this.props.publicPolls
    }
  }

  componentWillMount(){
    this.props.getPublicPolls()
  }


  render() {
    const {stepIndex} = this.state;    
    console.log('explore page', this.state, this.props)
    return (
        <div className="endless-scroller" style={{maxWidth: 1000, maxHeight: 600, margin: 'auto'}}>
        <MuiThemeProvider>
            <CardText style={MaterialStyles.title}> Explore </CardText>
            <ListWithLoadingWithInfinite
              list={this.state.polls}
              page={this.state.page}
              getPublicPolls={this.props.getPublicPolls}
            />
            </MuiThemeProvider>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    publicPolls: state.publicPolls
  })
  
  export const mapDispatchToProps = dispatch => ({
    getPublicPolls:()=>dispatch(getPublicPolls())
    
  })
  
    
const ListWithLoadingWithInfinite = compose(
  withInfiniteScroll,
  Loading,
)(List);





  export default connect(mapStateToProps, mapDispatchToProps)(ExplorePage)


