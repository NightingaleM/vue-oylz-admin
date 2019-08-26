import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: "/oy/api/",
  timeout: 5000 // 请求超时时间
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    if (error.response.status === 403 && location.pathname !== '/login') {
      location.pathname = '/login'
    }
    return Promise.reject(error);
  }
);

const API = {
  checkStatus() {
    return _axios({
      method: 'post',
      url: '/check'
    })
  },
  logout() {
    return _axios({
      method: 'post',
      url: '/logout'
    })
  },
  login({ email, password }) {
    return _axios({
      method: 'post',
      url: '/login',
      data: {
        email, password
      }
    })
  },
  getArticleLists({
    tag, page, count
  }) {
    return _axios({
      method: 'get',
      url: '/article',
      params: {
        isSelf: true,
        tag, page, count
      }
    })
  },
  createArticle({
    tag, title, content
  }) {
    return _axios({
      method: 'post',
      url: '/article',
      data: {
        tag, title, content
      }
    })
  },
  updateArticle({
    id, tag_id, title, content, tag
  }) {
    return _axios({
      method: "put",
      url: `/article/${id}`,
      data: {
        tag_id, title, content, tag
      }
    })
  },
  deleteArticle({
    id,
  }) {
    return _axios({
      method: "delete",
      url: `/article/${id}`
    })
  },
  getAllTags() {
    return _axios({
      method: 'get',
      url: '/tags'
    })
  },
  createTag({ tag }) {
    return _axios({
      method: 'post',
      url: '/tags',
      data: {
        tag
      }
    })
  }
}

export default API 