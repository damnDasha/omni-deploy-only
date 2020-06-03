import config from "../config";
import TokenService from "../Services/TokenService";

const AuthApiService = {
  postUser(user) {
    return fetch(`${config.API_ENDPOINT}/api/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  postLogin({ username, password }) {
    return fetch(`${config.API_ENDPOINT}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) =>
      !res.ok ? res.json().then((err) => Promise.reject(err)) : res.json()
    );
  },
  refreshToken() {
    return fetch(`${config.API_ENDPOINT}/api/auth`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${TokenService.getAuthToken()}`,
      },
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  },
  //   getUser() {
  //     return fetch(`${config.API_ENDPOINT}/api/user/${id}`, {
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${TokenService.getAuthToken()}`,
  //       },
  //     }).then((res) =>
  //       !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  //     );
  //   },
  //   getDepartment() {
  //     return fetch(`${config.API_ENDPOINT}/api/department/${id}`, {
  //       method: "GET",
  //       headers: {
  //         authorization: `Bearer ${TokenService.getAuthToken()}`,
  //       },
  //     }).then((res) =>
  //       !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
  //     );
  //   },
};

//fetch()

// /api/user/1

export default AuthApiService;
