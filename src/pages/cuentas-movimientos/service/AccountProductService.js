export const AccountProductService = {
    async getAccountProducts(headers) {
        try {
            const res = await fetch('https://api.npoint.io/60ae4f5ba857aaa7eb21', { headers });
            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
