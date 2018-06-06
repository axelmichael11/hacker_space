import React from 'react'
import { withRouter, Route } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import ReportIcon from '@material-ui/icons/report'
import ResponsiveDialog from './card-option-dialog'


import LoadingHOC from '../loading'


import MaterialStyles from '../../style/material-ui-style'


const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });


const SubmitReportButton = ({...props}) =>{
  return (
    <div className={props.classes.buttonContainer}>
     <ListItem button className={props.classes.button} onClick={props.onClick}>
        <ListItemIcon>
            {props.buttonIcon}
        </ListItemIcon>
        <ListItemText inset primary={props.buttonTitle}/>
    </ListItem>
    </div>
  )
}

const FeedBackReportButton = LoadingHOC(SubmitReportButton)

class ReportButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            reportDialog:false,
            reportLoading:false,
        }
      }
      handleClickOpen(){
        this.setState({ reportDialog: true });
      };
    
      handleClose(){
        this.setState({ reportDialog: false });
      };

      reportPoll(){
          console.log('report POlL!!')
          this.setState({ reportLoading: true });
      }

    render(){
        console.log('this.PROPS on the pollcreate button', this.context, this.props.history)
        let {classes} = this.props
        const dialogActions = [
            <FeedBackReportButton
            onClick={this.reportPoll}
                buttonTitle="I Find this Offensive, Please Report"
                buttonIcon={<ReportIcon/>}
                classes={classes}
                Loading={this.state.reportLoading}
            />
        ]
        return (
            <div>
                <ResponsiveDialog
                dialogTitle={"Report This Poll"}
                dialogContent={"Is this poll offensive? Please report if so and we will review this shortly! Sorry for the material :("}
                dialogActions={dialogActions}
                dialogOpen={this.state.reportDialog}
                handleClose={this.handleClose}
                />
                <MenuItem onClick={()=>this.handleClickOpen()}>Report Poll</MenuItem>
           </div>
        )
    }
}

export const mapStateToProps = state => ({
    loggedIn: state.loggedIn,
    userProfile: state.userProfile,
})

export const mapDispatchToProps = dispatch => ({
})


export default compose(
    // These are both single-argument HOCs
    // connect(mapStateToProps, mapDispatchToProps),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
  )(ReportButton)

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportButton))