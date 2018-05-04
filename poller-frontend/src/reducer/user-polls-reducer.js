export default (state= [], {type, payload}) => {
    switch(type){
        case "poll_create":
            return [...state, payload]
        case "polls_fetch":
            return payload
        case "poll_delete":
        console.log('this is the payload', payload)
            return state.filter(poll => poll.created_at !== payload);
        default:
            return state
    }
}