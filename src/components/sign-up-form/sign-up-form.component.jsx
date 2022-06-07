import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { Button } from "../button/button.component"
import { FormInput } from "../form-input/form-input.component"
import "./sign-up-form.styles.scss"


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}


export const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwors do not match")
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields()
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use")
            }
            console.table("User creation encountered an error", error);
        }
    }

    const handleChane = event => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required onChange={handleChane} value={displayName} name="DisplayName" />
                <FormInput label="Email" type="email" required onChange={handleChane} value={email} name="email" />
                <FormInput label="Password" type="password" required onChange={handleChane} value={password} name="password" />
                <FormInput label="Confirm Password" type="password" required onChange={handleChane} value={confirmPassword} name="confirmPassword" />
                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
