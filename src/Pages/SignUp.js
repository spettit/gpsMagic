import React from 'react'
import {signUp} from '../firebase/auth'
// import MapContext from '../MapContext'


let SignUp = () => {
    // const { dispatch } = useContext(MapContext)
    const handleSignUp = (event) => {
        event.preventDefault()
        const { email, password, first_name, last_name } = event.target.elements
        signUp(email.value, password.value, first_name.value, last_name.value)
    }
    return (
        <div>
            <div className="Top-spacer"></div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
            <div>
            <label>Email
                <input name="email" type="email" placeholder="email" required/>
            </label>
            </div>
            <div>
            <label>Password
                <input name="password" type="text" placeholder="password" required/>
            </label>
            </div>
            <div>
            <label>First Name
                <input name="first_name" type="text" placeholder="first name" required/>
            </label>
            </div>
            <div>
            <label>Last Name
                <input name="last_name" type="text" placeholder="last name" required/>
            </label>
            </div>
            <button type="submit">Submit</button>
        </form>

    </div>
    )
    
    
}

export default SignUp