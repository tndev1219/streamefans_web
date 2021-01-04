export const clearToken = () => {
    localStorage.removeItem('streamefans_token');
}

export const getToken = () => {
    try {
        const token = localStorage.getItem('streamefans_token');
        return token;
    } catch (err) {
        clearToken();
        return null;
    }
}