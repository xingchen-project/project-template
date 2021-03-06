/**
 * axios拦截配置
 **/
import Axios from "axios";
import store from "__store__";
import router from "__router__";

/**
 * 放行路径
 * @type {string[]}
 */
const urls = [
    "/api/user/login"
];

/**
 * 请求拦截配置
 */
Axios.interceptors.request.use(
    function (config) {
        let ret = urls.some(value => value === config.url);
        if (!ret) {
            let token = store.getters.getToken;
            if (token === undefined || token === null) {
                token = null;
                router.replace("/api/user/login");
            }
            config.headers.token = token;
        }
        return config;
    }
);

/**
 * 放行拦截配置
 */
Axios.interceptors.response.use(
    //  成功响应
    function (config) {
        return config.data;
    },
    //  响应异常
    function (error) {
        console.log(error);
        alert(error);
        return error
    });

export default Axios;