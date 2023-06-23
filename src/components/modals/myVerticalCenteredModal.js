const { Modal, Button, CloseButton, Col } = require("react-bootstrap");

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        style={{ backgroundColor: "#71869d", paddingTop: 5, paddingBottom: 5 }}
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
        <Button variant="outline-light" onClick={props.onHide}>
          X
        </Button>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <div className="row">
          <div className="col-md-3">Name</div>
          <div className="col-md-3 d-flex">
            <input type="text" style={{ width: "100%" }}></input>
            <i
              data-toggle="modal"
              data-target="#popup-modal"
              className="fa fa-pencil-square"
              style={{ fontSize: 30 }}
            ></i>
          </div>
          <div className="col-md-3">Name</div>
          <div className="col-md-3">
            <input type="text" style={{ width: "100%" }}></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">Name</div>
          <div className="col-md-3 d-flex">
            <input type="text" style={{ width: "100%" }}></input>
          </div>
          <div className="col-md-3">Name</div>
          <div className="col-md-3">
            <input type="text" style={{ width: "100%" }}></input>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "cornflowerblue",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <Button onClick={props.onHide} variant="outline-light" color="danger">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { MyVerticallyCenteredModal };
