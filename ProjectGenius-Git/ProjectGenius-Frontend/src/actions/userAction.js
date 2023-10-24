import axios from '../config/axios'

export const login = async (data) => {

    try {
        let respData = await axios({
            'url': '/login',
            'method': 'post',
            data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'token': respData.data.token
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const verify = async (data) => {

    try {
        let respData = await axios({
            'url': '/verification',
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
export const Reverify = async () => {

    try {
        let respData = await axios({
            'url': '/re-verification',
            'method': 'get',

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
export const registerStudent = async (formData) => {

    try {
        let respData = await axios({
            'url': '/admission',
            'method': 'post',
            'data': formData
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
export const viewStudent = async () => {

    try {
        let respData = await axios({
            'url': '/viewstudent',
            'method': 'get',
        })
        return {
            'status': respData.data.status,
            'result': respData.data.result,
            'imageUrl': respData.data.imageUrl,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
        }
    }
}

export const deleteStudent = async (id) => {

    try {
        let respData = await axios({
            'url': '/deletestudent/' + id,
            'method': 'get'
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
        }
    }

}

export const getSinglestudent = async (id) => {
    try {
        let respData = await axios({

            'url': '/getsingle-student/' + id,
            'method': 'get',

        })

        return {
            'status': respData.data.status,
            'result': respData.data.result
        }

    } catch (err) {
        console.log(err, 'errrr')
    }
}
export const updateStudent = async (formData) => {
    try {
        let respData = await axios({

            'url': '/updatestudent',
            'method': 'post',
           'data': formData

        })

        return {
            'status': respData.data.status,
            'message': respData.data.message,

        }

    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors' : err.response.data.errors
        }
    }
}
export const feeSetup = async (data) => {

    try {
        let respData = await axios({
            'url': '/feessetup',
            'method': 'post',
            'data':data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result
        }
    } catch (err) {
           console.log(err,'--err')
    }

}

export const viewFees = async () => {

    try {
        let respData = await axios({
            'url': '/viewfees',
            'method': 'get',
        })
        return {
            'status': respData.data.status,
            'result': respData.data.result,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
        }
    }
}

export const feeCollection = async (data) => {

    try {
        let respData = await axios({
            'url': '/feescollection',
            'method': 'post',
            'data':data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
           console.log(err,'--err')
    }

}