import axios from 'axios'

export const BASE_URL = 'https://64ac56039edb4181202f712a.mockapi.io/';
export const BASE_LOGIN = 'https://dummyjson.com/';
export const BASE_URL_DEPOSIT = 'https://64b6cddfdf0839c97e1625e9.mockapi.io/deposits/';

export const BASE_ADMIN_URL = 'https://banquito-ws-gestion-admin-ntsumodxxq-uc.a.run.app/api/v1/';
export const CLIENTS_URL = 'https://banquito-ws-clientes-ntsumodxxq-uc.a.run.app/api/v1/';
export const REQUIREMENTS_URL = 'https://banquito-ws-prestamos-ntsumodxxq-uc.a.run.app/api/v1/';
export const ACCOUNTS_URL = 'https://banquito-ws-cuentas-ntsumodxxq-uc.a.run.app/api/v1/';


export const ENDPOINTS = {
    accounts: 'accounts',
    login: 'auth/login',
    bankEntity: 'bankEntity',
    customers: 'customers',
    groupCompany: 'group-company',
    accountTransaction: 'account-transaction',
    asset: 'assets',
    guarantor: 'guarantor',
    account: 'account',

}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + endpoint + '/';
    let adminurl = BASE_ADMIN_URL + endpoint + '/';
    let clientUrl = CLIENTS_URL + endpoint + '/';
    let assetPostUrl = REQUIREMENTS_URL + endpoint;
    let guarantorPostUrl = REQUIREMENTS_URL + endpoint;
    let accountInfoUrl = ACCOUNTS_URL + endpoint + '/';
    let accountTransactionUrl = ACCOUNTS_URL + endpoint + '/';

    return {
        fetch: (token) => axios.get(url, token),
        post: (newRecord, token) => axios.post(url, newRecord, token),

        postAsset: (newRecord, token) => axios.post(assetPostUrl, newRecord, token),
        postGuarantor: (newRecord, token) => axios.post(guarantorPostUrl, newRecord, token),

        put: (id, updatedRecord, token) => axios.put(url + id, updatedRecord, token),
        delete: id => axios.delete(url + id),
        fetchById: (id, token) => axios.get(url + id, token),
        fetchByCodeInternalAccount: (id, token) => axios.get(accountInfoUrl + 'information/' + id, token),
        fetchTransactionHistory: (id, token) => axios.get(accountTransactionUrl + 'history/' + id, token),
        fetchBranches: (id, token) => axios.get(adminurl + 'branch-list/' + id, token),
        fetchByTypeDocumentAndDocumentId: (typeDocument, documentId, token) => axios.get(clientUrl + 'typeanddocument?typeDocument=' + typeDocument + '&document=' + documentId, token),
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
