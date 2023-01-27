import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import { useHistory } from 'react-router-dom';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

export default function Notes() {
    const context = useContext(noteContext);
    const history = useHistory();
    const { notes, getNotes, editNote, showAlert } = context;
    const [note, setNote] = useState({ id: "", updateTitle: "", updateDescription: "", updateTag: "" })

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            getNotes()
        } else {
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, updateTitle: currentNote.title, updateDescription: currentNote.description, updateTag: currentNote.tag })
    }

    const update__notes__value = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    const updateNoteHandling = () => {
        editNote(note.id, note.updateTitle, note.updateDescription, note.updateTag)
        refClose.current.click();
        showAlert("Note has been updated", "success")
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    return (
        <>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="updateTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="updateTitle" name="updateTitle" value={note.updateTitle} aria-describedby="updateTitleHelp" onChange={update__notes__value} />
                                    {note.updateTitle.length < 2 ? <div id="emailHelp" className="form-text text-danger">Title must 2 characters</div> : ""}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="updateDescription" className="form-label">Description</label>
                                    <textarea className="form-control" name="updateDescription" value={note.updateDescription} id="updateDescription" cols="15" rows="5" onChange={update__notes__value}></textarea>
                                    {note.updateDescription.length < 2 ? <div id="emailHelp" className="form-text text-danger">Description must 2 characters</div> : ""}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="updateTag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="updateTag" name="updateTag" value={note.updateTag} aria-describedby="tagHelp" onChange={update__notes__value} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" disabled={note.updateTitle.length < 2 || note.updateDescription.length < 2} onClick={updateNoteHandling} className="btn btn-success">Save changes</button>
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            <AddNote />
            <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container">
                    {notes.length === 0 && <span className="fs-4">No notes found.</span>}
                </div>
                {
                    notes.map((note) => {
                        return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                    })
                }
            </div>
        </>
    )
}