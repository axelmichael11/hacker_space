//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Loading from '../loading'
import PieResults from '../charts/yes-no-pie/index'


import randomColor from 'randomcolor'; // import the script

import TotalVotesGraph from '../charts/vote-totals/index'
import profession_data from '../../lib/professions.js'
import ethnicity_data from '../../lib/ethnicities.js'
import country_data from '../../lib/countries.js'
//Methods

import * as util from '../../lib/util.js'
//These will be used, to store id of the user in the database...



//Style
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import AppBar from 'material-ui/AppBar'

import FlatButton from 'material-ui/FlatButton'
import FontAwesome from 'react-fontawesome' 

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';


import {
    fetchVoteHistory
} from '../../action/vote-actions'
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card'



class PollResultsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pollData: this.props.pollData,
      // yesReligionData: this.getYesReligionData(),
      // noReligionData: this.getNoReligionData(),
      // yesGenderData: this.getYesGenderData(),
      // noGenderData: this.getNoGenderData(),
      // noCountryData: this.getNoCountryData(),
      // yesCountryData: this.getYesCountryData(),
      // yesProfessionData: this.getYesProfessionData(),
      // noProfessionData: this.getNoProfessionData(),
      // yesEthnicityData: this.getYesEthnicityData(),
      // noEthnicityData: this.getNoEthnicityData(),
      // yesAgeData: this.getYesAgeData(),
      // noAgeData: this.getNoAgeData(),
      noProfessionData: this.generatePieData(this.props.pollData.no_data.profession_data, profession_data),
      yesProfessionData: this.generatePieData(this.props.pollData.yes_data.profession_data, profession_data),
      professionCategories: this.generateCategories(this.props.pollData.yes_data.profession_data, this.props.pollData.no_data.profession_data, profession_data),
      //ethnicity data
      noEthnicityData: this.generatePieData(this.props.pollData.no_data.ethnicity_data, ethnicity_data),
      yesEthnicityData: this.generatePieData(this.props.pollData.yes_data.ethnicity_data, ethnicity_data),
      ethnicityCategories: this.generateCategories(this.props.pollData.yes_data.ethnicity_data, this.props.pollData.no_data.ethnicity_data, ethnicity_data),
      //age data
      noAgeData: this.generatePieData(this.props.pollData.no_data.age_data),
      yesAgeData: this.generatePieData(this.props.pollData.yes_data.age_data ),
      ageCategories: this.generateCategories(this.props.pollData.yes_data.age_data, this.props.pollData.no_data.age_data),
      //gender data
      noGenderData: this.generatePieData(this.props.pollData.no_data.gender_data),
      yesGenderData: this.generatePieData(this.props.pollData.yes_data.gender_data ),
      genderCategories: this.generateCategories(this.props.pollData.yes_data.gender_data, this.props.pollData.no_data.gender_data),
      //country data
      noCountryData: this.generatePieData(this.props.pollData.no_data.country_data, country_data),
      yesCountryData: this.generatePieData(this.props.pollData.yes_data.country_data, country_data ),
      countryCategories: this.generateCategories(this.props.pollData.yes_data.country_data, this.props.pollData.no_data.country_data, country_data),
      //religion data
      noReligionData: this.generatePieData(this.props.pollData.no_data.religion_data),
      yesReligionData: this.generatePieData(this.props.pollData.yes_data.religion_data ),
      religionCategories: this.generateCategories(this.props.pollData.yes_data.religion_data, this.props.pollData.no_data.religion_data),
    }
  }

  generatePieData(data_object,  demographic_list){
    let data_values = [];
    if (demographic_list) {
      Object.keys(data_object).map((key, i)=>{
        if (demographic_list[key]){
          return data_values.push({x: demographic_list[key], y: data_object[key]})
        } else {
          return data_values.push({x: key, y: data_object[key]})
        }
     })
    } else {
      Object.keys(data_object).map((key, i)=>{
        return data_values.push({x: key, y: data_object[key]})
     })
    }
    console.log('getNoageData()', data_values)
    return data_values
  }
  

  generateCategories(yes_data_object, no_data_object, demographic_list){
    let data = [...Object.keys(yes_data_object), ...Object.keys(no_data_object)];
    console.log('generate categories data!!!!!!!!!',data)
    let categories = {};
    if (demographic_list) {
      data.map((data)=>{
        console.log(data)
        if (demographic_list[data]){
          categories[demographic_list[data]] = randomColor();
        } else {
          categories[data]=randomColor();
        }
      })
    } else {
      data.map((data)=>{
          categories[data]=randomColor();
      })
    }
    console.log('categories!!!!!!Sdflkjadsf',categories)
    return categories
  }

  
  


  componentWillMount() {
  }
  
  render() {
    console.log('pollResultsPage!!!!!!!!!!!!!!',this.state, this.props)
    return (
      <div>
        <MuiThemeProvider>
        {/* <Card  style={{maxWidth: 450, margin: 'auto', marginBottom: 15 }}>
                    <AppBar
                      style={{...MaterialStyles.title, margin:'auto' }}
                      title={"Question Asked..."}
                      showMenuIconButton={false}
                    />
                  <CardMedia>
                    <CardText style={{...MaterialStyles.title,display:'inline-block'}}
                    >
                      "<CardText style={{...MaterialStyles.title,display:'inline-block'}}>
                          {poll.question}
                        </CardText>
                      "
                    </CardText>
                  </CardMedia>
                  <Card>
                    <CardHeader
                      title={poll.subject}
                      subtitle={'Posted By: '+poll.author_username}
                      style={MaterialStyles.title}
                    />
                    </Card>
                  </Card> */}
          <TotalVotesGraph totalVotesData={this.state.pollData.totals_data} />
          <PieResults title={'Age'}
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesAgeData} 
          noData={this.state.noAgeData} 
          categories={Object.keys(this.state.ageCategories)}
          colorCategories= {this.state.ageCategories}
          labelSentence={"have an age between"}
          />
           <PieResults title={'Country'}
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesCountryData} 
          noData={this.state.noCountryData} 
          categories={Object.keys(this.state.countryCategories)}
          colorCategories= {this.state.countryCategories}
          labelSentence={" are from "}
          />

         <PieResults title={'Gender'}
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesGenderData} 
          noData={this.state.noGenderData} 
          categories={Object.keys(this.state.genderCategories)}
          colorCategories= {this.state.genderCategories}
          labelSentence={" are of gender "}
          />

          <PieResults title={'Profession'}
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesProfessionData} 
          noData={this.state.noProfessionData} 
          categories={Object.keys(this.state.professionCategories)}
          colorCategories= {this.state.professionCategories}
          labelSentence={" have a profession of "}
          />
          <PieResults title={'Ethnicity'}
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesEthnicityData} 
          noData={this.state.noEthnicityData} 
          categories={Object.keys(this.state.ethnicityCategories)}
          colorCategories= {this.state.ethnicityCategories}
          labelSentence={" are of "}
          />
          <PieResults title={'Religion'}
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesReligionData} 
          noData={this.state.noReligionData} 
          categories={Object.keys(this.state.religionCategories)}
          colorCategories= {this.state.religionCategories}
          labelSentence={" are "}
          />
          
          

        </MuiThemeProvider>
      </div>
    )
  }
}

export const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  Loading: state.Loading
})

export const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PollResultsPage)