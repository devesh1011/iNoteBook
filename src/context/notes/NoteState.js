import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    // Get all notes
    const getNotes = async () => {
        // API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyYzJlYjMwZWRmMjVmYTViYTBjZDdiIn0sImlhdCI6MTY4MDYxNzIwM30.v2POLpnVNfzqnsaNdCyIkThpFUImLyluis0-SHY40l8"
            },
        });

        const json = await response.json()

        setNotes(json)
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyYzJlYjMwZWRmMjVmYTViYTBjZDdiIn0sImlhdCI6MTY4MDYxNzIwM30.v2POLpnVNfzqnsaNdCyIkThpFUImLyluis0-SHY40l8"
            },
            body: JSON.stringify({title, description, tag})
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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyYzJlYjMwZWRmMjVmYTViYTBjZDdiIn0sImlhdCI6MTY4MDYxNzIwM30.v2POLpnVNfzqnsaNdCyIkThpFUImLyluis0-SHY40l8"
            },
        });

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
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQyYzJlYjMwZWRmMjVmYTViYTBjZDdiIn0sImlhdCI6MTY4MDYxNzIwM30.v2POLpnVNfzqnsaNdCyIkThpFUImLyluis0-SHY40l8"
            },
            body: JSON.stringify({title, description, tag})
        });

        const json = await response.json();     

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