import React, {useEffect, useState} from "react";
import axios from "axios";
import {Outlet, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import "../styling/login.css"
import ErrorMessagesFromServer from "./ErrorMessagesFromServer";

function Login() {

    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [form , setForm] = useState("login");
    const [errorCodeSignUp , setErrorCodeSignUp] = useState(0);
    const [errorCodeLogIn , setErrorCodeLogIn] = useState(0);
    const navigate = useNavigate();


    useEffect(()=>{

        const token = Cookies.get("token");
        if(token!==undefined){
            navigate("/dashboard/actions");
        }
    },[])

    const changeUserNameInputLogin=(e)=>{
        setUserName(e.target.value);
    }
    const changePassInputLogin=(e)=>{
        setPassword(e.target.value);
    }
    const changeUserNameInputSignUp=(e)=>{
        setUserName(e.target.value);
    }
    const changePassInputSignUp=(e)=>{
        setPassword(e.target.value);
    }
    const fromSignUpToLogin=(e)=>{
        setForm("login");
    }
    const fromLoginToSignUp=(e)=>{
        setForm("signup");
    }
    const loginBtn=(e)=> {

        e.preventDefault();

        axios.post("http://localhost:8989/login", null, {
            params: {
                username, password
            }
        }).then((res) => {
            if (res.data.success) {
                setErrorCodeLogIn(0)
                Cookies.set("token",res.data.user.token);
                navigate("/dashboard/actions")
            }
            else {
                setErrorCodeLogIn(res.data.errorCode)
            }
        })
    }
    const signUpBtn=(e)=>{

        e.preventDefault();

        axios.post("http://localhost:8989/sign-up",null,{
            params: {
                username:username,
                password:password
            }
        }).then((res)=>{
            if(res.data.success){
                setErrorCodeSignUp(0)
                alert("Successfully signed up");
                setForm("login")
            }
            else{
                setErrorCodeSignUp(res.data.errorCode)
            }
        })

    }

    const validUsernameSize=()=>{
        return username.length>=6;
    }

    const usernameContainsLetter=()=>{
        return /[a-zA-Z]/.test(username);
    }

    const validPassSize=()=>{
        return password.length>=8;
    }

    const passContainsCapitalLetter=()=>{
        return /[A-Z]/.test(password);
    }

    const passContainsSmallLetter=()=>{
         return /[a-z]/.test(password);
    }

    const passContainsDigit = ()=>{
        return /[0-9]/.test(password);
    }

    const freeButton=()=> {
        return !validUsernameSize() || !usernameContainsLetter() || !validPassSize() || !passContainsCapitalLetter()
               ||!passContainsSmallLetter() || !passContainsDigit()
    }

    return (

        <div className={"regContainer"}>
        <div className={"background_image"}/>
            {
                form === "login" ?
                    <div>
                        <form className={"styleForm"}>
                            <h1>Log In</h1>
                            <div className={"flex-input"}>
                                <label htmlFor={"text"}>username:</label>
                                <input placeholder={"Enter username..."} type={"text"} value={username}
                                       onChange={changeUserNameInputLogin}/>
                            </div>
                            <div className={"flex-input"}>
                                <label htmlFor={"password"}>password:</label>
                                <input placeholder={"********"} type={"password"} value={password}
                                       onChange={changePassInputLogin}/>
                            </div>
                            <button onClick={loginBtn} className={"submitBtn"}
                                    disabled={username === "" || password === ""}>Log In
                            </button>

                            <img className={"imgForm"} src={"./Images/loginpage_img.jpg"} alt={""}/>
                            <h2>Don't have an Account?</h2>
                            <div onClick={fromLoginToSignUp} className={"textChangeForm"}>Sign Up</div>

                            <ErrorMessagesFromServer message={errorCodeLogIn}/>

                        </form>
                    </div>
                    :
                    <div>
                        <form className={"styleForm"}>
                            <h1>Sign Up</h1>
                            <div className={"flex-input"}>
                                <label htmlFor={"text"}>username:</label>
                                <input placeholder={"Enter UserName..."} type={"text"} value={username}
                                       onChange={changeUserNameInputSignUp}/>
                            </div>
                            <div className={"div-conditions"}>
                                {
                                    validUsernameSize()?
                                        <div style={{color:"green"}}>V username must contains 6 characters at least</div>
                                        :
                                        <div style={{color:"red"}}>X username must contains 6 characters at least</div>
                                }
                                {
                                    usernameContainsLetter()?
                                        <div style={{color:"green"}}>V username must contains some letter</div>
                                        :
                                        <div style={{color:"red"}}>X username must contains some letter</div>
                                }
                            </div>
                            <div className={"flex-input"}>
                                <label htmlFor={"password"}>password:</label>
                                <input placeholder={"********"} type={"password"} value={password}
                                       onChange={changePassInputSignUp}/>
                            </div>

                            <div className={"div-conditions"}>

                                {
                                    validPassSize()?
                                        <div style={{color:"green"}}>V password must contains 8 characters at least</div>
                                        :
                                        <div style={{color:"red"}}>X password must contains 8 characters at least</div>
                                }

                                {
                                    passContainsCapitalLetter()?
                                        <div style={{color:"green"}}>V password must contains Capital letter</div>
                                        :
                                        <div style={{color:"red"}}>X password must contains Capital letter</div>
                                }

                                {
                                    passContainsSmallLetter()?
                                        <div style={{color:"green"}}>V password must contains Lower letter</div>
                                        :
                                        <div style={{color:"red"}}>X password must contains Lower letter</div>
                                }

                                {
                                    passContainsDigit()?
                                        <div style={{color:"green"}}>V password must contains Digit</div>
                                        :
                                        <div style={{color:"red"}}>X password must contains Digit</div>
                                }

                            </div>
                            <button onClick={signUpBtn} className={"submitBtn"}
                                    disabled={freeButton()}>Sign Up
                            </button>

                            <img className={"imgForm"} src={"./Images/signup_img.jpg"} alt={""}/>
                            <h2>Already have an Account?</h2>
                            <div onClick={fromSignUpToLogin} className={"textChangeForm"}>Log In</div>

                            <ErrorMessagesFromServer message={errorCodeSignUp}/>

                        </form>
                    </div>
            }
            <Outlet/>
        </div>
    )
}
export default Login;
