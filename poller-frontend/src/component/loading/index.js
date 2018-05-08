import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const Loading = () => (
  <div>
      <MuiThemeProvider>
        <CircularProgress size={80} thickness={5} />
    </MuiThemeProvider>
  </div>
);

export default Loading