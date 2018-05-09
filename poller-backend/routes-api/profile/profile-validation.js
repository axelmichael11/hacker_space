
module.exports = {
    userProfileValidate : function(incomingProfile){
        let {gender, age, ethnicity, profession, country, religion} = incomingProfile;
        let profile = Object.assign({},{ethnicity,gender, age, profession, country, religion});
        for(var i in profile){
            if (profile[i] === undefined){
                profile[i] = null;
            }
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