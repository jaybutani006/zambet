import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";

const ReplacePolicyEdit = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState({
    description: "",
  });

  const txt = (e) => {
    const { name, value } = e.target;
    setPolicy({ ...policy, [name]: value });
  };

  const getPolicy = async () => {
    const res = await fetch(
      `https://zambet-ecommerce.onrender.com/api/replacement_policy/detail?_id=${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data.data[0]);
    setPolicy(data.data[0]);
  };

  const btnn = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    const { description } = policy;

    const res = await fetch(
      `https://zambet-ecommerce.onrender.com/api/replacement_policy?_id=${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
        }),
      }
    );
    const data1 = await res.json;
    console.log(data1);
    setPolicy(data1);
    alert("replace policy updated");
  };

  useEffect(() => {
    getPolicy();
  }, [id]);
  return (
    <>
      <main
        id="content"
        role="main"
        className="pointer-event"
        style={{ backgroundColor: "#F7F8FA" }}
      >
        <div className="content container-fluid">
          <div className="row align-items-center mb-3">
            <div className="col-sm">
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row  justify-content-between align-items-center flex-grow-1">
                        <div className="col-12 col-sm-6 col-md-4">
                          <h5>Pricing Policy Edit</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-2 mt-2 mt-sm-0 p-3"></div>
                    <div
                      style={{
                        fontSize: "22px",
                        marginBottom: "10px",
                        marginLeft: "20px",
                      }}
                    >
                      {policy.title}
                    </div>
                    <textarea
                      type="text"
                      onChange={txt}
                      name="description"
                      value={policy.description}
                      style={{ margin: "20px" }}
                    />
                    <div style={{ margin: "10px" }}>
                      <Button onClick={btnn}>submit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ReplacePolicyEdit;
