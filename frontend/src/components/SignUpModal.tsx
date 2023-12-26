import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { SignUpCredentials } from "../network/notes_api";
import * as NoteApi from "../network/notes_api";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";

interface SignUpModalProps {
    onDismiss: ()=> void,
    onSignUpSuccessful: (user: User) => void,
}

const SignUpModal = ({onDismiss, onSignUpSuccessful}: SignUpModalProps) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignUpCredentials>();
    async function onSubmit(credentials: SignUpCredentials) {
        try {
            const newUser = await NoteApi.signUp(credentials);
            onSignUpSuccessful(newUser);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Sign Up
                </Modal.Title>
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
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="email"
                    register={register}
                    registerOptions={{required: "Required"}}
                    error={errors.email}/>
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
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
 
export default SignUpModal;