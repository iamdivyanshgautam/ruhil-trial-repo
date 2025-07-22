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

    return(
        <div className="auth-container">
          <button onClick={()=> setUserExist(!userExist)} className="toggle">
            {userExist? "dont have an account, sign up here" : "already have a account, sign in here"}
          </button>  
          <div className={`form-box ${userExist? "login": "register"}`}>
            <h2>{userExist? "login" : "register"}</h2>
             <form onSubmit={handleSubmit}>
                <input placeholder="username" 
                       value={username} 
                       onChange={(e)=> setUsername(e.target.value)}
                       required
                />
                <input placeholder="password"
                       type="password"
                       value={password}
                       onChange={(e)=> setPassword(e.target.value)}
                       required
                />
                <button type="submit">{userExist? "login": "signup"}</button>
             </form>
          </div>
        </div>
    )
}

export default AuthPage;