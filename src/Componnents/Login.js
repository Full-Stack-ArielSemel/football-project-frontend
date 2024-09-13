import React, { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styling/login.css";
import ErrorMessagesFromServer from "./ErrorMessagesFromServer";
import {IoMdFootball} from "react-icons/io";


function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [form, setForm] = useState("login");
    const [errorCodeSignUp, setErrorCodeSignUp] = useState(0);
    const [errorCodeLogIn, setErrorCodeLogIn] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("token");
        if (token !== undefined) {
            navigate("/dashboard/actions");
        }
    }, [navigate]);

    const changeUserNameInput = (e) => {
        setUserName(e.target.value);
    };

    const changePassInput = (e) => {
        setPassword(e.target.value);
    };

    const fromSignUpToLogin = () => {
        setForm("login");
    };

    const fromLoginToSignUp = () => {
        setForm("signup");
    };

    const loginBtn = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8989/login", null, {
            params: { username, password },
        }).then((res) => {
            if (res.data.success) {
                setErrorCodeLogIn(0);
                Cookies.set("token", res.data.user.token);
                navigate("/dashboard/actions");
            } else {
                setErrorCodeLogIn(res.data.errorCode);
            }
        });
    };

    const signUpBtn = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8989/sign-up", null, {
            params: { username, password },
        }).then((res) => {
            if (res.data.success) {
                setErrorCodeSignUp(0);
                alert("Successfully signed up");
                setForm("login");
            } else {
                setErrorCodeSignUp(res.data.errorCode);
            }
        });
    };

    const validUsernameSize = () => {
        return username.length >= 6;
    };

    const usernameContainsLetter = () => {
        return /[a-zA-Z]/.test(username);
    };

    const validPassSize = () => {
        return password.length >= 8;
    };

    const passContainsCapitalLetter = () => {
        return /[A-Z]/.test(password);
    };

    const passContainsSmallLetter = () => {
        return /[a-z]/.test(password);
    };

    const passContainsDigit = () => {
        return /[0-9]/.test(password);
    };

    const freeButton = () => {
        return !validUsernameSize() || !usernameContainsLetter() || !validPassSize()
            || !passContainsCapitalLetter() || !passContainsSmallLetter() || !passContainsDigit();
    };

    return (
        <div className="regContainer">
            <div className="logo">
                <IoMdFootball className="football-icon"/>
                <span className="app-title">Football App</span>
            </div>
            {form === "login" ? (
                <div>
                    <form className="styleForm">
                        <h1>Log In</h1>
                        <div className="flex-input">
                            <i className="icon fas fa-user"></i> {/* User icon */}
                            <label htmlFor="username">Username:</label>
                            <input
                                placeholder="Enter username..."
                                type="text"
                                value={username}
                                onChange={changeUserNameInput}
                            />
                        </div>
                        <div className="flex-input">
                            <i className="icon fas fa-lock"></i> {/* Lock icon */}
                            <label htmlFor="password">Password:</label>
                            <input
                                placeholder="********"
                                type="password"
                                value={password}
                                onChange={changePassInput}
                            />
                        </div>
                        <button
                            onClick={loginBtn}
                            className="submitBtn"
                            disabled={username === "" || password === ""}
                        >
                            Log In
                        </button>
                        <h2>Don't have an Account?</h2>
                        <div onClick={fromLoginToSignUp} className="textChangeForm">
                            Sign Up
                        </div>
                        <ErrorMessagesFromServer message={errorCodeLogIn} />
                    </form>
                </div>
            ) : (
                <div>
                    <form className="styleForm">
                        <h1>Sign Up</h1>
                        <div className="flex-input">
                            <i className="icon fas fa-user"></i> {/* User icon */}
                            <label htmlFor="username">Username:</label>
                            <input
                                placeholder="Enter Username..."
                                type="text"
                                value={username}
                                onChange={changeUserNameInput}
                            />
                        </div>
                        <div className="div-conditions">
                            <div style={{ color: validUsernameSize() ? "green" : "red" }}>
                                {validUsernameSize() ? "✔ Username must contain at least 6 characters" : "✘ Username must contain at least 6 characters"}
                            </div>
                            <div style={{ color: usernameContainsLetter() ? "green" : "red" }}>
                                {usernameContainsLetter() ? "✔ Username must contain letters" : "✘ Username must contain letters"}
                            </div>
                        </div>
                        <div className="flex-input">
                            <i className="icon fas fa-lock"></i> {/* Lock icon */}
                            <label style={{marginTop:'10px'}} htmlFor="password">Password:</label>
                            <input
                                placeholder="********"
                                type="password"
                                value={password}
                                onChange={changePassInput}
                            />
                        </div>
                        <div className="div-conditions">
                            <div style={{ color: validPassSize() ? "green" : "red" }}>
                                {validPassSize() ? "✔ Password must contain at least 8 characters" : "✘ Password must contain at least 8 characters"}
                            </div>
                            <div style={{ color: passContainsCapitalLetter() ? "green" : "red" }}>
                                {passContainsCapitalLetter() ? "✔ Password must contain a capital letter" : "✘ Password must contain a capital letter"}
                            </div>
                            <div style={{ color: passContainsSmallLetter() ? "green" : "red" }}>
                                {passContainsSmallLetter() ? "✔ Password must contain a small letter" : "✘ Password must contain a small letter"}
                            </div>
                            <div style={{ color: passContainsDigit() ? "green" : "red" }}>
                                {passContainsDigit() ? "✔ Password must contain a digit" : "✘ Password must contain a digit"}
                            </div>
                        </div>
                        <button style={{marginTop:'10px'}}
                            onClick={signUpBtn}
                            className="submitBtn"
                            disabled={freeButton()}
                        >
                            Sign Up
                        </button>
                        <h2>Already have an Account?</h2>
                        <div onClick={fromSignUpToLogin} className="textChangeForm">
                            Log In
                        </div>
                        <ErrorMessagesFromServer message={errorCodeSignUp} />
                    </form>
                </div>
            )}
            <Outlet />
        </div>
    );
}

export default Login;
