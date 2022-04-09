import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import NavBar from './components/NavBar';
import NoteState from './context/notes/NoteState';
import Login from './components/LoginSystem/login/Login';
import SignUp from './components/LoginSystem/signup/Signup';

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
            <Route exact path="/about">
              <About />
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
