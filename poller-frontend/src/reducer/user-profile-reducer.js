export default (state= null, {type, payload}) => {
    switch(type){
        case "user_profile":
            return payload
        default:
            return state
    }
}