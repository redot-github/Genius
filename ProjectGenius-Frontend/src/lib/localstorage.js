const getAuthToken = () => {
    return localStorage.getItem('USER_TOKEN')
}

export const setAuthToken = (token) => {
    return localStorage.setItem('USER_TOKEN', token)
}
export const removeAuthToken = () => {
    return localStorage.removeItem('USER_TOKEN')
}
export const setAuthRec = (result) =>{
    console.log(result,'localstorage.... Teacher....');
    return localStorage.setItem('TEACHER_DATA',JSON.stringify(result))
}
export const setAuthRecSTD = (result) =>{
    console.log(result,'localstorage.... Student......');
    return localStorage.setItem('STUDENT_DATA',JSON.stringify(result))
}
export const removeAuthRec = () => {
    return localStorage.removeItem('TEACHER_DATA')
}

export default getAuthToken;