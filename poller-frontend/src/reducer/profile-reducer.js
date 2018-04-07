export default (state= {}, {type, payload}) => {
    switch(type){
        case "profile":
            return payload
        default:
            return state
    }
}