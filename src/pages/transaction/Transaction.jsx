import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./transaction.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Transaction() {
    // Get currentUser information:
    const curUser = useMemo(
        () => JSON.parse(localStorage.getItem("currentUser")),
        []
    );
    const userId = curUser._id;
    console.log(userId);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/get-transaction", {
                params: {
                    userId: userId,
                },
            })
            .then((transactions) => {
                setTransactions(transactions.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className={styles["transaction"]}>
            <Navbar />
            <Header />
            <div className={styles["transaction-container"]}>
                <h1>Your Transaction</h1>
                <div className={styles["transaction-table"]}>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Hotel</th>
                                <th scope="col">Room</th>
                                <th scope="col">Date</th>
                                <th scope="col">Price</th>
                                <th scope="col">Payment Method</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions[0] ? (
                                transactions.map((transaction, index) => {
                                    return (
                                        <tr key={transaction._id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>
                                                {transaction.hotel.hotelName}
                                            </td>
                                            <td>
                                                {transaction.room.roomNumbers.join(
                                                    ", "
                                                )}
                                            </td>
                                            <td>
                                                {transaction.dateStart} -{" "}
                                                {transaction.dateEnd}
                                            </td>
                                            <td>${transaction.price}</td>
                                            <td>{transaction.payment}</td>
                                            <td>{transaction.status}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7">
                                        {" "}
                                        You haven't had any transaction yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Transaction;
