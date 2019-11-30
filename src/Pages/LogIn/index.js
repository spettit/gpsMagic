import React from "react";
import { signIn } from "../../firebase/auth";
// import MapContext from '../MapContext'

let SignIn = () => {
  // const { dispatch } = useContext(MapContext)
  const handleSignIn = event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signIn(email.value, password.value);
  };
  return (
    <div className="container">
        <div className="top-spacer"></div>
      <h1>Log In</h1>
      <form onSubmit={handleSignIn}>
          <div>
          <label>
          Email
          <input name="email" type="email" placeholder="email" />
        </label>
          </div>
        <div>
        <label>
          Password
          <input name="password" type="text" placeholder="password" />
        </label>
        </div>
        
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default SignIn;
