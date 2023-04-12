import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    // Get all notes
    const getNotes = async () => {
        console.log("authToken", localStorage.getItem("mytoken"));
        // API call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('mytoken')
            },
        });

        console.log("Response status:", response.status);

        const json = await response.json()
        console.log("Received data:", json);

        setNotes(json)
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('mytoken')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {
        console.log(id)
        // API Call
        const response = await fetch(`${host}/api/notes/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('mytoken')
            },
        });

        const json = await response.json();
        console.log(json)

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })
        setNotes(newNotes);
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('mytoken')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json();
        console.log(json)

        const newNote = notes.filter((note) => {
            if (note._id === id) {
                note.title = title;
                note.description = description;
                note.tag = tag;
            }

            return note;
        })
        setNotes(newNote);
        getNotes();
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;