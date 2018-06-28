
import React from 'react';
import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';



const styles =theme=>({
  button: theme.overrides.MuiButton
})



const SubmitButton = ({...props}) =>{
    return (
      <div>
        <Button 
        variant="outlined"
        onClick={props.submitClick} 
        className={props.classes.button}
        >
        {props.buttonTitle}
        </Button>
      </div>
    )
  }

  SubmitButton.propTypes = {
    submitClick: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired,
}

export default compose(
    withStyles(styles, {withTheme:true}),
)(SubmitButton)