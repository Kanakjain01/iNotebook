import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:4000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGIyMmQ0YjllNDM3NjE5NzY1Nzc0In0sImlhdCI6MTY4NDA1ODY5NX0.6w3HNh4Qjm_BUtO2k-OewxLCKl__yLwDVFWFVvPP-Wk",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //TODO: API Call
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGIyMmQ0YjllNDM3NjE5NzY1Nzc0In0sImlhdCI6MTY4NDA1ODY5NX0.6w3HNh4Qjm_BUtO2k-OewxLCKl__yLwDVFWFVvPP-Wk",
      },

      body: JSON.stringify({ title, description, tag }),
    });

    console.log("Adding a new note");
    const note = {
      _id: "6346b3b93b1503f0387276fd3",
      user: "6460b22d4b9e437619765775",
      title: title,
      description: description,
      tag: tag,
      date: "2023-05-22T09:53:23.969Z",
      __v: 0,
    };
    setNotes(notes.concat(note)); // concat return an array whereas push update an array
  };

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGIyMmQ0YjllNDM3NjE5NzY1Nzc0In0sImlhdCI6MTY4NDA1ODY5NX0.6w3HNh4Qjm_BUtO2k-OewxLCKl__yLwDVFWFVvPP-Wk",
      },
    });
    const json = response.json();
    console.log(json);
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MGIyMmQ0YjllNDM3NjE5NzY1Nzc0In0sImlhdCI6MTY4NDA1ODY5NX0.6w3HNh4Qjm_BUtO2k-OewxLCKl__yLwDVFWFVvPP-Wk",
      },

      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
