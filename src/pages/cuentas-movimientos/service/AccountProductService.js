export const AccountProductService = {
    async getAccountProducts(headers) {
        try {
            const res = await fetch('http://localhost:8080/api/v1/account/user/01fb03af-3fd1-4411-9f09-a410f178afb7', { headers });
            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
