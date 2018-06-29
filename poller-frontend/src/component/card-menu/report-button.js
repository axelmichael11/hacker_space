import React from 'react'
import { withRouter, Route } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import {compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem';
import ReportIcon from '@material-ui/icons/report'
// import ResponsiveDialog from './responsive-dialog'
import {reportPoll} from '../../action/report-poll-actions'


import MaterialStyles from '../../style/material-ui-style'


const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });

class ReportButton extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            reportLoading:false,
        }
        this.reportPoll = this.reportPoll.bind(this)
      }
    
    
      handleClose(){
        this.setState({ reportDialog: false });
      };

      reportPoll(){
          this.setState({ reportLoading: true });
          this.props.reportPoll(this.props.poll)
          .then((res)=>{
              this.setState({ reportLoading: false });

            })
          .catch((err)=>{
              this.setState({ reportLoading: false });

            })
      }


    render(){
        let {classes} = this.props
        return (
            <div>
                <MenuItem onClick={this.props.handleOpenReportDialog}>Report Poll</MenuItem>
           </div>
        )
    }
}

export const mapStateToProps = state => ({
    userProfile: state.userProfile,
})

export const mapDispatchToProps = dispatch => ({
    reportPoll: ()=>dispatch(reportPoll())
})


export default compose(
    // These are both single-argument HOCs
    // connect(mapStateToProps, mapDispatchToProps),
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
  )(ReportButton)

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportButton))