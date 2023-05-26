import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "646b3b93b1503f0387276fd3",
      user: "6460b22d4b9e437619765774",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-05-22T09:53:23.969Z",
      __v: 0,
    },
    {
      _id: "646b3becb1503f0387276fd5",
      user: "6460b22d4b9e437619765774",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-05-22T09:54:52.690Z",
      __v: 0,
    },
    {
      _id: "6146b3b93b1503f0387276fd3",
      user: "6460b22d4b9e437619765774",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-05-22T09:53:23.969Z",
      __v: 0,
    },
    {
      _id: "6246b3b93b1503f0387276fd3",
      user: "6460b22d4b9e437619765774",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-05-22T09:53:23.969Z",
      __v: 0,
    },
    {
      _id: "6346b3b93b1503f0387276fd3",
      user: "6460b22d4b9e437619765774",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-05-22T09:53:23.969Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);

  //Add a Note
  const addNote = (title, description, tag) => {
    //TODO: API Call
    console.log("Adding a new note")
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
  const deleteNote = () => {};
  //Edit a Note
  const editNote = () => {};

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
