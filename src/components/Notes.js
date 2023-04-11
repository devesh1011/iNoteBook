import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem'
import AddNote from './AddNote';

const Notes = (props) => {
	const context = useContext(noteContext);
	const { notes, getNotes, editNote } = context;
	useEffect(() => {
		getNotes()
		// eslint-disable-next-line
	}, [])

	const ref = useRef(null)
	const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

	const updateNote = (note) => {
		ref.current.click();

		setNote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag })
	}

	const handleEditNote = (e) => {
		e.preventDefault();
		editNote(note.id, note.etitle, note.edescription, note.etag)
	}

	const onchange = (e) => {
		setNote({
			...note, [e.target.name]: e.target.value
		})
	}

	return (
		<>
			<AddNote />
			<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
				Launch demo modal
			</button>
			<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-etitle fs-5" id="exampleModalLabel">Edit Note</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="etitle" className="form-label">etitle</label>
									<input type="text" value={note.etitle} minLength={5} className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onchange} required />
								</div>
								<div className="mb-3">
									<label htmlFor="edescription" className="form-label">etitle</label>
									<input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={onchange} minLength={10} required />
								</div>
								<div className="mb-3">
									<label htmlFor="etag" className="form-label">etag</label>
									<input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={onchange} minLength={3} />
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary">Close</button>
							<button type="button" className="btn btn-primary" onClick={handleEditNote} data-bs-dismiss="modal">Update changes</button>
						</div>
					</div>
				</div>
			</div>
			<h1>See your Notes</h1>
			{notes.length === 0 && 'No notes to display'}
			<div className='row'>
				{
					notes.map((note) => {
						return (
							<NoteItem key={note._id} updateNote={updateNote} note={note} />
						)
					})
				}
			</div>
		</>
	)
}

export default Notes
