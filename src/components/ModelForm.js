import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ModelForm = ({submitForm, idModel, text}) => {
  const { userNote, addUserNote } =
  useContext(AppContext);
  return (
    <div
    className="modal fade"
    id={idModel}
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <form id="add-form" onSubmit={submitForm}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              onChange={(e) => addUserNote(e)}
              placeholder="Type Title"
              name="title"
              className="form-control"
              type="text"
              value={userNote.title}
            />
            <textarea
              onChange={(e) => addUserNote(e)}
              className="form-control my-2"
              placeholder="Type your note"
              name="desc"
              id=""
              cols="30"
              rows="10"
              value={userNote.desc}

            ></textarea>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Close
            </button>
            <button
              data-bs-dismiss="modal"
              type="submit"
              className="btn btn-info"
            >
              <i className="fas fa-plus-circle"></i> {text}
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  )
}

export default ModelForm