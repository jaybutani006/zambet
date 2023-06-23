import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import {
  getAdminProfile,
  getAdminSessionToken,
  getSellerProfile,
  getSellerRole,
  getSellerSessionToken,
  getServiceSessionToken,
  getUserProfile,
  getUserSessionToken,
  isAdminLoggedIn,
  isSellerLoggedIn,
  isServiceLoggedIn,
  isUserLoggedIn,
  removeAdminProfile,
  removeAdminSessionToken,
  removeSellerProfile,
  removeServiceSessionToken,
  removeSellerRole,
  removeSellerSessionToken,
  removeUserProfile,
  removeUserSessionToken,
  setAdminProfile,
  setAdminSessionToken,
  setSellerProfile,
  setSellerRole,
  setSellerSessionToken,
  setServiceSessionToken,
  setUserProfile,
  setUserSessionToken,
} from "utils/Common";

const getAllBrands = () => {
  const config4 = {
    method: "get",
    url: process.env.REACT_APP_BASEURL + "/api/brand",
    headers: {
      // "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      Authorization: getSellerSessionToken(),
    },
    // data: formData,
  };
  axios(config4)
    .then((response) => {
      console.log(
        "🌊brand api called"
        // , JSON.stringify(response.data)
      );
      initialState["allBrands"] = response.data.data;
      localStorage.setItem("allBrands", JSON.stringify(response.data.data));

      return response.data.data;

      // navigate("/seller/dashboard", { replace: true });
    })
    .catch((error) => {
      //  defaultAPIErrorHandler(error)
      return [];
    });
};

const getAllCat_SubCat_SubSubCat = () => {
  const config3 = {
    method: "get",
    url: process.env.REACT_APP_BASEURL + "/api/subsubcategory",
    headers: {
      // "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      Authorization: getSellerSessionToken(),
    },
    // data: formData,
  };
  axios(config3)
    .then((response) => {
      console.log(
        "🌊subsubcategory api called"
        // , JSON.stringify(response.data)
      );
      initialState["allCategories"] = response.data.data;
      localStorage.setItem("allCategories", JSON.stringify(response.data.data));

      return response.data.data;

      // navigate("/seller/dashboard", { replace: true });
    })
    .catch((error) => {
      // defaultAPIErrorHandler(error)
      return [];
    });
};

const apiGetUserWishlistItems = () => {
  axios({
    method: "get",
    url: process.env.REACT_APP_BASEURL + "/api/wishlists",
    headers: {
      Authorization: getUserSessionToken(),
      // Authorization: initialState.userToken,
    },
    data: "",
  })
    .then(function (response) {
      console.log(response.data);
      // initialState["userWishlistItems"] = response.data.data;
      initialState["userWishlistCount"] = response.data.data.length || 0;
      // localStorage.setItem(
      //   "userWishlistItems",
      //   JSON.stringify(response.data.data)
      // );
      return response.data.data.length || 0;
    })
    .catch(function (error) {
      // defaultAPIErrorHandler(error)
      return 0;
    });
};

const apiGetUserCartItems = () => {
  axios({
    method: "get",
    url: process.env.REACT_APP_BASEURL + "/api/cart",
    headers: {
      Authorization: getUserSessionToken(),
      // Authorization: initialState.userToken,
    },
    data: "",
  })
    .then((response) => {
      console.log(response.data);
      // initialState["userCartItems"] = response.data.data.cart;
      initialState["userCartCount"] = response.data.data.cart.length || 0;
      // localStorage.setItem(
      //   "userCartItems",
      //   JSON.stringify(response.data.data.cart)
      // );
      return response.data.data.cart.length || 0;
    })
    .catch((error) => {
      // defaultAPIErrorHandler(error)
      return 0;
    });
};

const apiGetAllProducts = () => {
  let data = "";

  let config = {
    method: "get",
    url: process.env.REACT_APP_BASEURL + "/api/product/getProducts",
    headers: {
      // Authorization: state.userToken,
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      console.log(response.data);

      // initialState["allProducts"] = response.data.data.products;
      initialState["allProducts"] = response.data.data.products || [];
      // localStorage.setItem(
      //   "allProducts",
      //   JSON.stringify(response.data.data.products)
      // );

      return response.data.data.products || [];
    })
    .catch((error) => {
      // defaultAPIErrorHandler(error)
      return [];
    });
};

console.log("\n✅ contextAPI.js) FIRST RUN");

export const initialState = {
  allCategories: getAllCat_SubCat_SubSubCat(),
  // allBrands: JSON.parse(localStorage.getItem("allBrands")),
  allBrands: getAllBrands(),
  // userId: "a",
  // userToken: "b",
  // userType: "c",
  // userExpiresIn: `${Date.now()}`,
  // isSignedIn: false,
  // refreshActiveAppointment: false,
  isAdminLoggedIn: isAdminLoggedIn(),
  adminToken: getAdminSessionToken(),
  adminProfile: getAdminProfile(),

  isSellerLoggedIn: isSellerLoggedIn(),
  sellerToken: getSellerSessionToken(),
  sellerProfile: getSellerProfile(),
  sellerRole: getSellerRole(),

  isServiceLoggedIn: isServiceLoggedIn(),
  serviceToken: getServiceSessionToken(),

  isUserLoggedIn: isUserLoggedIn(),
  userToken: getUserSessionToken(),
  userProfile: getUserProfile(),

  userWishlistCount: apiGetUserWishlistItems() || 0,
  userCartCount: apiGetUserCartItems() || 0,
  allProducts: apiGetAllProducts() || [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_APIS":
      getAllBrands();
      getAllCat_SubCat_SubSubCat();
      return state;

    // USERTYPE_ACTION
    case "ADMIN_LOGOUT":
      removeAdminSessionToken();
      removeAdminProfile();
      return {
        ...state,
        isAdminLoggedIn: false,
        adminToken: null,
        adminProfile: null,
      };
    case "SELLER_LOGOUT":
      removeSellerSessionToken();
      removeSellerProfile();
      removeSellerRole();
      return {
        ...state,
        isSellerLoggedIn: false,
        sellerToken: null,
        sellerProfile: null,
      };
    case "SERVICE_LOGOUT":
      removeServiceSessionToken();
      // removeServiceProfile();
      // removeSellerRole();
      return {
        ...state,
        isServiceLoggedIn: false,
        serviceToken: null,
        // sellerProfile: null,
      };
    case "USER_LOGOUT":
      removeUserSessionToken();
      removeUserProfile();
      return {
        ...state,
        isUserLoggedIn: false,
        userToken: null,
        userProfile: null,
      };
    case "ADMIN_LOGIN":
      setAdminSessionToken(action.adminToken);
      return {
        ...state,
        isAdminLoggedIn: true,
        adminToken: action.adminToken,
      };
    case "SELLER_LOGIN":
      setSellerSessionToken(action.sellerToken);
      setSellerRole(action?.sellerRole);
      return {
        ...state,
        isSellerLoggedIn: true,
        sellerToken: action.sellerToken,
        sellerRole: action?.sellerRole,
      };
    case "SERVICE_LOGIN":
      setServiceSessionToken(action.serviceToken);
      // setSellerRole(action?.sellerRole);
      return {
        ...state,
        isServiceLoggedIn: true,
        serviceToken: action.serviceToken,
        // sellerRole: action?.sellerRole,
      };
    case "USER_LOGIN":
      setUserSessionToken(action.userToken);
      return {
        ...state,
        isUserLoggedIn: true,
        userToken: action.userToken,
      };
    case "USER_PROFILE":
      // delete action.type;
      console.log(action);
      setUserProfile(action);
      return {
        ...state,
        userProfile: { ...action },
      };
    case "SELLER_PROFILE":
      // delete action.type;
      console.log(action);
      setSellerProfile(action);
      return {
        ...state,
        sellerProfile: { ...action },
      };
    case "ADMIN_PROFILE":
      // delete action.type;
      console.log(action);
      setAdminProfile(action);
      return {
        ...state,
        adminProfile: { ...action },
      };

    case "SET_USER":
      // save("userId", action.userId);
      // save("userToken", action.userToken);
      // save("userType", action.userType);
      // save("userExpiresIn", action.userExpiresIn);
      // save("isSignedIn", action.isSignedIn);
      console.log("contextAPI) reducer called:");

      return {
        ...state,
        userId: action.userId,
        userToken: action.userToken,
        userType: action.userType,
        userExpiresIn: action.userExpiresIn,
        isSignedIn: action.isSignedIn,
      };

    case "SET_USER_WISHLIST_COUNT":
      return {
        ...state,
        userWishlistCount: action.userWishlistCount,
      };

    case "SET_USER_CART_COUNT":
      return {
        ...state,
        userCartCount: action.userCartCount,
      };

    case "SET_ACTIVE_APPOINTMENT_REFRESH":
      return {
        ...state,
        refreshActiveAppointment: action.refreshActiveAppointment,
      };

    default:
      console.log("Default dispatch action");
      return state;
  }
};
