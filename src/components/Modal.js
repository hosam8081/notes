const Modal = ({text, title, submitForm}) => {

  return (
    <div
      className="modal fade"
      id="exampleModal3"
      tabIndex="-2"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-backdrop="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{text}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submitForm}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
