const bcrypt = require('bcrypt');

const profile = {};

profile.userProfileValidate = function(incomingProfile){
    let {userName, gender, age, profession, state, religous} = incomingProfile;

    let profile = Object.assign({},{userName, gender, age, profession, state, religous});
    return profile
}


profile.idHashCreate = function(id){
    return bcrypt.hash(id, 8)
    .then(hash => {
      this.idHash = hash;
      return this;
    });
}

profile.createUser = function(data){
    let id = data.sub;
    delete data.sub;
    return userProfileValidate(data).idHashCreate(id)
}

module.exports = profile;

