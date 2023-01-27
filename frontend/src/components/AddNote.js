import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"

export default function AddNote() {

    const context = useContext(noteContext);
    const { addNote, showAlert } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const newNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        showAlert("Note has been added.", "success");
        setNote({ title: "", description: "", tag: "" });
    }

    const notes__value = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h1>Add notes</h1>
            <form action="">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="titleHelp" onChange={notes__value} value={note.title} />
                    {1 <= note.title.length && note.title.length < 2 ? <div id="emailHelp" className="form-text text-danger">Title must 2 characters</div> : ""}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" name="description" id="description" cols="15" rows="5" onChange={notes__value} value={note.description} ></textarea>
                    {1 <= note.description.length && note.description.length < 2 ? <div id="emailHelp" className="form-text text-danger">Description must 2 characters</div> : ""}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" aria-describedby="tagHelp" onChange={notes__value} value={note.tag} />
                </div>

                <button type="submit" disabled={note.title.length < 2 || note.description.length < 2} onClick={newNote} className="btn btn-success">Add notes</button>
            </form>
        </>
    )
}
