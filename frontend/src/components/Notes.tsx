import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css"
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/notes";
import { formatDate } from "../utils/formateDate";
import {MdDelete} from "react-icons/md";

interface NoteProps {
    note: NoteModel,
    onNoteClicked: (note: NoteModel)=> void,
    onDeleteNoteClicked: (note: NoteModel) => void,
    className?: string,
}

//individual note card in frontend display
const Note = ({note, className, onNoteClicked, onDeleteNoteClicked}: NoteProps) => {
    //unpack note property
    const {
        title,
        text,
        createdAt,
        updatedAt,
    } = note;

    let createdUpdatedText:string ;
    if (updatedAt >  createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }

    return (
        <Card className={`${styles.noteCard} ${className}`}
            onClick={()=>{onNoteClicked(note)}}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete 
                    className="text-muted ms-auto"
                    onClick={(e)=> {
                        onDeleteNoteClicked(note);
                        e.stopPropagation();
                    }}/>
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                    {createdUpdatedText}
                </Card.Footer>
        </Card>
    )
}

export default Note;