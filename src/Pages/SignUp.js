import React from 'react'
import firebase from 'firebase/app'

const handleSignUp = (event) => {
    event.preventDefault()
    const { email, password } = event.target.elements
    console.log(email.value, password.value)
    try {
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    }
    catch(error) {
        alert(error)
    }
}

let SignUp = () => {
    return (
        <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
            <label>Email
                <input name="email" type="email" placeholder="email" />
            </label>
            <label>Password
                <input name="password" type="text" placeholder="paswword" />
            </label>
            <button type="submit">Submit</button>
        </form>

    </div>
    )
    
    
}

export default SignUp