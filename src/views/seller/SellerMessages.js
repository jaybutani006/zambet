import React from "react";

function SellerMessages() {
  return (
    <main
      id="content"
      role="main"
      className="main pointer-event"
      style={{ backgroundColor: "#F7F8FA" }}
    >
      <div className="content container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-2">
          <h1 className="h3 mb-0 text-black-50">Chatting List</h1>
        </div>
        <div className="row mt-3">
          <div className="col-lg-3 chatSel">
            <div className="card box-shadow-sm">
              <div className="inbox_people">
                <div className="headind_srch">
                  <form className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
                    <input
                      className="form-control form-control-sm mr-3 w-75"
                      id="myInput"
                      type="text"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <i
                      className="fa fa-search"
                      style={{ color: "#92C6FF" }}
                      aria-hidden="true"
                    />
                  </form>
                  <hr />
                </div>
                <div className="inbox_chat">
                  <div className="chat_list  active " id="user_12">
                    <div className="chat_people" id="chat_people">
                      <div className="chat_img">
                        <img
                          src="/assets/front-end/img/image-place-holder.png"
                          style={{
                            borderRadius: "15px",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </div>
                      <div className="chat_ib">
                        <h5 className="seller active-text " id={12}>
                          Marjhan Sultana
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="chat_list " id="user_6">
                    <div className="chat_people" id="chat_people">
                      <div className="chat_img">
                        <img
                          src="/assets/front-end/img/image-place-holder.png"
                          style={{
                            borderRadius: "15px",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </div>
                      <div className="chat_ib">
                        <h5 className="seller " id={6}>
                          Piyush Narola
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="chat_list " id="user_4">
                    <div className="chat_people" id="chat_people">
                      <div className="chat_img">
                        <img
                          src="/assets/front-end/img/image-place-holder.png"
                          style={{
                            borderRadius: "15px",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </div>
                      <div className="chat_ib">
                        <h5 className="seller " id={4}>
                          Ashek Elahe
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="chat_list " id="user_3">
                    <div className="chat_people" id="chat_people">
                      <div className="chat_img">
                        <img
                          src="/assets/front-end/img/image-place-holder.png"
                          style={{
                            borderRadius: "15px",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </div>
                      <div className="chat_ib">
                        <h5 className="seller " id={3}>
                          Nipon Doe
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section className="col-lg-8">
            <div className="card box-shadow-sm Chat">
              <div className="messaging">
                <div className="inbox_msg">
                  <div className="mesgs">
                    <div className="msg_history" id="show_msg">
                      <div className="incoming_msg">
                        <div className="incoming_msg_img">
                          <img
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                            }}
                            src="/assets/front-end/img/image-place-holder.png"
                            alt=""
                          />
                        </div>
                        <div className="received_msg">
                          <div className="received_withd_msg">
                            <p>hiiiii</p>
                            <span className="time_date">
                              {" "}
                              05:32 AM | Nov 22{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="type_msg">
                      <div className="input_msg_write">
                        <form
                          className="form-inline d-flex justify-content-center md-form form-sm active-cyan-2 mt-2"
                          id="myForm"
                        >
                          <input
                            type="hidden"
                            name="_token"
                            defaultValue="9MwZveTgMo0uPqMjzJMJ6iptaS1V3eI3RwcrHfin"
                          />{" "}
                          <input
                            type="text"
                            id="hidden_value"
                            hidden
                            defaultValue={12}
                            name
                          />
                          <input
                            className="form-control form-control-sm mr-3 w-75"
                            id="msgInputValue"
                            type="text"
                            placeholder="Send a message"
                            aria-label="Search"
                          />
                          <input
                            className="aSend"
                            type="submit"
                            id="msgSendBtn"
                            style={{ width: "45px" }}
                            defaultValue="Send"
                          />
                          <i
                            className="fa fa-send"
                            style={{ color: "#92C6FF" }}
                            aria-hidden="true"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default SellerMessages;
