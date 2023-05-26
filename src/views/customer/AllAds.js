import React, { useState, useEffect } from "react";

const AllAds = () => {
  const [ads, setAds] = useState([]);
  const advertisement = async () => {
    const usertoken = localStorage.getItem("userToken");

    const res = await fetch(
      process.env.REACT_APP_BASEURL + "/api/advertising_preferences/customer",
      {
        method: "GET",
        headers: {
          Authorization: usertoken,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data);
    setAds(data.data);
  };

  useEffect(() => {
    advertisement();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row gx-3 gy-3">
          {/* <div className="col-sm-4 col-6 ">
            <img src="/abc/fav2.jpg" />
          </div>
          <div className="col-sm-4 col-6 ">
            <img src="/abc/fav2.jpg" />
          </div>
          <div className="col-sm-4 col-6 ">
            <img src="/abc/fav2.jpg" />
          </div>
          <div className="col-sm-4 col-6 ">
            <img src="/abc/fav2.jpg" />
          </div> */}
          {ads.map((ele) => {
            return (
              <>
                <div className="col-sm-4 col-6">
                  <img src={ele.photo} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllAds;
