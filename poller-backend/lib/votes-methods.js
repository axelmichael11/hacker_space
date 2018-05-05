const Date = require('datejs');

const vote = {};

vote.validateGetVoteData = function(incomingGetVoteData){
    let {created_at, author_username} = incomingGetVoteData;
    let voteData = Object.assign({},{created_at, author_username});

    if (!voteData.created_at  || typeof voteData.created_at !== 'string'){
        throw new Error('invalid created_at type or length, or nonexistant property');
    }

    if (!voteData.author_username  || typeof voteData.author_username !== 'string'){
        throw new Error('invalid author_username type or length, or nonexistant property');
    }
    // console.log('here is the date function,', Date.parse(voteData.created_at))
    return voteData
}


module.exports = vote;