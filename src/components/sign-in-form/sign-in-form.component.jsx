import { useState } from "react";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
    email: "",
    password: "",
};

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    const resertFormField = () => {
        setFormFields(defaultFormFields);
    };
    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            
            resertFormField();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("cannot create user, email already in use");
            }
            console.log("user creation encountered an error", error.message);
        }
    };
    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Sign In</Button>
                <Button type="button" onClick={signInWithGoogle}>Google sign in</Button>
            </form>
        </div>
    );
};

export default SignInForm;
