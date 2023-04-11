import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);

        setNote({title: "", description: "", tag: ""})
    }

    const onchange = (e) => {
        setNote({
            ...note, [e.target.name]: e.target.value
        })
    }

    return (                                            
        <div className='my-3'>
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange} minLength={5} required value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Title</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onchange} minLength={10} required value={note.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onchange} minLength={3} value={note.tag}/>
                </div>
                <button disabled={note.title<5 || note.description<10} type="submit" className="btn btn-primary" onClick={handleAddNote}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
