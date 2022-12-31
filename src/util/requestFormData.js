const { default: axios } = require("axios");

const service = axios.create({
    timeout: 1000000
})


service.interceptors.response.use(
    (response) => {
        const res = response.data
        return res
    },
    (error) => {
        console.log(error)
        if (error.response.status === 401) {
            //alert("tes3");
        }
        return Promise.reject(error)
    }
)

export default service