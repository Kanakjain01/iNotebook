import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
 const notesInitial = [
    {
      "_id": "646b3b93b1503f0387276fd3",
      "user": "6460b22d4b9e437619765774",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2023-05-22T09:53:23.969Z",
      "__v": 0
    },
    {
      "_id": "646b3becb1503f0387276fd5",
      "user": "6460b22d4b9e437619765774",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2023-05-22T09:54:52.690Z",
      "__v": 0
    }
  ]
  const [notes, setNotes] = useState(notesInitial)
  return (
    <NoteContext.Provider value={{notes, setNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
