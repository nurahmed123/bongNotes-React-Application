import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"

export default function Noteitem(props) {
    const NotesItem__CSS = {
        cursor: "pointer",
        fontSize: "20px"
    }

    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    if (note._id === null) {
        console.log("null id")
    }

    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fas fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }} style={NotesItem__CSS}></i>
                        <i className="fas fa-edit mx-2" onClick={() => { updateNote(note) }} style={NotesItem__CSS}></i>
                    </div>
                </div>
            </div>
        </>
    )
}