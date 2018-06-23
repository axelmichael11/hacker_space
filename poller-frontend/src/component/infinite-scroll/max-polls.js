import React from 'react'

import {  compose, branch, renderComponent} from 'recompose'


import '../../style/index.scss'

import Typography from '@material-ui/core/Typography';
import  Button from '@material-ui/core';
import LoadingHOC from '../loading/loadingHOC'

import { withStyles } from '@material-ui/core';







const styles = theme => ({
    button:theme.overrides.MuiButton
})

const MaxPolls = ({...props}) =>{
    return(
    <div className="no-data">
        <Typography variant="headline" component="h3" 
        style={{width:'100%' , margin:'auto', textAlign:'center' }}>
        It appears that is all the polls posted recently! Check back for more or 
        search for more below...
        </Typography>
        <Button 
            variant="outlined"
            onClick={props.fetchPolls} 
            className={props.classes.button}
            >
            SEARCH FOR MORE POLLS
    </Button>
    </div>
    )
}

const MaxPollsWithStyle =  compose(
    withStyles(styles, {withTheme:true})
)(MaxPolls)

const FeedBackMaxPollsReached = LoadingHOC(MaxPollsWithStyle)



export default FeedBackMaxPollsReached
