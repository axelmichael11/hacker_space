export default (state= {}, {type, payload}) => {
    switch(type){
        case "user_id":
            return payload
        default:
            return state
    }
}