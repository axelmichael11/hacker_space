const Date = require('datejs');

const vote = {};


function notNumberOrNull (value) {
    if (typeof value === 'number'){
            return false
        }
    if (value === null){
        return false
    }
    return true;
    };

function notStringOrNull (value) {
    if (typeof value === 'string'){
            return false
        }
    if (value === null){
        return false
    }
    return true;
    };

function notBooleanOrNull (value) {
    if (typeof value === 'boolean'){
            return false
        }
    if (value === null){
        return false
    }
    return true;
    };

vote.validateGetVoteData = function(incomingGetVoteData){
    console.log('this is the incoming data', incomingGetVoteData)
    let {created_at, author_username} = incomingGetVoteData;
    let voteData = Object.assign({},{created_at, author_username});

    if (!voteData.created_at  || typeof voteData.created_at !== 'string'){
        throw new Error('invalid created_at type or length, or nonexistant property');
    }

    if (!voteData.author_username  || typeof voteData.author_username !== 'string'){
        throw new Error('invalid author_username type or length, or nonexistant property');
    }
    
    console.log('he0re is the votedata function,', voteData)
    return voteData
}

vote.validateCastVoteData = function(incomingPostVoteData){
    let {created_at,
        age, 
        country, 
        ethnicity, 
        gender,  
        profession,
        religion,
        vote, 
        author_username, } = incomingPostVoteData;


    let voteData = Object.assign({},{created_at,age, country, ethnicity, gender, profession, religion, vote, author_username});

    if (!voteData.created_at  || typeof voteData.created_at !== 'string'){
        throw new Error('invalid created_at type or length, or nonexistant property');
    }

    if (!voteData.author_username  || typeof voteData.author_username !== 'string'){
        throw new Error('invalid author_username type or length, or nonexistant property');
    }

    if (notNumberOrNull(voteData.age)){
        console.log(voteData.age)
        throw new Error('invalid age data type');
    }
    if (notNumberOrNull(voteData.country)){
        throw new Error('invalid country data type');
    }
    if (notNumberOrNull(voteData.ethnicity)){
        throw new Error('invalid ethnicity data type');
    }
    if (notNumberOrNull(voteData.profession)){
        throw new Error('invalid profession data type');
    }
    if (notBooleanOrNull(voteData.religion)){
        console.log('religion',voteData.religion)
        throw new Error('invalid religion data type', voteData.religion);
    }
    if (!voteData.vote || typeof voteData.vote !== 'string'){
        throw new Error('invalid vote data type or nonexistant property');
    }
    console.log('he0re is the votedata function,', voteData)
    return voteData
}





vote.formatYesOrNoData = function(voteArrays){
    let total = 0;
    let age = [];
    let country = [];
    let ethnicity = [];
    let profession = [];
    let male = 0;
    let female = 0;
    let yes_religion = 0;
    let no_religion = 0;

    let age_null = 0;
    let country_null = 0;
    let ethnicity_null = 0;
    let profession_null = 0;
    let gender_null = 0;
    let religion_null = 0;
    for (var i = 0; i<voteArrays.length; i++){

        total += 1;

        if (voteArrays[i][0]===null){
            age_null+=1;
        }else {
            age.push(parseInt(voteArrays[i][0]))
        }

        if (voteArrays[i][1]===null){
            country_null+=1;
        }else {
            country.push(voteArrays[i][1])
        }

        if (voteArrays[i][2]===null){
            ethnicity_null+=1;
        }else {
            ethnicity.push(voteArrays[i][2])
        }

        if (voteArrays[i][3]===null){
            profession_null+=1;
        }else {
            profession.push(voteArrays[i][3])
        }

        if (voteArrays[i][4]===null){
            gender_null+=1;
        }else {
            (voteArrays[i][4]==='M')
                male+=1;
            female+=1;
        }
        if (voteArrays[i][5]===null){
            religion_null+=1;
        }else {
            (voteArrays[i][5]==='true')
                yes_religion+=1;
            no_religion+=1;
        }
    }

    let data = {};
    //total votes data
    data.totalVotes = total;
    let isZero = (data.totalVotes ===0)

    //religion data
    data.religion_data ={};
    data.religion_data.yes_religion_total =  isZero ? 0 : (yes_religion/total)*100
    data.religion_data.no_religion_total=  isZero ? 0 :  (no_religion/total)*100
    data.religion_data.null_religion_total =  isZero ? 0 :  (religion_null/total)*100

    //gender data
    data.gender_data= {}
    data.gender_data.female_total =  isZero ? 0 :  (female/total)*100
    data.gender_data.male_total =  isZero ? 0 :  (male/total)*100
    data.gender_data.gender_null_total =  isZero ? 0 : (gender_null/total)*100


    console.log('this is the yes or no vote data...', data)
    return data;
}


vote.formatSendData = function(yes_data_array, no_data_array, voteCount){
    let isZero = (voteCount ===0);
    let data = {};
    data.totals_data = {}
    data.yes_data = vote.formatYesOrNoData(yes_data_array);
    data.no_data = vote.formatYesOrNoData(no_data_array);
    //total vote data

    console.log('yes_data.totalVotes', data.yes_data.totalVotes, voteCount, (data.yes_data.totalVotes/voteCount) )
    data.totals_data.yesVotes = isZero ? 0 : (data.yes_data.totalVotes/voteCount)*100;
    data.totals_data.noVotes = isZero ? 0 : (data.no_data.totalVotes/voteCount)*100;
    data.totals_data.totalVotes = voteCount;
    console.log('this is the DATA TO SEND', data)
    return data
}

module.exports = vote;