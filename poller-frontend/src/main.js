
import React from 'react'
import ReactDom from 'react-dom'
import App from './component/app'
import { Provider } from 'react-redux'
import storeCreate from './lib/store-create'
import { persistStore } from 'redux-persist'
import {profileFetch} from './action/profile-actions.js'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MaterialStyles from './style/material-ui-style'

const store = storeCreate()
persistStore(store)

const theme = createMuiTheme(MaterialStyles.pollerTheme)

class Main extends React.Component {
  componentWillUpdate() {
    persistStore(store)
  }

  componentWillMount() {
    // load the token
  
  }

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </Provider>
    )
  }
}

ReactDom.render(<Main />, document.getElementById('root'))