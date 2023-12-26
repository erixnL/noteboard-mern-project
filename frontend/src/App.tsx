import {useState, useEffect} from "react";
import {Button, Col, Container, Row, Spinner} from "react-bootstrap";
import {Note as NoteModel} from "./models/notes";
import Note from './components/Notes';
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import {FaPlus} from "react-icons/fa";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [notesLoading, setNotesLoading] = useState(true);

  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel|null>(null);

  useEffect(()=> {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);

        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch(error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }
    loadNotes();
  }, [])

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter(existingNotes => existingNotes._id !== note._id))
    } catch(error) {
      console.error(error);
    }
  }

  const  notesGrid =     
            <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
                  
              {notes.map(note=> (
                <Col key={note._id}>
                  <Note 
                  note={note} className={styles.note} 
                  onDeleteNoteClicked={deleteNote}
                  onNoteClicked={setNoteToEdit}/>
                </Col>
                
              ))}
            </Row>
  return (
    <div>
      <NavBar loggedInUser={null}
      onSignUpClicked={()=> {}}
      onLogInClicked={()=> {}}
      onLogOutSuccessful={()=>{}}/>
    
      <Container className="styles.notesPage">
        <Button className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
        onClick={()=> setShowAddNoteDialog(true)}>
          <FaPlus />
          Add mew note
        </Button>

        {notesLoading && <Spinner animation="border" variant="primary"/>}
        {showNotesLoadingError && <p>Something went wrong. Please refresh the page.</p>}
        {!notesLoading && !showNotesLoadingError &&
            <>
              { notes.length > 0
                ? notesGrid
                : <p>You don't have any notes yet</p>
              }
            </>
        }

        { showAddNoteDialog && 
          <AddEditNoteDialog
          onDismiss={()=> setShowAddNoteDialog(false)}
          onNoteSaved={(newNote)=> {
            setNotes([...notes, newNote])
            setShowAddNoteDialog(false)}} />
        }
        {
          noteToEdit &&
          <AddEditNoteDialog 
          noteToEdited={noteToEdit}
          onDismiss={()=> setNoteToEdit(null)}
          onNoteSaved={(updatedNote)=> {
            setNoteToEdit(null);
            setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote : existingNote));
          }}/>
        }
        {
          false && 
          <SignUpModal
          onDismiss={()=> {}}
          onSignUpSuccessful={()=> {}}/>

        }
        {
          false && 
          <LoginModal
          onDismiss={()=> {}}
          onLogInSuccessful={()=> {}}/>

        }
      </Container>
    </div>
  );
}

export default App;
