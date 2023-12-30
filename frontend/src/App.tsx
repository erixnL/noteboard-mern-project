import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { User } from "./models/user";
import * as NotesApi from "./network/notes_api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./styles/App.module.css"

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
      <BrowserRouter>
          <div>
              <NavBar loggedInUser={loggedInUser}
              onSignUpClicked={()=> setShowSignUpModal(true)}
              onLogInClicked={()=> setShowLogInModal(true)}
              onLogOutSuccessful={()=> setLoggedInUser(null)}/>

              <Container className={styles.pageContainer}>
                  <Routes>
                      <Route path="/" element={<NotesPage loggedInUser={loggedInUser}/>}/>
                      <Route path="privacy" element={<PrivacyPage />}/>
                      <Route path="/*" element={<NotFoundPage/>} />
                  </Routes>
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
                <footer className={styles.footer}>
                      <div>
                          <a href="https://github.com/erixnL/noteboard-mern-project">Github repo</a>
                      </div>      
                </footer>
          </div>
      </BrowserRouter>
    );
}

export default App;
