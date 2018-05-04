export default (state= [], {type, payload}) => {
    switch(type){
        case "public_polls_fetch":
            return [...state, payload]
        default:
            return state
    }
}