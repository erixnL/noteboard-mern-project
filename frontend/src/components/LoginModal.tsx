import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/notes_api";
import * as NoteApi from "../network/notes_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

interface LoginModalProps {
    onDismiss: () => void,
    onLogInSuccessful: (user: User) => void,
}

const LoginModal = ({onDismiss, onLogInSuccessful}: LoginModalProps) => {
    const { register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>();
    async function onSubmit(credentials:LoginCredentials) {
        try {
            const user = await NoteApi.login(credentials);
            onLogInSuccessful(user);
        } catch(error){
            console.error(error);
        }
    }
    return ( 
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField 
                    name="username"
                    label="Username"
                    type="text"
                    placeholder="username"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.username}/>
                    <TextInputField 
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="password"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.password}/>
                    <Button type="submit" disabled={isSubmitting}
                    className={styleUtils.width100}>
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
     );
}
 
export default LoginModal;