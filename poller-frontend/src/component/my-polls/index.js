
import React from 'react'

import UserPollCard from '../user-poll-card'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
  import Collapse from '@material-ui/core/Collapse';
  import MoreVertIcon from '@material-ui/icons/MoreVert';
  import DeleteIcon from '@material-ui/icons/Delete';


export const MyPolls = ({...props}) => props.userPolls.map(poll => <div className="list-row" key={poll.objectID}>
                <UserPollCard 
                author_username={poll.author_username} 
                created_at={poll.created_at}
                subject={poll.subject}
                question={poll.question}
                pollActions={<IconButton
                    className={props.classes.pollActions}
                    onClick={()=> props.handlePollDeleteAlertOpen(poll)}
                  >
                    <DeleteIcon />
                  </IconButton>}
                classes={props.classes}
                />
            </div>)




