export const renderIf = (test, component) => (test ? component : undefined)

export const classToggler = options =>
  Object.keys(options).filter(key => !!options[key]).join(' ')

export const log = (...args) => (__DEBUG__ ? console.log(...args) : null)

export const logError = (...args) =>
  __DEBUG__ ? console.error(...args) : null


  export const ageValidation = function(value) {
    if (typeof value !== 'number' || 0 > value || 110 < value){
        return true
        } else {
          return false;
        }
    };

    export const handleThen = function(res, ...args){
      let responses = [...args];
      Object.keys(responses).map((i)=>{
        if (res.status===responses[i].status){
          responses[i].action( responses[i].content)
        }
      })
    }