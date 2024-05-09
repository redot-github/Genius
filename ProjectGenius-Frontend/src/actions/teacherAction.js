import axios from '../config/axios'

export const teachersignup = async (data) => {

    try {
        let respData = await axios({
            'url': '/teacher-register',
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
export const teacherlogin = async (data) => {

    try {
        let respData = await axios({
            'url': '/teacher-login',
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
export const changepassword = async (data) => {

    try {
        let respData = await axios({
            'url': '/changepassword',
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
export const forgetpassword = async (data) => {

    try {
        let respData = await axios({
            'url': '/forgetpassword',
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
export const resetpassword = async (data) => {

    try {
        let respData = await axios({
            'url': '/resetpassword',
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
export const findsection = async (Data) => {

    try {
        let respData = await axios({
            'url': '/findsection',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
            'result2':respData.data.result2
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const Dailyattendance = async (Data) => {

    try {
        let respData = await axios({
            'url': '/daily-attendance',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
    }
}
}



export const updateDailyattendance = async (Data) => {

    try {
        const respData = await axios.put(`/update-attendance/${Data.id}/${Data.studentId}`, Data);
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result': respData.data.result,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
    }
}
}


export const findsectionformarks = async (Data) => {

    try {
        let respData = await axios({
            'url': '/findsectionformarks',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
            'result2':respData.data.result2,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const savemarksheet = async (Data) => {

    try {
        let respData = await axios({
            'url': '/marksheet',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
    }
}
}
export const findmarksheet = async (Data) => {

    try {
        let respData = await axios({
            'url': '/find-marksheet',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
    }
}
}
export const findmarksheetForAnalysis = async (Data) => {

    try {
        let respData = await axios({
            'url': '/marksheetforanalysis',
            'method': 'get',
            params:Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
        }
    } catch (err) {
       console.log(err)
}
}
export const updatemarksheet = async (Data) => {

    try {
        let respData = await axios({
            'url': '/marksheet-update',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
    }
}
}

export const displayAttendanceData = async () => {

    try {
        let respData = await axios({
            'url': '/displayAttendance',
            'method': 'get',
            // params:Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
        }
    } catch (err) {
       console.log(err)
}
}