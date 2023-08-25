import React, { useRef, useState } from "react";
import styles from "./SignUpForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignUpForm() {
    const navigate = useNavigate();
    const userNameRef = useRef();
    const passwordRef = useRef();
    const fullNameRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();

    const [userNameValid, setUserNameValid] = useState(true);

    const postUrl = "http://localhost:5000/create-user";

    function submitUserData(e) {
        e.preventDefault();
        console.log(e.target);
        console.log(passwordRef.current.value);

        axios
            .post("http://localhost:5000/create-user", {
                userName: userNameRef.current.value,
                password: passwordRef.current.value,
                fullName: fullNameRef.current.value,
                phoneNumber: phoneNumberRef.current.value,
                email: emailRef.current.value,
            })
            .then((res) => {
                if (res.data.status === 401) {
                    setUserNameValid(false);
                } else {
                    console.log(res);
                    navigate("/sign-in");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className={styles["sign-up-actions"]}>
            <form action="#">
                <h1>Sign Up</h1>
                {userNameValid ? "" : <p>Đã tồn tại tên username này!</p>}
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    ref={userNameRef}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Full Name"
                    ref={fullNameRef}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone Number"
                    ref={phoneNumberRef}
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    ref={emailRef}
                />
                <button type="submit" onClick={submitUserData}>
                    Create Account
                </button>
            </form>
        </div>
    );
}

export default SignUpForm;
