
import React from 'react';
import {compose} from 'recompose'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = (props) => {
    const { classes } = props;
    return (
      <div>
        <CircularProgress style={{ color: "#000", textAlign:'center', margin:'auto'}} thickness={7} size={75}/>
      </div>
    );
  };

  export default Loader