export const AccountProductService = {
    // Reemplazar por API
    getAccountProducts() {
        return fetch('https://api.npoint.io/60ae4f5ba857aaa7eb21').then(res => res.json()).then(data => data.data);
    },
}
