import React from 'react';
import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';
import Loader from './loader'
import Snackbar from '@material-ui/core/Snackbar';


const styles =theme=>({
  
})



const WithLoading =  (loadingCondition) => (Component) => (props) => {
  console.log('hititng with loading !!!', props)

  return (
    <div>
    {loadingCondition(props) ? <Loader start={Date.now()} {...props}/> : <Component {...props}/>}
    </div>
  )
}


const loadingCondition = props =>
  props.Loading && !props.loadingError;

const errorCondition =  props =>
!props.Loading && props.loadingError;


const LoadingHOC = compose(
withStyles(styles, {withTheme:true}),
WithLoading(loadingCondition),
);



export default LoadingHOC





