import React from 'react';
import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';
import Loader from './loader'

const styles =theme=>({
  
})



const WithLoading =  (loadingCondition) => (Component) => (props) => {
  return (
    <div>
    {loadingCondition(props) ? <Loader start={Date.now()}/> : <Component {...props}/>}
    </div>
  )
}

const loadingCondition = props =>
  props.Loading && !props.error;


const LoadingHOC = compose(
withStyles(styles, {withTheme:true}),
WithLoading(loadingCondition)
);

export default LoadingHOC





