
const _ = require('lodash')



export default (state= {}, {type, payload}) => {
    switch(type){
        case "public_polls_fetch":
            console.log('hitting public polls fetch')
            return payload;
        case 'public_poll_filter':
            return payload;
        case 'public_polls_max_data':
            console.log('hitting max polls fetch')
            return payload;
        default:
            return state
    }
}
