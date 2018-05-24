import React from 'react';
import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

const styles =theme=>({
  
})

const Loading = (props) => {
  const { classes } = props;
  return (
    <div>
      <CircularProgress style={{ color: "#000" }} thickness={7} size={50}/>
    </div>
  );
};

Loading.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {withTheme:true})
)(Loading)