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
        //   fullScreen={fullScreen}
          open={props.dialogOpen}
        //   onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle > {props.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {props.dialogContent}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className={classes.root}>
                <List component="nav">
                    {props.dialogActions.map((option)=> option)}
                <ListItem button onClick={props.handleClose}>
                        <ListItemText inset primary="Cancel" />
                </ListItem>
            </List>
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
dialogActions:PropTypes.array.isRequired,
dialogOpen: PropTypes.bool.isRequired,
handleClose: PropTypes.func.isRequired,

};


export default compose(
    // These are both single-argument HOCs
    // connect(mapStateToProps, mapDispatchToProps),
    withMobileDialog,
    withStyles(styles)
  )(ResponsiveDialog)

// export default withMobileDialog()(ResponsiveDialog);