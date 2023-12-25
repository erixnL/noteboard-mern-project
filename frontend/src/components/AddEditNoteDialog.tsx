import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../models/notes";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";


//add a way to close the dialog
interface AddEditNoteDialogProps {
    noteToEdited?: Note,
    onDismiss: ()=> void,
    onNoteSaved: (note: Note) => void,
}

const AddNoteDialog = ({noteToEdited, onDismiss, onNoteSaved}: AddEditNoteDialogProps) => {
    //if the noteToEditted title is undefined, this means adding a new note
    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdited?.title || "",
            text: noteToEdited?.text || "",
        }
    }
    );

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: Note;

            if (noteToEdited) {
                noteResponse = await NotesApi.updateNote(noteToEdited._id, input);
            } else {
                noteResponse = await NotesApi.createNote(input);
            }
            onNoteSaved(noteResponse);

        } catch(error) {
            console.log(error);
        }     
    }
    //errors object in return block is from react hook form
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {noteToEdited ? "Edit note" : "Add note"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                        type="text" placeholder="Title"
                        isInvalid={!!errors.title}
                        {...register("title", { required: "Required"})}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control 
                        as="textarea"
                        rows={5} placeholder="Text"
                        {...register("text")}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" form="addEditNoteForm"
                disabled={isSubmitting}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
 
export default AddNoteDialog;