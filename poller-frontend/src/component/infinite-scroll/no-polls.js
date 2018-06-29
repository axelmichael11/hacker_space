import React from 'react'
import {  compose, branch, renderComponent} from 'recompose'



import '../../style/index.scss'

import MaterialStyles from '../../style/material-ui-style'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/cancel'
import Paper from '@material-ui/core/Paper';



const styles = theme => ({
  container: theme.overrides.MuiPaper,
  button:theme.overrides.MuiButton
})


 const NoPolls = ({...props}) => {
      return(
        <div style={{textAlign:'center'}}>
            <CancelIcon style={{fontSize:40}}/>
            <Typography variant="headline">
            No Polls Listed...
                </Typography>
                <Button 
                variant="outlined"
                onClick={props.fetchPolls} 
                className={props.classes.button}
                style={{marginTop:10}}
                >
                SEARCH FOR MORE POLLS
                </Button>
    </div>
      )
}


export default  compose(
  withStyles(styles, {withTheme:true})
)(NoPolls)