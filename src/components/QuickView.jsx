import React from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";

function QuickView(props) {
  return (
    <div>
      <Modal
        show={mainModalState?.transporter}
        onHide={() => setModalState("transporter", false)}
        centered
      >
        <Modal.Header
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Modal.Title>Transporter</Modal.Title>
          <Button
            onClick={() => setModalState("transporter", false)}
            variant="outline-light"
          >
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          {/*  */}
          <div className="row p-1">
            <div className="col-md-6">Code</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                type="text"
                name="transporter_code"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.transporter_code}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Name</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="transportar_name"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.transportar_name}
              />
            </div>
          </div>
          <div className="row p-1">
            <div className="col-md-6">Gst number</div>
            <div className="col-md-6">
              <input
                className="form-control form-control w-100"
                placeholder="002"
                type="text"
                name="transportar_gst_number"
                onChange={(e) => handleInputChange(e)}
                value={mainState.selected.transportar_gst_number}
              />
            </div>
          </div>
          {/*  */}
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#71869d",
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button type="button" variant="outline-light">
            Save
          </Button>
          <Button type="button" variant="outline-light">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default QuickView;
