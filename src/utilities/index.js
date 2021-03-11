export const clearProfile = () => {
    localStorage.removeItem('streamefans_profile');
};

export const getProfile = () => {
    try {
        const profile = localStorage.getItem('streamefans_profile');
        return JSON.parse(profile);
    } catch (err) {
        clearProfile();
        return null;
    }
};

export const setProfile = (profile) => {
    try {
        localStorage.setItem('streamefans_profile', JSON.stringify(profile));
        return null;
    } catch (err) {
        clearProfile();
        return null;
    }
};