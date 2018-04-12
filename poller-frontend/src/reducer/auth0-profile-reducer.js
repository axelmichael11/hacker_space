export default (state= {}, {type, payload}) => {
    switch(type){
        case "AUTH0PROFILE":
            return payload
        default:
            return state
    }
}