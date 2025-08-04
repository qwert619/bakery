import { useState } from "react";
import "../App.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    return (
    <div className="auth">
        <Login />
        <Register />
    </div>
)

};

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3001/auth/login", {username, password});
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Login failed. Please try again.");
        }
    }

    return (<Form username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        label="Login" 
        onSubmit={onSubmit}/>);  
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const res = await axios.post("http://localhost:3001/auth/register", {username, password});
            alert(res.data.message);
        } catch (err) {
            console.error(err);
            alert("Registration failed. Please try again.");
        }
    }

    
    return (<Form username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        label="Register"
        onSubmit={onSubmit} />);
};

const Form = ({username, setUsername, password, setPassword, label, onSubmit}) => {
    return(
         
    <div className="auth-container">
            <h1>{label}</h1>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="username"> Username: </label>
                <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password"> Password: </label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <button  type="submit">{label}</button>
        </form>
    </div>)
}