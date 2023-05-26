import { defaultAPIErrorHandler } from "api/api";
import axios from "axios";
import AdminDashboardBreadCrumb from "components/header/AdminDashboardBreadCrumb";
import { Context } from "context/newContext";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminBusinessSettingsFCMIndex() {
  const [state, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const [scope, setScope] = useState("");
  const [to, setTo] = useState("");
  const [list, setList] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSendBulk = () => {
    const config = {
      method: "post",
      url: process.env.REACT_APP_BASEURL + "/api/bulk/notification",
      headers: {
        "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data",
        Authorization: state.adminToken,
      },
      data: JSON.stringify({
        scope: scope,
        to: to,
        list: list,
        title: title,
        body: body,
      }),
    };
    axios(config)
      .then((response) => {
        console.log(response.data);
        alert("Sent notification Successfully");
        // if (
        //   window.confirm(`Click OK to see Preview URL : ${response.data?.data}`)
        // ) {
        //   window.open(`${response.data?.data}`);
        // }
        // navigate("/seller/dashboard", { replace: true });
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
                      <i className="tio-add-circle-outlined" /> Notification
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
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
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
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
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
                    type="submit"
                    className="btn btn-primary"
                    // onClick={handleSubmit}
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
  //             Push Notification Setup
  //           </li>
  //         </ol>
  //       </nav>
  //       <div className="row gx-2 gx-lg-3">
  //         <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
  //           <div className="card">
  //             <div className="card-header">
  //               <h1 className="page-header-title">
  //                 Firebase Push Notification Setup
  //               </h1>
  //             </div>
  //             <div className="card-body">
  //               <form style={{ textAlign: "left" }}>
  //                 <input
  //                   type="hidden"
  //                   name="_token"
  //                   defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
  //                 />{" "}
  //                 <div className="form-group">
  //                   <label
  //                     className="input-label"
  //                     htmlFor="exampleFormControlInput1"
  //                   >
  //                     Server Key
  //                   </label>
  //                   <textarea
  //                     name="push_notification_key"
  //                     className="form-control"
  //                     required
  //                     defaultValue={""}
  //                   />
  //                 </div>
  //                 <div className="row" style={{ display: "none" }}>
  //                   <div className="col-md-12 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="input-label"
  //                         htmlFor="exampleFormControlInput1"
  //                       >
  //                         FCM Project ID
  //                       </label>
  //                       <input
  //                         type="text"
  //                         defaultValue
  //                         name="fcm_project_id"
  //                         className="form-control"
  //                       />
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <hr />
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
  //         <hr />
  //         <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
  //           <div className="card">
  //             <div className="card-header">
  //               <h2>Push Messages</h2>
  //             </div>
  //             <div className="card-body">
  //               <form style={{ textAlign: "left" }}>
  //                 <input
  //                   type="hidden"
  //                   name="_token"
  //                   defaultValue="u6GOrXsoRaqVCSqDXnArevLM6wUEqejL2jE0AoWi"
  //                 />
  //                 <div className="row">
  //                   <div className="col-md-6 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="toggle-switch d-flex align-items-center mb-3"
  //                         htmlFor="pending_status"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           name="pending_status"
  //                           className="toggle-switch-input"
  //                           defaultValue={1}
  //                           id="pending_status"
  //                           defaultChecked
  //                         />
  //                         <span className="toggle-switch-label">
  //                           <span className="toggle-switch-indicator" />
  //                         </span>
  //                         <span className="toggle-switch-content">
  //                           <span className="d-block ">
  //                             Order Pending Message
  //                           </span>
  //                         </span>
  //                       </label>
  //                       <textarea
  //                         name="pending_message"
  //                         className="form-control"
  //                         defaultValue={"order pending message"}
  //                       />
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="toggle-switch d-flex align-items-center mb-3"
  //                         htmlFor="confirm_status"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           name="confirm_status"
  //                           className="toggle-switch-input"
  //                           defaultValue={1}
  //                           id="confirm_status"
  //                           defaultChecked
  //                         />
  //                         <span className="toggle-switch-label">
  //                           <span className="toggle-switch-indicator" />
  //                         </span>
  //                         <span className="toggle-switch-content">
  //                           <span className="d-block ">
  //                             {" "}
  //                             Order Confirmation Message
  //                           </span>
  //                         </span>
  //                       </label>
  //                       <textarea
  //                         name="confirm_message"
  //                         className="form-control"
  //                         defaultValue={"Order Confirm Message"}
  //                       />
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="toggle-switch d-flex align-items-center mb-3"
  //                         htmlFor="processing_status"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           name="processing_status"
  //                           className="toggle-switch-input"
  //                           defaultValue={1}
  //                           id="processing_status"
  //                           defaultChecked
  //                         />
  //                         <span className="toggle-switch-label">
  //                           <span className="toggle-switch-indicator" />
  //                         </span>
  //                         <span className="toggle-switch-content">
  //                           <span className="d-block ">
  //                             Order Processing Message
  //                           </span>
  //                         </span>
  //                       </label>
  //                       <textarea
  //                         name="processing_message"
  //                         className="form-control"
  //                         defaultValue={"Order Processing Message"}
  //                       />
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="toggle-switch d-flex align-items-center mb-3"
  //                         htmlFor="out_for_delivery"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           name="out_for_delivery_status"
  //                           className="toggle-switch-input"
  //                           defaultValue={1}
  //                           id="out_for_delivery"
  //                           defaultChecked
  //                         />
  //                         <span className="toggle-switch-label">
  //                           <span className="toggle-switch-indicator" />
  //                         </span>
  //                         <span className="toggle-switch-content">
  //                           <span className="d-block ">
  //                             Order out for delivery Message
  //                           </span>
  //                         </span>
  //                       </label>
  //                       <textarea
  //                         name="out_for_delivery_message"
  //                         className="form-control"
  //                         defaultValue={"Order Out for Delivery Message"}
  //                       />
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="toggle-switch d-flex align-items-center mb-3"
  //                         htmlFor="delivered_status"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           name="delivered_status"
  //                           className="toggle-switch-input"
  //                           defaultValue={1}
  //                           id="delivered_status"
  //                           defaultChecked
  //                         />
  //                         <span className="toggle-switch-label">
  //                           <span className="toggle-switch-indicator" />
  //                         </span>
  //                         <span className="toggle-switch-content">
  //                           <span className="d-block ">
  //                             Order Delivered Message
  //                           </span>
  //                         </span>
  //                       </label>
  //                       <textarea
  //                         name="delivered_message"
  //                         className="form-control"
  //                         defaultValue={"Order Delivered Message"}
  //                       />
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="toggle-switch d-flex align-items-center mb-3"
  //                         htmlFor="returned_status"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           name="returned_status"
  //                           className="toggle-switch-input"
  //                           defaultValue={1}
  //                           id="returned_status"
  //                         />
  //                         <span className="toggle-switch-label">
  //                           <span className="toggle-switch-indicator" />
  //                         </span>
  //                         <span className="toggle-switch-content">
  //                           <span className="d-block ">
  //                             Order Returned Message
  //                           </span>
  //                         </span>
  //                       </label>
  //                       <textarea
  //                         name="returned_message"
  //                         className="form-control"
  //                         defaultValue={""}
  //                       />
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="toggle-switch d-flex align-items-center mb-3"
  //                         htmlFor="failed_status"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           name="failed_status"
  //                           className="toggle-switch-input"
  //                           defaultValue={1}
  //                           id="failed_status"
  //                         />
  //                         <span className="toggle-switch-label">
  //                           <span className="toggle-switch-indicator" />
  //                         </span>
  //                         <span className="toggle-switch-content">
  //                           <span className="d-block ">
  //                             Order Failed Message
  //                           </span>
  //                         </span>
  //                       </label>
  //                       <textarea
  //                         name="failed_message"
  //                         className="form-control"
  //                         defaultValue={""}
  //                       />
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="toggle-switch d-flex align-items-center mb-3"
  //                         htmlFor="delivery_boy_assign"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           name="delivery_boy_assign_status"
  //                           className="toggle-switch-input"
  //                           defaultValue={1}
  //                           id="delivery_boy_assign"
  //                           defaultChecked
  //                         />
  //                         <span className="toggle-switch-label">
  //                           <span className="toggle-switch-indicator" />
  //                         </span>
  //                         <span className="toggle-switch-content">
  //                           <span className="d-block">
  //                             Deliveryman Assign Message
  //                           </span>
  //                         </span>
  //                       </label>
  //                       <textarea
  //                         name="delivery_boy_assign_message"
  //                         className="form-control"
  //                         defaultValue={"Delivery man Assigned"}
  //                       />
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="toggle-switch d-flex align-items-center mb-3"
  //                         htmlFor="delivery_boy_start_status"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           name="delivery_boy_start_status"
  //                           className="toggle-switch-input"
  //                           defaultValue={1}
  //                           id="delivery_boy_start_status"
  //                         />
  //                         <span className="toggle-switch-label">
  //                           <span className="toggle-switch-indicator" />
  //                         </span>
  //                         <span className="toggle-switch-content">
  //                           <span className="d-block">
  //                             {" "}
  //                             Deliveryman Start Message
  //                           </span>
  //                         </span>
  //                       </label>
  //                       <textarea
  //                         name="delivery_boy_start_message"
  //                         className="form-control"
  //                         defaultValue={""}
  //                       />
  //                     </div>
  //                   </div>
  //                   <div className="col-md-6 col-12">
  //                     <div className="form-group">
  //                       <label
  //                         className="toggle-switch d-flex align-items-center mb-3"
  //                         htmlFor="delivery_boy_delivered"
  //                       >
  //                         <input
  //                           type="checkbox"
  //                           name="delivery_boy_delivered_status"
  //                           className="toggle-switch-input"
  //                           defaultValue={1}
  //                           id="delivery_boy_delivered"
  //                         />
  //                         <span className="toggle-switch-label">
  //                           <span className="toggle-switch-indicator" />
  //                         </span>
  //                         <span className="toggle-switch-content">
  //                           <span className="d-block">
  //                             Deliveryman Delivered Message
  //                           </span>
  //                         </span>
  //                       </label>
  //                       <textarea
  //                         name="delivery_boy_delivered_message"
  //                         className="form-control"
  //                         defaultValue={""}
  //                       />
  //                     </div>
  //                   </div>
  //                 </div>
  //                 <hr />
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

export default AdminBusinessSettingsFCMIndex;
