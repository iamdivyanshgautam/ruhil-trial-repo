import { useState } from "react";
import API from "../api";


function AuthPage({ onLogin }){
    const [userExist, setUserExist] = useState(true);
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    async function handleSubmit(e){
             e.preventDefault();
             const route = userExist? "/auth/login":"/auth/register";
             await API.post(route, {username, password});
             if(userExist) onLogin();
             // onLogin={() => setIsLoggedIn(true)} (prop from the App.jsx)
             else{
                alert("registered successfully");
                setUserExist(true);
             }

    };

    return (
      <div className="auth-container">
        <div className="auth-toggle">
          <button
            onClick={() => setUserExist(!userExist)}
            className="toggle-btn"
          >
            {userExist
              ? "Don't have an account? Sign up here"
              : "Already have an account? Sign in here"}
          </button>
        </div>

        <div className={`form-box ${userExist ? "login" : "register"}`}>
          <h2 className="form-title">{userExist ? "Login" : "Register"}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <input
              className="auth-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="auth-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="submit-btn">
              {userExist ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    );
}

export default AuthPage;