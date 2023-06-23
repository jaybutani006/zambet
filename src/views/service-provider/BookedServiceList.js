import React, { useState, useEffect } from "react";

const CustomersNames = () => {
  const [name, setName] = useState([]);

  const CustomerName = async () => {
    const token = localStorage.getItem("serviceToken");
    const res = await fetch(
      process.env.REACT_APP_BASEURL + "/api/service_booking/bookinginfo",
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data);
    setName(data.data);
  };
    console.log(name);
  useEffect(() => {
    CustomerName();
  }, []);
    console.log(name);
//   const renderCustomerData = () => {
//     const uniqueIds = new Set();
//     let counter = 0;

//     return name.map((ele) => {
//       return ele.ordermasters.map((e) => {
//         if (!uniqueIds.has(e.regid)) {
//           uniqueIds.add(e.regid);
//           counter++;

//           return (
//             <tr key={e.regid} className="text-center">
//               <td>{counter}</td>
//               <td>{e.regid}</td>
//               <td>{e.customer_name}</td>
//               <td>{e.customer_mobile}</td>
//             </tr>
//           );
//         }
//         return null;
//       });
//     });
//   };

  return (
    <>
      <main
        id="content"
        role="main"
        className="main pointer-event"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <div className="content container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <div className="row flex-between justify-content-between align-items-center flex-grow-1">
                    <div className="col-12 mb-1 col-md-4">
                      <h5>Booked Services</h5>
                    </div>
                  </div>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  <div
                    className="table-responsive"
                    style={{ maxHeight: "50vh", overflowY: "scroll" }}
                  >
                    <table
                      id="datatable"
                      className="table text-center table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
                    >
                      <thead className="thead-light">
                        <tr>
                          <th style={{ width: "10%" }}>user_id</th>
                          <th style={{ width: "10%" }}>user_name</th>
                          <th style={{ width: "10%" }}>user_email</th>
                          <th style={{ width: "10%" }}>user_contact</th>
                          <th style={{ width: "40%" }}>ocation_name</th>
                          <th style={{ width: "40%" }}>oction_time</th>
                          <th style={{ width: "40%" }}>oction_date</th>
                          <th style={{ width: "40%" }}>ocation_place</th>
                          <th style={{ width: "40%" }}>status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {name &&
                          name.map((item) => (
                            <tr key={item._id} className="text-center">
                              <td>{item.user_id}</td>
                              <td>
                                {`${item?.User?.[0]?.["User Details"]?.[0]?.first_name} ${item?.User?.[0]?.["User Details"]?.[0]?.last_name}`}
                              </td>
                              <td>{item?.User?.[0]?.email_address}</td>
                              <td>{item?.User?.[0]?.contect_no}</td>
                              <td>{item.ocation_name}</td>
                              <td>{item.oction_time}</td>
                              <td>{item.oction_date}</td>
                              <td>{item.ocation_place}</td>
                              <td>{item.status}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer"></div>
                {!name?.length && (
                  <div className="text-center p-4">
                    <img
                      className="mb-3"
                      src="/assets/back-end/svg/illustrations/sorry.svg"
                      alt="Image Description"
                      style={{ width: "7rem" }}
                    />
                    <p className="mb-0">No data to show</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CustomersNames;
