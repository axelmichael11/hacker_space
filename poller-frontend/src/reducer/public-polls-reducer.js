
const _ = require('lodash')



export default (state= {}, {type, payload}) => {
    switch(type){
        case "public_polls_fetch":
            return payload;      
            
        case 'add_created_poll':
            return payload;

        case 'public_poll_filter':
            return payload;
        default:
            return state
    }
}
