import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
//
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "context/newContext";

import dummyShopBanner from "assets/dummyShopBanner.png";
import dummyShopLogo from "assets/dummyShopLogo.png";

function ServiceBook() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalState, setModalState] = useState(null);
    const { id, serviceId } = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useContext(Context);
    const [data, setData] = useState({
      ocationName: "",
      description: "",
      ocation_place: "",
      oction_date: new Date().toISOString().split("T")[0], // Set current date as default
      oction_time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
        console.log(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      try {
        // Prepare the request body
        const requestBody = {
          ocation_name: data.ocationName,
          description: data.description,
          ocation_place: data.ocation_place,
          oction_date: data.oction_date,
          oction_time: data.oction_time,
          service_id: serviceId, // Assuming you have the value of serviceId available
          service_provider_id: id, // Assuming you have the value of id available
        };

        const response = await axios.post(
          process.env.REACT_APP_BASEURL + "/api/service_booking",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: state.userToken,
            },
          }
        );
          if (response.data.status === "OK") {
              alert("booked successfully");
              navigate(`/serviceView/${id}`);
        }

        // Handle successful response
        // ...
      } catch (error) {
        // Handle error
        // ...
      }
  };
  
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getCurrentTime() {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }


  return (
    <div className="content container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h1 className="h3 mb-0 ">Book Service</h1>
            </div>
            <div className="card-body">
              <form style={{ textAlign: "left" }}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="service_provider_portfolio_name">
                        Ocation Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="ocationName"
                        defaultValue="Mart Morning"
                        className="form-control form-control-input"
                        id="ocationName"
                        onChange={handleInputChange}
                        value={data.ocationName}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">
                        Description <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="description"
                        defaultValue="Mart Morning"
                        className="form-control form-control-input"
                        id="description"
                        onChange={handleInputChange}
                        value={data.description}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">
                        Ocation Place <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="ocation_place"
                        defaultValue="Mart Morning"
                        className="form-control form-control-input"
                        id="ocation_place"
                        onChange={handleInputChange}
                        value={data.ocation_place}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="description">
                        Ocation Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        name="oction_date"
                        defaultValue="2023-06-14" // Set a default value or remove this attribute if not needed
                        className="form-control form-control-input"
                        id="oction_date"
                        onChange={handleInputChange}
                        value={data.ocation_oction_dateplace}
                        min={getCurrentDate()}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">
                        Ocation Time <span className="text-danger">*</span>
                      </label>
                      <input
                        type="time"
                        name="oction_time"
                        defaultValue="12:00" // Set a default value or remove this attribute if not needed
                        className="form-control form-control-input"
                        id="oction_time"
                        onChange={handleInputChange}
                        value={data.oction_time}
                        step="300"
                        pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <button
                  onClick={handleSubmit}
                  // type="submit"
                  className="btn btn-primary float-right"
                  // id="btn_update"
                >
                  Submit
                </button>
                <Link className="btn btn-danger" to={`/serviceView/${id}`}>
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceBook;
