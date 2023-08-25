import { useState } from "react";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const isLogin = currentUser ? true : false;
    const [loginState, setLoginState] = useState(isLogin);

    function toHomePage() {
        navigate("/");
    }

    function toSignUp(event) {
        navigate("/sign-up");
    }

    function toSignIn(event) {
        navigate("/sign-in");
    }

    function toTransaction() {
        navigate("/transaction");
    }

    function logOut() {
        localStorage.removeItem("currentUser");
        setLoginState(false);
        navigate("/");
    }
    return (
        <div className={styles["navbar"]}>
            <div className={styles["navContainer"]}>
                <span className={styles["logo"]} onClick={toHomePage}>
                    Booking Website
                </span>
                {loginState ? (
                    <div className={styles["navItems"]}>
                        <p>{currentUser.userName}</p>
                        <button
                            className={styles["navButton"]}
                            onClick={toTransaction}
                        >
                            Transaction
                        </button>
                        <button
                            className={styles["navButton"]}
                            onClick={logOut}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className={styles["navItems"]}>
                        <button
                            className={styles["navButton"]}
                            onClick={toSignUp}
                        >
                            Register
                        </button>
                        <button
                            className={styles["navButton"]}
                            onClick={toSignIn}
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
