import React, { useContext, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import ModelForm from "../components/ModelForm";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const {
    notes,
    getNotes,
    deleteNote,
    AddNote,
    updateNote,
    getUser,
    setGetID,
    getID,
    loading
  } = useContext(AppContext);
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Modal
        text="Do you want to Delete this note"
        title="Delete Note"
        submitForm={() => deleteNote(getID)}
      />
      <ModelForm
        idModel="exampleModal"
        text="add Note"
        submitForm={(e) => AddNote(e)}
      />
      <ModelForm
        idModel="exampleModal1"
        text="edit Note"
        submitForm={(e) => updateNote(e)}
      />
      <div className="container my-5">
        <div className="col-md-12 ms-auto text-end">
          <button
            type="button"
            className="add p-2 btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add New
          </button>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {loading ? <Loading /> : notes ?
            notes.map((note) => {
              const { desc, title, _id: id } = note;
              return (
                <div className="col-md-4 my-4" key={id}>
                  <div className="note p-4">
                    <div className="d-flex justify-content-between">
                      <h3 className="float-left">{title} </h3>
                      <div>
                        <button
                          className="edit"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal3"
                          onClick={() => setGetID(id)}
                        >
                          <FaTrash />
                        </button>
                        <button
                          type="button"
                          className="edit"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal1"
                          onClick={() => getUser(id)}
                        >
                          <FaEdit />
                        </button>
                        {/* <button
                          type="button"
                          class="edit"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal3"
                          onClick={() => {
                            setGetID(id);
                            showModal("do you want to delete this note", () =>
                              deleteNote(id)
                            );
                          }}
                        >
                          <FaTrash />
                        </button> */}
                      </div>
                    </div>
                    <p>{desc}</p>
                  </div>
                </div>
              );
            }) : "user notes not found"}
        </div>
      </div>
    </>
  );
};

export default Home;
