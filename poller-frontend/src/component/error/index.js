
import React from 'react';
import {compose} from 'recompose'
import { withStyles } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/error'
import PropTypes from 'prop-types';


import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = theme=> ({
    container: theme.overrides.MuiPaper,
    text: {

    }
  })

const Error = ({...props}) => {
    const { classes } = props;
    return (
      <div style={{textAlign:'center'}}>
        <Paper elevation={2} className={classes.container}>
            <ErrorIcon />
            <Typography component="h2" >
                Something went wrong...
                </Typography>
                <Button 
                variant="outlined"
                onClick={props.errorTry} 
                className={props.classes.button}>
                Try Again
                </Button>
          </Paper>
      </div>
    );
  };


Error.proptypes = {
  errorTry: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}
export default compose(
    withStyles(styles, {withTheme:true})
)(Error)