import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Contact from './components/Contact'
import Notes from './components/Notes'
import NavBar from './components/NavBar';
import NoteState from './context/notes/NoteState';
import Login from './components/LoginSystem/login/Login';
import SignUp from './components/LoginSystem/signup/Signup';
import Dictionary from './components/Dictionary/Dictionary'

function App() {

  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <div className="container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/dictionary">
              <Dictionary />
            </Route>
            <Route exact path="/contactus">
              <Contact />
            </Route>
            <Route exact path="/notes">
              <Notes />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
