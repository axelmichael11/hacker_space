
import React from 'react'
import NavBar from '../nav-bar'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Auth0Lock from 'auth0-lock'
import InfiniteScroll from 'react-infinite-scroller'
import {  compose } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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



export const withInfiniteScroll = (Component) => {
  return class WithInfiniteScroll extends React.Component {
    constructor(props) {
        super(props);
        
        this.onScroll = this.onScroll.bind(this);
        }

    componentDidMount() {
      window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll(){
        if (
          (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
          this.props.list.length &&
          !this.props.Loading
        ) {
          this.props.getPublicPolls();
        }
      }

    render() {
      return <Component {...this.props} />;
    }
  }
}