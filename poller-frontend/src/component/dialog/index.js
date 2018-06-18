import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'recompose'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReportIcon from '@material-ui/icons/report'
import LoadingHOC from '../loading/button.js'
import {MyPolls} from '../my-polls'

import HelpTab from '../help-feature'


const SubmitButton = ({...props}) =>{
  return (
    <div 
    // className={props.classes.buttonContainer}
    >
      <Button 
      variant="outlined"
      onClick={props.submitClick} 
      className={props.classes.button}
      >
      {props.dialogSubmitText}
      </Button>
    </div>
  )
}



const FeedBackSubmitButton = LoadingHOC(SubmitButton)

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  });

  

const ResponsiveDialog = ({...props}) => {
    // const { fullScreen } = props;
   
  
    return (
      <div>
        <Dialog
          open={props.dialogOpen}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle > {props.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.dialogContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
               <div className={props.classes.container}>
            <Button 
              onClick={props.handleClose} 
              className={props.classes.button}
            >
              Cancel
            </Button>
            </div>
            <div className={props.classes.container}>

            <FeedBackSubmitButton
                classes={props.classes}
                submitClick={props.submitClick}
                dialogSubmitText={props.dialogSubmitText}
                Loading={props.submitLoading}
              />
            </div>
           
          </DialogActions>
        </Dialog>
      </div>
    );
  }

ResponsiveDialog.propTypes = {
//   fullScreen: PropTypes.bool.isRequired,
dialogTitle: PropTypes.string.isRequired,
dialogContent: PropTypes.string.isRequired,
// dialogActions:PropTypes.array.isRequired,
dialogOpen: PropTypes.bool.isRequired,
handleClose: PropTypes.func.isRequired,

};


export default compose(
    // These are both single-argument HOCs
    // connect(mapStateToProps, mapDispatchToProps),
    // withMobileDialog(),
    withStyles(styles)
  )(ResponsiveDialog)

// export default withMobileDialog()(ResponsiveDialog);