import React from 'react'
import { connect } from 'react-redux'
import {recompose, compose} from 'recompose'


import CardContent from '@material-ui/core/CardContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


import country_list from '../../lib/countries.js'
import profession_list from '../../lib/professions.js'
import ethnicity_list from '../../lib/ethnicities.js'

import MaterialStyles from '../../style/material-ui-style'


const styles = theme => ({
  container: theme.overrides.MuiPaper,
  listItem:theme.overrides.MuiListItem.container,
  cardHeader:theme.overrides.PollCard.cardHeader,
  cardContent:theme.overrides.PollCard.cardContent,
})


const ProfileCategory = ({...props})=> {
  let {classes} = props
  let {age, profession, religion, ethnicity, gender, country} = props.userProfile

  let handleBool = function(category){
    if (category===true)
      return 'Religious';
    if (category=== false)
      return 'Not Religious';
    if (category===null )
      return 'Unknown';
  }

  let profileInformation = {
    'Age':age,
    'Profession':profession_list[profession], 
    'Religion': handleBool(religion), 
    'Ethnicity':ethnicity_list[ethnicity], 
    'Gender': gender, 
    'Country':country_list[country]
  }

     return (
       <div>
        {Object.keys(profileInformation).map((category,i)=>
          <div key={i}> 
            <CardContent className={classes.cardContent}>
             <Toolbar className={classes.cardContent}>
              <Typography variant="subheading" style={{width:'50%'}}>
                {category}
              </Typography>
            <div>
              <List>
                <ListItem
                  button
                  className={classes.listItem}
                >
                  <ListItemText
                    primary={profileInformation[category] ? profileInformation[category]: "Unknown"}
                  />
                </ListItem>
              </List>
            </div>
          </Toolbar>
        </CardContent>
      </div>)}
    </div>
    )
}

export const mapStateToProps = state => ({
    userProfile: state.userProfile,
  })
  
export const mapDispatchToProps = dispatch => ({
})







export default compose(
    connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles, {withTheme:true}),
)(ProfileCategory);