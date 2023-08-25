import React, { useRef, useState } from "react";
import styles from "./SignInForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignInForm() {
    const navigate = useNavigate();
    const userNameRef = useRef();
    const passwordRef = useRef();

    const validateData = {
        userNameValid: true,
        passwordValid: true,
    };

    const [validation, setValidation] = useState(validateData);

    function logIn(e) {
        e.preventDefault();
        const userName = userNameRef.current.value;
        const password = passwordRef.current.value;
        axios
            .get(`http://localhost:5000/get-user/${userName}`)
            .then((res) => {
                console.log(res.data);
                // Xac thuc tai khoan tai day:
                // (Se lam them phan nay sau khi hoc xong phan3 NodeJS)
                // neu dung mk thi luu nguoi dung vao localStorage va chuyen den trang Home
                if (res.data.message) {
                    setValidation((valid) => {
                        const newValidState = {
                            ...valid,
                            userNameValid: false,
                        };
                        return newValidState;
                    });
                } else if (password === res.data.password) {
                    localStorage.setItem(
                        "currentUser",
                        JSON.stringify(res.data)
                    );
                    navigate("/");
                } else {
                    setValidation((valid) => {
                        const newValidState = {
                            ...valid,
                            passwordValid: false,
                        };
                        return newValidState;
                    });
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={styles["sign-in-actions"]}>
            <form action="#">
                <h1>Log In</h1>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    ref={userNameRef}
                />
                {validation.userNameValid ? (
                    ""
                ) : (
                    <p>Tài khoản không chính xác</p>
                )}
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    ref={passwordRef}
                />
                {validation.passwordValid ? (
                    ""
                ) : (
                    <p>Mật khẩu không chính xác</p>
                )}

                <button onClick={logIn} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default SignInForm;
