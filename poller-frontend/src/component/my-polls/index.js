
import React from 'react'
import {compose, branch, renderComponent} from 'recompose'
import UserPollCard from '../user-poll-card'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
  import Collapse from '@material-ui/core/Collapse';
  import MoreVertIcon from '@material-ui/icons/MoreVert';
  import DeleteIcon from '@material-ui/icons/Delete';
import NoPolls from './no-polls'
import Error from '../error'
import Loader from '../loading/loader'
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  container: theme.overrides.MuiPaper,
  ageSelect:{
    marginLeft: 15,
  },
  button: theme.overrides.MuiButton,
 
  text: theme.typography.text,
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  actions: {
    display: 'flex',
  },
  expandMoreIcon:{
    colorPrimary: theme.palette.secondary.main
  },

  cardHeader:theme.overrides.PollCard.cardHeader,
  cardContent:theme.overrides.PollCard.cardContent,
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  pollActions: theme.overrides.PollCard.pollActions,
});


export const Polls = ({...props}) => props.userPolls.length > 0 ?
props.userPolls.map((poll,key) => <div className="list-row" key={key}>
                <UserPollCard 
                poll={poll}
                pollActions={<IconButton
                    className={props.classes.pollActions}
                    onClick={()=> props.handlePollDeleteAlertOpen(poll)}
                  >
                    <DeleteIcon />
                  </IconButton>}
                // classes={props.classes}
                />
            </div>) : <NoPolls/>


const WithLoading = (props) => {
  return (
    <div>
      <Loader start={Date.now()} timeError={props.timeError}/>
    </div>
  )
}


const MyPolls = compose(
  withStyles(styles, {withTheme:true}),
  branch(
    (props)=>props.Loading && !props.error,
    renderComponent(WithLoading)
  ),
  branch(
    props =>
    !props.Loading && props.error,
    renderComponent(Error)
  ),
)(Polls);

export default MyPolls







