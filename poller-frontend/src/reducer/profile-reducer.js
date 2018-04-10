export default (state= {}, {type, payload}) => {
    switch(type){
        case "AUTHPROFILE":
            return payload
        default:
            return state
    }
}