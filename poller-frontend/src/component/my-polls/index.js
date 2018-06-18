
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


export const Polls = ({...props}) => props.userPolls.length > 0 ?
props.userPolls.map(poll => <div className="list-row" key={poll.objectID}>
                <UserPollCard 
                poll={poll}
                pollActions={<IconButton
                    className={props.classes.pollActions}
                    onClick={()=> props.handlePollDeleteAlertOpen(poll)}
                  >
                    <DeleteIcon />
                  </IconButton>}
                classes={props.classes}
                />
            </div>) : <NoPolls/>


const WithLoading = (props) => {
  return (
    <div>
      <Loader start={Date.now()}/>
    </div>
  )
}


const MyPolls = compose(
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







