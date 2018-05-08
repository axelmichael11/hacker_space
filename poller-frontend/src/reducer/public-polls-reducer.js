
const _ = require('lodash')

export default (state= [], {type, payload}) => {
    switch(type){
        case "public_polls_fetch":
            return _.union(state, payload)
        default:
            return state
    }
}