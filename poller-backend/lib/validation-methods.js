const env = {
      uid: process.env.uid
  };


module.exports = {
    checkForToken : function(token){
        if(!token) {
            throw new Error('no token found')
        }
    return token
    },
    validateUid : (user) => {
        console.log(user[`${env.uid}`])
        return new Promise((resolve, reject)=>{
            console.log(user[`${env.uid}`])
            if (!user[`${env.uid}`]){
                var error = new Error('no user id found in auth0');
                reject(error)
            } else {
                resolve(user)
            }
        })
    }
}