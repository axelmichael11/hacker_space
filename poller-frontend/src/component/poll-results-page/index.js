//packages
import React from 'react'
import Auth0Lock from 'auth0-lock'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Loading from '../loading'


import randomColor from 'randomcolor'; // import the script

import TotalVotesGraph from '../charts/vote-totals/index'
import profession_data from '../../lib/professions.js'
import ethnicity_data from '../../lib/ethnicities.js'
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

import PieResults from '../charts/yes-no-pie/index'

import GenderPieResults from '../charts/gender/index'

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
      professionCategories: this.generateCategories(this.props.pollData.yes_data.profession_data, this.props.pollData.no_data.profession_data, profession_data)
      // categoriesAge: this.generateCategoriesAndColors(this.props.pollData.yes_data.age_data.age_list, this.props.pollData.no_data.age_data.age_list ),

    }
  }
  
  getYesReligionData() {
    console.log('hitting getYesReligionData, this is the data....', this.props)
    let {religion_data} = this.props.pollData.yes_data
    console.log('hitting getYesReligionData, this is the data....', religion_data)

    return [
      { x: "Religious", y: religion_data.yes_religion_total },
      { x: "Not Religious", y: religion_data.no_religion_total },
      { x: "Unknown", y: religion_data.null_religion_total },
    ];
  }

  getNoReligionData() {
    let {religion_data} = this.props.pollData.no_data
    return [
      { x: "Religious", y: religion_data.yes_religion_total },
      { x: "Not Religious", y: religion_data.no_religion_total },
      { x: "Unknown", y: religion_data.null_religion_total },
    ];
  }

  getYesGenderData() {
    let {gender_data} = this.props.pollData.yes_data
    return [
      { x: "Female", y: gender_data.female_total },
      { x: "Male", y: gender_data.male_total },
      { x: "Unknown", y: gender_data.gender_null_total },
    ];
  }

  getNoGenderData() {
    let {gender_data} = this.props.pollData.no_data
    return [
      { x: "Female", y: gender_data.female_total },
      { x: "Male", y: gender_data.male_total },
      { x: "Unknown", y: gender_data.gender_null_total },
    ];
  }

  getNoCountryData(){
    let {country_list} = this.props.pollData.no_data.country_data
    let country_values = [];
    Object.keys(country_list).map((key, i)=>{
       return country_values.push({x: key, y: country_list[key]})
    })
    country_values.push({x: 'Unknown', y: this.props.pollData.no_data.country_data.country_null})
    console.log('getNoCountryData()', country_values)
    return country_values
  }

  getYesCountryData(){
    let {country_list} = this.props.pollData.yes_data.country_data
    let country_values = [];
    Object.keys(country_list).map((key, i)=>{
       return country_values.push({x: key, y: country_list[key]})
    })
    country_values.push({x: 'Unknown', y: this.props.pollData.yes_data.country_data.country_null})
    console.log('getNoCountryData()', country_values)
    return country_values
  }

  getYesProfessionData(){
    let {profession_list} = this.props.pollData.yes_data.profession_data
    let profession_values =[];
    console.log('profession_list!!!',profession_list)
    Object.keys(profession_list).map((key)=>{
      return profession_values.push({x: profession_data[key], y: profession_list[key]})
   })
   profession_values.push({x: 'Unknown', y: this.props.pollData.yes_data.profession_data.profession_null})
   console.log('getYESSSprofessionData()', profession_values)
   return profession_values
  }

  getNoProfessionData(){
    let {profession_list} = this.props.pollData.no_data.profession_data
    let profession_values =[];
    console.log('profession_list!!!',profession_list)
    Object.keys(profession_list).map((key)=>{
      return profession_values.push({x: profession_data[key], y: profession_list[key]})
   })
   profession_values.push({x: 'Unknown', y: this.props.pollData.no_data.profession_data.profession_null})
   console.log('getYESSSprofessionData()', profession_values)
   return profession_values
  }


  
  getYesEthnicityData(){
    let {ethnicity_list} = this.props.pollData.yes_data.ethnicity_data
    let ethnicicity_values =[];
    console.log('profession_list!!!',ethnicity_list)
    Object.keys(ethnicity_list).map((key)=>{
      return ethnicicity_values.push({x: ethnicity_data[key], y: ethnicity_list[key]})
   })
   ethnicicity_values.push({x: 'Unknown', y: this.props.pollData.yes_data.profession_data.profession_null})
   console.log('getYESSSprofessionData()', ethnicicity_values)
   return ethnicicity_values
  }

  getNoEthnicityData(){
    let {ethnicity_list} = this.props.pollData.no_data.ethnicity_data
    let ethnicicity_values =[];
    console.log('profession_list!!!',ethnicity_list)
    Object.keys(ethnicity_list).map((key)=>{
      return ethnicicity_values.push({x: ethnicity_data[key], y: ethnicity_list[key]})
   })
   ethnicicity_values.push({x: 'Unknown', y: this.props.pollData.yes_data.profession_data.profession_null})
   console.log('getYESSSprofessionData()', ethnicicity_values)
   return ethnicicity_values
  }

  getYesAgeData(){
    let {age_list} = this.props.pollData.yes_data.age_data
    let age_values = [];
    Object.keys(age_list).map((key, i)=>{
       return age_values.push({x: key, y: age_list[key]})
    })
    age_values.push({x: 'Unknown', y: this.props.pollData.yes_data.age_data.age_null})
    console.log('getNoageData()', age_values)
    return age_values
  }

  getNoAgeData(){
    let {age_list} = this.props.pollData.no_data.age_data
    let age_values = [];
    Object.keys(age_list).map((key, i)=>{
       return age_values.push({x: key, y: age_list[key]})
    })
    age_values.push({x: 'Unknown', y: this.props.pollData.yes_data.age_data.age_null})
    console.log('getNoageData()', age_values)
    return age_values
  }

  generatePieData(data_object,  demographic_list){
    let data_values = [];
    if (demographic_list) {
      Object.keys(data_object).map((key, i)=>{
        if (demographic_list[parseInt(key)]){
          return data_values.push({x: demographic_list[parseInt(key)], y: data_object[key]})
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
          {/* <PieResults title={'Age'} 
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesAgeData} 
          noData={this.state.noAgeData} 
          colorScale={'heatmap'}
          categories={[...Object.keys(this.props.pollData.no_data.age_data.age_list), ...Object.keys(this.props.pollData.yes_data.age_data.age_list), "Unknown"]}
          /> */}
          {/* <PieResults title={'Religion'} 
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesReligionData} 
          noData={this.state.noReligionData} 
          colorScale={'heatmap'}
          categories={["Religious", "Not Religious", "Unkown"]}
          /> */}
          {/* <PieResults title={'Gender'} 
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesGenderData} 
          noData={this.state.noGenderData} 
          colorScale={"heatmap"}
          categories={["Female", "Male", "Unkown"]}
          /> */}
          {/* <PieResults title={'Countries Represented'}
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesCountryData} 
          noData={this.state.noCountryData} 
          colorScale={'heatmap'}
          categories={[...Object.keys(this.props.pollData.no_data.country_data.country_list), ...Object.keys(this.props.pollData.yes_data.country_data.country_list), "Unknown"]}
          /> */}
          <PieResults title={'Professions'}
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesProfessionData} 
          noData={this.state.noProfessionData} 
          colorScale={Object.values(this.state.professionCategories)}
          categories={Object.keys(this.state.professionCategories)}
          colorCatoregories= {this.state.professionCategories}
          />
          {/* <PieResults title={'Ethnicity'}
          totalsData={this.props.pollData.totals_data} 
          yesData={this.state.yesEthnicityData} 
          noData={this.state.noEthnicityData} 
          colorScale={'heatmap'}
          categories={["suh"]}
          /> */}


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