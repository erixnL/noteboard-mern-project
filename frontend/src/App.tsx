import { Container} from "react-bootstrap";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

function App() {

    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLogInModal, setShowLogInModal] = useState(false);

    useEffect(()=> {
        async function fetchLoggedInUser() {
          try {
            const user = await NotesApi.getLoggedInUser();
            setLoggedInUser(user);
          } catch(error) {
            console.error(error);
          }
        }
        fetchLoggedInUser();
    })
    return (
      <div>
        <NavBar loggedInUser={loggedInUser}
        onSignUpClicked={()=> setShowSignUpModal(true)}
        onLogInClicked={()=> setShowLogInModal(true)}
        onLogOutSuccessful={()=> setLoggedInUser(null)}/>
      
        <Container className="styles.notesPage">
          <>
          {
             loggedInUser
             ? <NotesPageLoggedInView/>
             : <NotesPageLoggedOutView />
          }
          </>
        </Container>
        {
            showSignUpModal && 
            <SignUpModal
            onDismiss={()=> setShowSignUpModal(false)}
            onSignUpSuccessful={(user)=> {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}/>
          }
          {
            showLogInModal && 
            <LoginModal
            onDismiss={()=> setShowLogInModal(false)}
            onLogInSuccessful={(user)=> {
              setLoggedInUser(user);
              setShowLogInModal(false);
            }}/>

          }
      </div>
    );
}

export default App;
