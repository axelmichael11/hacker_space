
const country_list = require('./countries.js')
const profession_list = require('./professions.js')
const ethnicity_list = require('./ethnicities.js')
const validator = require('../../lib/validation-methods')


module.exports = {
    userProfileValidate : function(incomingProfile){
        console.log('incomoing profile data', incomingProfile)
        let {gender, age, ethnicity, profession, country, religion} = incomingProfile;
        let profile = Object.assign({},{ethnicity,gender, age, profession, country, religion});
        for(var i in profile){
            if (profile[i] === undefined){
                profile[i] = null;
            }
        }
         //checking values....
    //   if (!country_list[profile.country]){
    //     throw new Error('Incoming country data is not listed..')
    // }

    // if (!profession_list[profile.profession]){
    //     throw new Error('Incoming profession data is not listed..')
    // }

    // if (!ethnicity_list[profile.ethnicity]){
    //     throw new Error('Incoming ethnicity data is not listed..')
    // }


    //checking datatypes...
    if (validator.notStringOrNull(profile.country)){
      throw new Error('invalid country data type');
    }

    if (validator.notNumberOrNull(profile.profession)){
        throw new Error('invalid profession data type');
      }
    
    if (validator.notNumberOrNull(profile.ethnicity)){
        throw new Error('invalid ethnicity data type');
    }

        return profile
    },
    formatSendProfile : function(rows,authProfile){
      console.log('ROWS', rows)
      let {gender, age, ethnicity, profession, country, religion} = rows;
     
     

      let {nickname, picture, email} = authProfile;
      let returnedProfile = Object.assign({},{gender, age, profession, country, ethnicity, religion, nickname, email, picture});
      return returnedProfile
    }
    
}