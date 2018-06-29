export default (state= [], {type, payload}) => {
    switch(type){
        case "user_poll_create":
            return [...state, payload]
        case "user_polls_fetch":
            return payload
        case "user_poll_delete":
            return state.filter(poll => poll.created_at !== payload);
        default:
            return state
    }
}