import React from 'react'
import {signUp} from '../firebase/auth'
// import MapContext from '../MapContext'


let SignUp = () => {
    // const { dispatch } = useContext(MapContext)
    const handleSignUp = (event) => {
        event.preventDefault()
        const { email, password } = event.target.elements
        signUp(email.value, password.value)
    }
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