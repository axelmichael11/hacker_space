import React from 'react'

import {  compose, branch, renderComponent} from 'recompose'


import '../../style/index.scss'

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LoadingHOC from '../loading/loadingHOC'

import { withStyles } from '@material-ui/core';

import CancelIcon from '@material-ui/icons/cancel'
import Paper from '@material-ui/core/Paper';






const styles = theme => ({
    container: theme.overrides.MuiPaper,
    button:theme.overrides.MuiButton
})

const MaxPolls = ({...props}) => {
    console.log('props on max polls', props)
    return(

        <div style={{textAlign:'center'}}>
        <CancelIcon style={{fontSize:40}}/>
        <Typography variant="headline" >
        It appears that is all of the polls we could find!    
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
)(MaxPolls)