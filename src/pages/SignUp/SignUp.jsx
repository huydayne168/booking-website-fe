import React from "react";
import styles from "./SignUp.module.css";
import Navbar from "../../components/navbar/Navbar";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
function SignUp() {
    return (
        <div className={styles["sign-up"]}>
            <Navbar />
            <SignUpForm />
        </div>
    );
}

export default SignUp;
