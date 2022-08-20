import React, { useState, useContext, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [notes, setNotes] = useState([]);
  const [getID, setGetID] = useState("");
  const [testID, setTestID] = useState("");
  const [loading, setLoading] = useState(true);

  let token = localStorage.getItem("token");
  let api = `https://route-egypt-api.herokuapp.com/`;
  if (token) {
    var decode = jwtDecode(token);
  }

  const [userNote, setUserNote] = useState({
    title: "",
    desc: "",
    token,
    userID: "",
  });

  // GETNotes : fetch to get all notes from api
  const getNotes = async () => {
    setLoading(true);
    let { data } = await axios.get(api + "getUserNotes", {
      headers: {
        Token: token,
        userID: decode._id,
      },
    });
    setNotes(data.Notes);
    setLoading(false);
  };

  // ADDNote : note note to API
  const addUserNote = (e) => {
    setUserNote({
      ...userNote,
      [e.target.name]: e.target.value,
      userID: decode._id,
    });
  };
  const AddNote = async (e) => {
    e.preventDefault();
    let { data } = await axios.post(api + "addNote", userNote);
    if (data.message == "success") {
      getNotes();
    }
  };

  // Delete
  const deleteNote = async (id) => {
    let { data } = await axios.delete(api + "deleteNote", {
      data: {
        NoteID: id,
        token,
      },
    });
    if (data.message == "deleted") {
      getNotes();
    }
  };

  // Update Notes
  const getUser = (id) => {
    let targetNote = notes.filter((note) => note._id == id);
    setUserNote({
      ...userNote,
      title: targetNote[0].title,
      desc: targetNote[0].desc,
      NoteID: targetNote[0]._id,
    });
    setTestID(id);
    //setUserNote({ ...userNote, 'title': notes[0].title, "desc": notes[0].desc, NoteID: notes[0]._id })
  };
  const updateNote = async (e) => {
    e.preventDefault();
    //   let test = notes.map((note) =>
    //   note._id == testID
    //     ? { ...note, title: userNote.title, desc: userNote.desc, token }
    //     : note
    // );
    // setNotes(test);
    let { data } = await axios.put(api + "updateNote", userNote);
    getNotes();

    if (data.message == "updated") {
      getNotes();
    }
  };

  return (
    <AppContext.Provider
      value={{
        setIsLogged,
        isLogged,
        getNotes,
        notes,
        deleteNote,
        addUserNote,
        AddNote,
        userNote,
        updateNote,
        getUser,
        setGetID,
        getID,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
