import React, {useContext} from 'react'
import {signIn} from '../firebase/auth'
// import MapContext from '../MapContext'


let SignIn = () => {
    // const { dispatch } = useContext(MapContext)
    const handleSignIn = (event) => {
        event.preventDefault()
        const { email, password } = event.target.elements
        signIn(email.value, password.value)
    }
    return (
        <div>
        <h1>Log In</h1>
        <form onSubmit={handleSignIn}>
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

export default SignIn