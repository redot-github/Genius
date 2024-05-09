import axios from "axios"

export const studentSignup = async (data) => {

    try {
        let respData = await axios({
            'url': '/student-signup',
            'method': 'post',
            data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const studentLogin = async (data) => {

    try {
        let respData = await axios({
            'url': '/student-login',
            'method': 'post',
            data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'token': respData.data.token,
            'result': respData.data.result
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}

export const STDchangepassword = async (data) => {

    try {
        let respData = await axios({
            'url': '/STDchangepassword',
            'method': 'post',
             data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}


export const STDforgetpassword = async (data) => {

    try {
        let respData = await axios({
            'url': '/STDforgetpassword',
            'method': 'post',
             'data' : data,
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const STDresetpassword = async (data) => {

    try {
        let respData = await axios({
            'url': '/STDresetpassword',
            'method': 'post',
             data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}