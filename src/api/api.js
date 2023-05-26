import axios from "axios";
import { toast } from "react-toastify";
// const getShopInfo = () => {
//   axios({
//     method: "get",
//     url: "http://192.168.200.106:3002/api/bankdetail",
//     headers: {
//       Authorization:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODI0ZjlkZTVjZTVkNWI2OWU4OTU3MSIsInJvbGUiOiJ2ZW5kb3IiLCJpYXQiOjE2NTI3MDcyMjksImV4cCI6MTY4NDI0MzIyOX0.851Fdz91Ky3DGRxo_s2lGFNM6PbaZ82otwajFMrdcus",
//     },
//   })
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };



// axios({
//   method: "delete",
//   url: process.env.REACT_APP_BASEURL + "/api/abc",
//   params: {
//     // _id: ""
//   },
//   headers: {
//     // "Content-Type": "application/json",
//     // "Content-Type": "multipart/form-data",
//     // Authorization: state.adminToken,
//   },
//   // data: formData,
//   // data: JSON.stringify({}),
// })
//   .then((response) => {
//     console.log(response.data.data);
//     // getPurchaseProductList();
//   })
//   .catch((error) => {
//     console.log(error);
//     defaultAPIErrorHandler(error)
//   });


const defaultAPIErrorHandler = error => {
  console.log(error);
  if (error?.response) {
    // Request made and server responded
    toast.error(error?.response?.data?.message || process.env.REACT_APP_DEFAULT_ERROR_MSG, {
      // position: "top-center",
      // autoClose: 1500,
      // hideProgressBar: true,
      // closeOnClick: true,
      // pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
    });
    // window.alert(error?.response?.data?.message || process.env.REACT_APP_DEFAULT_ERROR_MSG);
    console.log(error?.response?.data);
    console.log(error?.response?.status);
    console.log(error?.response?.headers);
  } else if (error?.request) {
    // The request was made but no response was received
    console.log(error?.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error?.message);
  }
}

export { defaultAPIErrorHandler };