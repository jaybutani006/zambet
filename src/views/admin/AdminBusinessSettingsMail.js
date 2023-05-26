import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { Context } from "context/newContext";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminBusinessSettingsMail() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const [scope, setScope] = useState("");
  const [to, setTo] = useState("");
  const [list, setList] = useState("");
  const [mailSubject, setMailSubject] = useState("");
  const [mailPlainText, setMailPlainText] = useState("");
  const [mailHTML, setMailHTML] = useState("");

  const handleSendBulk = () => {
    const config = {
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/bulk/email",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        scope: scope,
        to: to,
        list: list,
        mailSubject: mailSubject,
        mailPlainText: mailPlainText,
        mailHTML: mailHTML,
      }),
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        alert("Sent Emails Successfully");
        // if (
        //   window.confirm(`Click OK to see Preview URL : ${response.data?.data}`)
        // ) {
        //   window.open(`${response.data?.data}`);
        // }
        // // navigate("/seller/dashboard", { replace: true });
      })
      .catch((error) => {
        defaultAPIErrorHandler(error)
      });
  };

  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="content container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <div className="align-items-center">
                  <div className="col-sm mb-2 mb-sm-0">
                    <h1 className="page-header-title">
                      <i className="tio-add-circle-outlined" /> Mail
                    </h1>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Subject
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          value={mailSubject}
                          onChange={(e) => setMailSubject(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label className="input-label">Body</label>
                        <input
                          type="text"
                          className="form-control"
                          name="Body"
                          value={mailPlainText}
                          onChange={(e) => setMailPlainText(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          Scope:
                        </label>
                        {/* <input
                          type="email"
                          name="email_address"
                          className="form-control"
                          // value={mainState?.email_address}
                          // onChange={handleInputChange}
                        /> */}
                        <select
                          className="form-control"
                          name="to"
                          onChange={(e) => setScope(e.target.value)}
                        >
                          <option value="" selected disabled>
                            ---Select---
                          </option>
                          {["all"].map((item) => (
                            <option value={item} selected={scope === item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="form-group">
                        <label
                          className="input-label"
                          htmlFor="exampleFormControlInput1"
                        >
                          To:
                        </label>
                        {/* <input
                          type="email"
                          name="email_address"
                          className="form-control"
                          // value={mainState?.email_address}
                          // onChange={handleInputChange}
                        /> */}
                        <select
                          className="form-control"
                          name="to"
                          onChange={(e) => setTo(e.target.value)}
                        >
                          <option value="" selected disabled>
                            ---Select---
                          </option>
                          {["admin", "vendor", "customer"].map((item) => (
                            <option value={item} selected={to === item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <button
                    // type="submit"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSendBulk();
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  // return (
  //   <main
  //     id="content"
  //     role="main"
  //     className="main pointer-event"
  //     style={{ backgroundColor: "#ffffff" }}
  //   >
  //     <div className="content container-fluid">
  //       <nav aria-label="breadcrumb">
  //         <ol className="breadcrumb">
  //           <li className="breadcrumb-item">
  //             <AdminDashboardBreadCrumb />
  //           </li>
  //           <li className="breadcrumb-item" aria-current="page">
  //             Mail config
  //           </li>
  //         </ol>
  //       </nav>
  //       <div
  //         className="row"
  //         style={{ paddingBottom: "20px", textAlign: "left" }}
  //       >
  //         <div className="col-12 mb-3 mb-md-0 col-md-6">
  //           <div className="card">
  //             <div className="card-body" style={{ padding: "20px" }}>
  //               <form>
  //                 <input
  //                   type="hidden"
  //                   name="_token"
  //                   defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
  //                 />{" "}
  //                 <div className="form-group mb-2 text-center">
  //                   <label className="control-label">Smtp mail config</label>
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label className="control-label">Smtp mail</label>
  //                 </div>
  //                 <div className="form-group mb-2 mt-2">
  //                   <input
  //                     type="radio"
  //                     name="status"
  //                     defaultValue={1}
  //                     defaultChecked
  //                   />
  //                   <label style={{ paddingLeft: "10px" }}>Active</label>
  //                   <br />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <input type="radio" name="status" defaultValue={0} />
  //                   <label style={{ paddingLeft: "10px" }}>Inactive</label>
  //                   <br />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Mailer name</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     placeholder="ex : Alex"
  //                     className="form-control"
  //                     name="name"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Host</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="host"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Driver</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="driver"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Port</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="port"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Username</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     placeholder="ex : ex@yahoo.com"
  //                     className="form-control"
  //                     name="username"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Email id</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     placeholder="ex : ex@yahoo.com"
  //                     className="form-control"
  //                     name="email"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Encryption</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     placeholder="ex : tls"
  //                     className="form-control"
  //                     name="encryption"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Password</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="password"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <button
  //                   type="button"
  //                   onclick="call_demo()"
  //                   className="btn btn-primary mb-2"
  //                 >
  //                   Save
  //                 </button>
  //               </form>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="col-12 col-md-6">
  //           <div className="card">
  //             <div className="card-body" style={{ padding: "20px" }}>
  //               <form>
  //                 <input
  //                   type="hidden"
  //                   name="_token"
  //                   defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
  //                 />{" "}
  //                 <div className="form-group mb-2 text-center">
  //                   <label className="control-label">
  //                     Sendgrid mail config
  //                   </label>
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label className="control-label">Sendgrid mail</label>
  //                 </div>
  //                 <div className="form-group mb-2 mt-2">
  //                   <input type="radio" name="status" defaultValue={1} />
  //                   <label style={{ paddingLeft: "10px" }}>Active</label>
  //                   <br />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <input
  //                     type="radio"
  //                     name="status"
  //                     defaultValue={0}
  //                     defaultChecked
  //                   />
  //                   <label style={{ paddingLeft: "10px" }}>Inactive</label>
  //                   <br />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Mailer name</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     placeholder="ex : Alex"
  //                     className="form-control"
  //                     name="name"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Host</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="host"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Driver</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="driver"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Port</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="port"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Username</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     placeholder="ex : ex@yahoo.com"
  //                     className="form-control"
  //                     name="username"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Email id</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     placeholder="ex : ex@yahoo.com"
  //                     className="form-control"
  //                     name="email"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Encryption</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     placeholder="ex : tls"
  //                     className="form-control"
  //                     name="encryption"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <div className="form-group mb-2">
  //                   <label style={{ paddingLeft: "10px" }}>Password</label>
  //                   <br />
  //                   <input
  //                     type="text"
  //                     className="form-control"
  //                     name="password"
  //                     defaultValue
  //                   />
  //                 </div>
  //                 <button
  //                   type="button"
  //                   onclick="call_demo()"
  //                   className="btn btn-primary mb-2"
  //                 >
  //                   Save
  //                 </button>
  //               </form>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="footer">
  //       <div className="row justify-content-between align-items-center">
  //         <div className="col">
  //           <p className="font-size-sm mb-0">
  //             {" "}
  //             <span className="d-none d-sm-inline-block">
  //               Copyright © 2022 Zambet
  //             </span>
  //           </p>
  //         </div>
  //         <div className="col-auto">
  //           <div className="d-flex justify-content-end">
  //             <ul className="list-inline list-separator">
  //               <li className="list-inline-item">
  //                 <a
  //                   className="list-separator-link"
  //                   href="/admin/business-settings/web-config"
  //                 >
  //                   {" "}
  //                   Settings
  //                 </a>
  //               </li>
  //               <li className="list-inline-item">
  //                 <a
  //                   className="list-separator-link"
  //                   href="/admin/helpTopic/list"
  //                 >
  //                   FAQ
  //                 </a>
  //               </li>
  //               <li className="list-inline-item">
  //                 <div className="hs-unfold">
  //                   <a
  //                     className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle"
  //                     href="/admin/dashboard"
  //                     data-hs-unfold-invoker
  //                   >
  //                     <i className="tio-home-outlined" />
  //                   </a>
  //                 </div>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div
  //       className="modal fade"
  //       id="logoutModal"
  //       tabIndex={-1}
  //       role="dialog"
  //       aria-labelledby="exampleModalLabel"
  //       aria-hidden="true"
  //     >
  //       <div className="modal-dialog" role="document">
  //         <div className="modal-content">
  //           <div className="modal-header">
  //             <h5 className="modal-title" id="exampleModalLabel">
  //               Ready to Leave?
  //             </h5>
  //             <button
  //               className="close"
  //               type="button"
  //               data-dismiss="modal"
  //               aria-label="Close"
  //             >
  //               <span aria-hidden="true">×</span>
  //             </button>
  //           </div>
  //           <div className="modal-body">
  //             Select Logout below if you are ready to end your current session.
  //           </div>
  //           <div className="modal-footer">
  //             <form>
  //               <input
  //                 type="hidden"
  //                 name="_token"
  //                 defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
  //               />{" "}
  //               <button
  //                 className="btn btn-danger"
  //                 type="button"
  //                 data-dismiss="modal"
  //               >
  //                 Cancel
  //               </button>
  //               <button className="btn btn-primary" type="submit">
  //                 Logout
  //               </button>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //   </main>
  // );
}

export default AdminBusinessSettingsMail;
