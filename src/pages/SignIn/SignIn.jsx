import React from "react";
import styles from "./SignIn.module.css";
import Navbar from "../../components/navbar/Navbar";
import SignInForm from "../../components/SignInComps/SignInForm";

function SignIn() {
    return (
        <div className={styles["sign-in"]}>
            <Navbar />
            <SignInForm />
        </div>
    );
}

export default SignIn;
