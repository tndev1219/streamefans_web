export function clearToken() {
    localStorage.removeItem('streamefans_token');
}

export function getToken() {
    try {
        const token = localStorage.getItem('streamefans_token');
        return token;
    } catch (err) {
        clearToken();
        return null;
    }
}