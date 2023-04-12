import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
	const context = useContext(noteContext);
	const { deleteNote } = context;
	const { note, updateNote } = props;

	const handleDelete = () => {
		let wantToDelete = window.confirm("Are you sure you want to delete? ")
		console.log(wantToDelete)
		if (wantToDelete) {
			deleteNote(note._id);
			props.showAlert("Note has been successfully deleted", "success")
		}
	}

	return (
		<>
			<div className='col col-lg-4 col-md-6 col-sm-12'>
				<div className="card my-3 shadow">
					<div className="card-body">
						<h5 className="card-title">{note.title}</h5>
						<p className="card-text">{note.description}</p>
						<div className="container-fluid">
							<button className="btn btn-danger me-lg-2 me-md-2" onClick={handleDelete}>Delete</button>
							<button className="btn btn-primary" onClick={() => {
								updateNote(note)
							}}>Edit</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NoteItem
