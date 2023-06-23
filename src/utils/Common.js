// Admin
export const getAdminSessionToken = (token) => {
    return localStorage.getItem("adminToken") || null;
};
export const setAdminSessionToken = (token) => {
    localStorage.setItem("adminToken", token);
};
export const setAdminProfile = (profile) => {
    localStorage.setItem("adminProfile", JSON.stringify(profile));
};
export const getAdminProfile = (profile) => {
    return JSON.parse(localStorage.getItem("adminProfile"));
};
export const removeAdminProfile = () => {
    localStorage.removeItem("adminProfile");
};
export const removeAdminSessionToken = (token) => {
    localStorage.removeItem("adminToken");
};
export const isAdminLoggedIn = () => {
    if (localStorage.getItem("adminToken")) return true;
    else return false;
};

// Seller or Vendor
export const getSellerSessionToken = () => {
    return localStorage.getItem("sellerToken") || null;
};
export const getServiceSessionToken = () => {
    return localStorage.getItem("serviceToken") || null;
};
export const getSellerRole = (profile) => {
    return localStorage.getItem("sellerRole") || null;
};
export const setSellerSessionToken = (token) => {
    localStorage.setItem("sellerToken", token);
};
export const setServiceSessionToken = (token) => {
    localStorage.setItem("serviceToken", token);
};
export const setSellerRole = (token) => {
    localStorage.setItem("sellerRole", token);
};
export const setSellerProfile = (profile) => {
    localStorage.setItem("sellerProfile", JSON.stringify(profile));
};
export const getSellerProfile = (profile) => {
    return JSON.parse(localStorage.getItem("sellerProfile"));
};
export const removeSellerProfile = () => {
    localStorage.removeItem("sellerProfile");
};
export const removeSellerSessionToken = () => {
    localStorage.removeItem("sellerToken");
};
export const removeServiceSessionToken = () => {
    localStorage.removeItem("serviceToken");
};
export const removeSellerRole = () => {
    localStorage.removeItem("sellerRole");
};
export const isSellerLoggedIn = () => {
    if (localStorage.getItem("sellerToken")) return true;
    else return false;
};
export const isServiceLoggedIn = () => {
    if (localStorage.getItem("serviceToken")) return true;
    else return false;
};

// Customer or User
export const getUserSessionToken = () => {
    return localStorage.getItem("userToken") || null;
};
export const setUserSessionToken = (token) => {
    localStorage.setItem("userToken", token);
};
export const setUserProfile = (profile) => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
};
export const getUserProfile = (profile) => {
    return JSON.parse(localStorage.getItem("userProfile"));
};
export const removeUserProfile = () => {
    localStorage.removeItem("userProfile");
};
export const removeUserSessionToken = () => {
    localStorage.removeItem("userToken");
};
export const isUserLoggedIn = () => {
    if (localStorage.getItem("userToken")) return true;
    else return false;
};

// More for User : maybe used later
export const getName = () => {
    return localStorage.getItem("username") || null;
};
export const getEmail = () => {
    return localStorage.getItem("useremail") || null;
};
export const getPhoto = () => {
    return localStorage.getItem("userphoto") || null;
};

export const setUserData = (name, email, photo) => {
    localStorage.setItem("username", name);
    localStorage.setItem("useremail", email);
    localStorage.setItem("userphoto", photo);
};