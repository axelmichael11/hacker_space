const Date = require('datejs');

const vote = {};

const validator = require('../../lib/validation-methods')

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

    if (validator.notNumberOrNull(voteData.age)){
        console.log(voteData.age)
        throw new Error('invalid age data type');
    }
    if (validator.notStringOrNull(voteData.country)){
        throw new Error('invalid country data type');
    }
    if (validator.notNumberOrNull(voteData.ethnicity)){
        throw new Error('invalid ethnicity data type');
    }
    if (validator.notNumberOrNull(voteData.profession)){
        throw new Error('invalid profession data type');
    }
    if (validator.notBooleanOrNull(voteData.religion)){
        console.log('religion',voteData.religion)
        throw new Error('invalid religion data type', voteData.religion);
    }
    if (!voteData.vote || typeof voteData.vote !== 'string'){
        throw new Error('invalid vote data type or nonexistant property');
    }

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
            if(voteArrays[i][4]==='M'){
                male+=1;
            } else {
                female+=1;
            }
        }
        if (voteArrays[i][5]===null){
            religion_null+=1;
        }else {
            if (voteArrays[i][5]==='true'){
                yes_religion+=1;
            } else {
                no_religion+=1;
            }
        }
    }
    console.log('DATAAA ARRAYYYS', country, profession, ethnicity)
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

 

    //profession data (array)
    data.profession_data = {}
    data.profession_data = vote.countExistingCategories(profession);
    (profession_null===0) ? null : data.profession_data.profession_null = profession_null;
    //age data (array)

    //country data (array)
    data.country_data = {}
    data.country_data = vote.countExistingCategories(country);
    data.country_data.country_null = country_null;
    console.log('COUTNRY DATA', data.country_data, country, country_null);


    //ethnicity data (array)
    data.ethnicity_data = {}
    data.ethnicity_data = vote.countExistingCategories(ethnicity)
    data.ethnicity_data.ethnicity_null = ethnicity_null
    
    //age data (array)
    data.age_data = {}
    data.age_data = vote.countAgeCategories(age);
    (age_null===0) ? null: data.age_data.age_null = age_null;

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




vote.countExistingCategories = function(array){
    let categories= {};
    array.map((data, i)=>{
        console.log(data)
        if (!categories[data]){
            categories[data]=1;
        } else {
            categories[data]+=1;
        }
    })

    console.log(categories)
    return categories
}

//I want to refactor this method...
vote.countAgeCategories = function(array){
    let categories= {};
    array.map((data, i)=>{
        console.log('this is the coute age function!', data, i, array)
        if (0<data<=17){
            return categories['0-17']=+1;
        }
        if (17<data<= 26 ) {
            return categories['18-26']=+1;
        }
        if (26<data<= 32 ) {
            return categories['27-32']=+1;
        }
        if (32<data<= 40 ) {
            return categories['33-40']=+1;
        }
        if (40<data<= 50 ) {
            return categories['41-50']=+1;
        }
        if (50<data<= 70 ) {
            return categories['51-70']=+1;
        }
        if (70<data) {
            return categories['71 and Older']=+1;
        }
    })

    console.log(categories)
    return categories
}

module.exports = vote;


