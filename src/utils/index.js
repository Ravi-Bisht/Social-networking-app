// import { API_URLS } from "./constants";
// export {
//   API_URLS
// }


//it will export all the named  exports
export * from './constants';

export const setItemInLocalStorage = (key,value) => {
    
    if(!key || !value){
        console.error('Can not Store In LS');
    }else{
        const valueToStore = typeof value != "string" ? JSON.stringify(value) : value;

        localStorage.setItem(key,valueToStore)
    };

}

export const getItemFromLocalStorage =(key) => {
    if (!key) {
      console.error('Can not Get the Value from LS');
    }
    return localStorage.getItem(key);
}

export const removeItemFromLocalStorage = (key) => {
    if (!key) {
      console.error('Can not Get the Value from LS');
    }
    localStorage.removeItem(key);
    
}




export const getFormBody = (params) => {
    let formBody = [];

    for(let property in params){
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(params[property]);
        formBody.push(encodedKey+ '=' + encodedValue);

    }
    return formBody.join('&');
}