import axios from 'axios'

export const BASE_URL = 'https://64ac56039edb4181202f712a.mockapi.io/';
export const BASE_LOGIN = 'https://dummyjson.com/';
export const BASE_URL_DEPOSIT = 'https://64b6cddfdf0839c97e1625e9.mockapi.io/deposits/';

export const BASE_ADMIN_URL = 'https://banquito-ws-gestion-admin-ntsumodxxq-uc.a.run.app/api/v1/';

export const ENDPOINTS = {
    accounts: 'accounts',
    login: 'auth/login',
    bankEntity: 'bankEntity',
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + endpoint + '/';
    let adminurl = BASE_ADMIN_URL + endpoint + '/';
    return {
        fetch: (token) => axios.get(url, token),
        post: (newRecord, token) => axios.post(url, newRecord, token),
        put: (id, updatedRecord, token) => axios.put(url + id, updatedRecord, token),
        delete: id => axios.delete(url + id),
        fetchById: (id, token) => axios.get(url + id, token),
        fetchBranches: (id,token) => axios.get(adminurl + 'branch-list/' + id, token),
    }
}

// MOCK LOGIN ENDPOINT
export const createloginEndpoint = endpoint => {
    let url = BASE_LOGIN + endpoint
    return {
        fetch: (token) => axios.get(url, token),
        post: (newRecord, token) => axios.post(url, newRecord, token),
        put: (id, updatedRecord, token) => axios.put(url + id, updatedRecord, token),
        delete: id => axios.delete(url + id),
        fetchById: (id, token) => axios.get(url + id, token),
    }
}
