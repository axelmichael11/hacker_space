export default (state= false, {type, payload}) => {
    switch(type){
        case 'max_data_reached':
            return payload;
        case 'max_data_not_reached':
            return payload;
        default:
            return state
    }
}



