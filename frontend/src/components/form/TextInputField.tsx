import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Form } from "react-bootstrap";

//[x: string]: any allows to pass any other that not define below
interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
    
}

const TextInputField = ({name, label, register, RegisterOptions, error, ...props}: TextInputFieldProps) => {
    return (
        <Form.Group className="mb-3" controlId={name + "-input"}>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
            {...props}
            {...register(name, RegisterOptions)}
            isInvalid={!!error}
            />
            <Form.Control.Feedback type="invalid">
                {error?.message}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default TextInputField;