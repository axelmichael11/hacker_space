export default (state= false, {type, payload}) => {
    switch(type){
        case 'max_data_reached':
            console.log('hitting max polls acheived')
            return payload;
        case 'max_data_not_reached':
        console.log('hitting max polls NOT ACHEIVED ')
            return payload;
        default:
            return state
    }
}



