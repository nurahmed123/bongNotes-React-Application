import NoteContext from "./noteContext";
import { useState } from "react";
import Alert from "../../components/Alert";

const NoteState = (props) => {
    const host = "http://localhost:300";
    const notesInitial = [];
    // const authToken = localStorage.getItem("authToken")

    const [alert, setAlert] = useState(null)

    setTimeout(() => {
        setAlert(null)
    }, 3000);

    const showAlert = (message, status) => {
        setAlert({
            message: message,
            status: status
        })
    }

    const [notes, setNotes] = useState(notesInitial)

    //TODO: Get all notes
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "authToken": localStorage.getItem("authToken")
            }
        });
        const json = await response.json()
        setNotes(json)
    }


    //TODO: Add a note
    const addNote = async (title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem("authToken")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }


    //TODO: Delete a Note
    const deleteNote = async (id) => {
        // API Call
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "authToken": localStorage.getItem("authToken")
            }
        });

        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
        showAlert("Note has been deleted successfully.", "success");
    }


    //TODO: Edit a note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem("authToken")
            },
            body: JSON.stringify({ title, description, tag })
        });

        //TODO: Update note
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let noteIndex = 0; noteIndex < newNotes.length; noteIndex++) {
            const noteId = newNotes[noteIndex];
            if (noteId._id === id) {
                newNotes[noteIndex].title = title
                newNotes[noteIndex].description = description
                newNotes[noteIndex].tag = tag
                break;
            }
        }
        setNotes(newNotes)

    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, alert, setAlert, showAlert, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
            <Alert alert={alert} />
        </NoteContext.Provider>

    )
}

export default NoteState;