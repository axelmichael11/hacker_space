export default (state= null, {type, payload}) => {
    switch(type){
        case "AUTH0TOKEN":
            return payload
        default:
            return state
    }
}