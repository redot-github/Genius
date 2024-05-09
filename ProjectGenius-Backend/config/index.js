const PORT = 3002;
const API_URL = `http://localhost:${PORT}`;
let key = {
    'API_URL': API_URL,
    'PORT': PORT,
    'SECRET_KEY': 'PROJECT_GENIUS',
    'IMAGE': {
        'USER_FILE_PATH': 'public/studentprofile/',
        'USER_FILE_URL_PATH': `${API_URL}/studentprofile`,
        'TEACHER_FILE_PATH': 'public/teacherprofile/',
        'TEACHER_FILE_URL_PATH': `${API_URL}/teacherprofile`,
        'DRIVER_FILE_PATH': 'public/driverprofile/',
        'DRIVER_FILE_URL_PATH': `${API_URL}/driverprofile`,
        'VehiclePhoto_FILE_PATH': 'public/VehiclePhoto/',
        'VehiclePhoto_FILE_URL_PATH': `${API_URL}/VehiclePhoto`,
    }
}
module.exports = key
