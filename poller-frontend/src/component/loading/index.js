import React from 'react';
import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';


const styles =theme=>({
  buttonContainer: theme.overrides.MuiButton.root.container,
    button: theme.overrides.MuiButton.root.button,
})

const Loading = (props) => {
  const { classes } = props;
  return (
    <div>
      <CircularProgress style={{ color: "#000" }} thickness={7} size={50}/>
    </div>
  );
};


const WithLoading =  (loadingCondition) => (Component) => (props) => {
  return (
    <div>
    {loadingCondition(props) ? <Loading/> : <Component {...props}/>}
    </div>
  )
}

const loadingCondition = props =>
  props.Loading;

const LoadingHOC = compose(
withStyles(styles, {withTheme:true}),
WithLoading(loadingCondition)
);

export default LoadingHOC





