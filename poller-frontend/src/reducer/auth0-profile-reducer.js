export default (state= {}, {type, payload}) => {
    switch(type){
        case "AUTH0TOKEN":
            return payload
        default:
            return state
    }
}