
import React from 'react'

import UserPollCard from '../user-poll-card'
import Button from '@material-ui/core/Button';



export const MyPolls = ({...props}) => props.userPolls.map(poll => <div className="list-row" key={poll.objectID}>
                <UserPollCard 
                author_username={poll.author_username} 
                created_at={poll.created_at}
                subject={poll.subject}
                question={poll.question}
                pollActions={()=>{
                  <Button className={classes.button} variant="raised" color="secondary" onClick={this.handlePollDeleteAlert}>
                          Delete
                      <Delete className={classes.deleteButton} />
                  </Button>
                }}
                />
            </div>)




