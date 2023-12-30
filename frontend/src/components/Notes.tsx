import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css"
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/notes";
import { formatDate } from "../utils/formateDate";
import {MdDelete} from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { useState } from "react";

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

    const [isCardChecked, setIsCardChecked] = useState(false);
    const [isImportant, setisImportant] = useState(false);

    const cardChecked = () => {
    setIsCardChecked(!isCardChecked);
    };

    const cardImportant = () => {
        setisImportant(!isImportant);
    }


    return (
        <Card className={`${isCardChecked ? styles.cardChecked : styles.noteCard} ${isImportant ? styles.cardImportant : ''} ${className}`}
            onClick={()=>{onNoteClicked(note)}}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                <CiCircleCheck
                        className="text-muted"
                        onClick={(e) => {
                            cardChecked();
                            e.stopPropagation();
                        }}
                        />
                <MdOutlineNotificationImportant className="text-muted"
                onClick={(e)=> {
                    cardImportant();
                    e.stopPropagation();
                }}/>
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