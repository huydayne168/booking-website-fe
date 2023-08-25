import React, { useEffect, useMemo, useState } from "react";
import styles from "./reserveBook.module.css";
import Navbar from "../../components/navbar/Navbar";
import { DateRange } from "react-date-range";
import Footer from "../../components/footer/Footer";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

function ReserveBookPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const hotel = location.state;

    // Get currentUser information:
    const curUser = useMemo(
        () => JSON.parse(localStorage.getItem("currentUser")),
        []
    );
    // States:
    // hotel rooms List:
    const [rooms, setRooms] = useState([]);
    const [userData, setUserData] = useState(curUser);
    const [roomsChose, setRoomsChose] = useState([]);
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [payment, setPayment] = useState("Cash");

    // function to calculate the number of days between two date:
    function numberOfDays(dateStart, dateEnd) {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((dateStart - dateEnd) / oneDay));
        return diffDays;
    }

    // Calculate Price:
    useEffect(() => {
        const dayRange = numberOfDays(date[0].startDate, date[0].endDate) + 1;
        console.log(dayRange);
        const roomCost = roomsChose.reduce(
            (init, room) => init + Number(room.price),
            0
        );
        setPrice((prevPrice) => {
            return roomCost * dayRange;
        });
    }, [roomsChose, date]);

    console.log(price);
    // Get Hotel Rooms:
    useEffect(() => {
        axios
            .get("http://localhost:5000/get-rooms", {
                params: {
                    rooms: hotel.rooms,
                },
            })
            .then((res) => {
                console.log(res);
                setRooms(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // function to get chosen room:
    function getChosenRoom(e, room) {
        const value = e.target.value;
        if (e.target.checked) {
            setRoomsChose((prevRoom) => {
                return [
                    ...prevRoom,
                    { price: room.price, roomNumber: value, roomId: room._id },
                ];
            });
            setPrice((prevPrice) => prevPrice + room.price);
        } else {
            setRoomsChose((rooms) => {
                const newRooms = rooms.filter((room) => {
                    return room.roomNumber !== value;
                });
                return newRooms;
            });
        }
    }
    console.log(roomsChose);

    // userData state Handler functions:
    function fullNameChange(e) {
        setUserData((data) => {
            return { ...data, fullName: e.target.value };
        });
    }

    function emailChange(e) {
        setUserData((data) => {
            return { ...data, email: e.target.value };
        });
    }

    function phoneNumberChange(e) {
        setUserData((data) => {
            return { ...data, phoneNumber: e.target.value };
        });
    }

    // function to get date as a normal date from like: dd/mm/yyyy
    function formatDate(date) {
        let month = date.getUTCMonth() + 1; //months from 1-12
        let day = date.getUTCDate();
        let year = date.getUTCFullYear();

        return day + "/" + month + "/" + year;
    }

    // ================== Function to reserve and navigate to Transaction Page:
    function reserveHandler(e) {
        e.preventDefault();
        axios
            .post("http://localhost:5000/save-transaction", {
                userName: userData.fullName,
                userId: userData._id,
                hotel: {
                    hotelId: hotel._id,
                    hotelName: hotel.name,
                },
                room: {
                    roomId: roomsChose.map((room) => room.roomId),
                    roomNumbers: roomsChose.map((room) => room.roomNumber),
                },
                dateStart: formatDate(date[0].startDate),
                dateEnd: formatDate(date[0].endDate),
                price: price,
                payment: payment,
                status: "Booked",
            })
            .then((res) => {
                console.log(res);
                navigate("/transaction");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className={styles["reserve-book"]}>
            <Navbar />
            <div className={styles["reserve-container"]}>
                <div className={styles["top"]}>
                    <div className={styles["top-left"]}>
                        <h1>{hotel.name}</h1>
                        <p>{hotel.desc}</p>
                    </div>
                    <div className={styles["top-right"]}>
                        <div>
                            <span className={styles.price}>
                                ${hotel.cheapestPrice}
                            </span>{" "}
                            (1 night)
                        </div>
                        <button onClick={reserveHandler}>
                            Reserve or Book Now!
                        </button>
                    </div>
                </div>

                {/* Form */}
                <div className={styles["reserve-form"]}>
                    <form action="#">
                        {/* date picker */}
                        <div className={styles["date-picker"]}>
                            <h2>Date</h2>
                            <DateRange
                                editableDateInputs={true}
                                onChange={(item) => {
                                    setDate([item.selection]);
                                    console.log(date[0].startDate);
                                }}
                                moveRangeOnFirstSelection={false}
                                ranges={date}
                                className={styles.date}
                                minDate={new Date()}
                            />
                        </div>

                        <div className={styles["user-form"]}>
                            <h2>Reserve Information</h2>
                            <div className={styles.controls}>
                                <label htmlFor="fullname">Your Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    id="full-name"
                                    placeholder="Full Name"
                                    // defaultValue={curUser.fullName}
                                    onChange={(e) => fullNameChange(e)}
                                    value={userData.fullName}
                                />
                            </div>
                            <div className={styles.controls}>
                                <label htmlFor="email">Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={(e) => emailChange(e)}
                                    value={userData.email}
                                />
                            </div>
                            <div className={styles.controls}>
                                <label htmlFor="phone-number">
                                    Your Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    id="phone-number"
                                    placeholder="Phone Number"
                                    onChange={(e) => phoneNumberChange(e)}
                                    value={userData.phoneNumber}
                                />
                            </div>
                            <div className={styles.controls}>
                                <label htmlFor="identity-card">
                                    Your Identity Card Number
                                </label>
                                <input
                                    type="text"
                                    name="identityCard"
                                    id="identity-card"
                                    placeholder="Card Number"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Bottom */}
                <div className={styles["select-room"]}>
                    <h2>Select Rooms</h2>
                    <div className={styles["rooms-list"]}>
                        {rooms[0] &&
                            rooms.map((room) => {
                                return (
                                    <div
                                        className={styles["room"]}
                                        key={room._id}
                                    >
                                        <div className={styles["room-info"]}>
                                            <h3
                                                className={styles["room-title"]}
                                            >
                                                {room.title}
                                            </h3>
                                            <p>{room.desc}</p>
                                            <div
                                                className={styles["room-maxpp"]}
                                            >
                                                Max People:{" "}
                                                <span>{room.maxPeople}</span>
                                            </div>
                                            <div
                                                className={styles["room-price"]}
                                            >
                                                ${room.price}
                                            </div>
                                        </div>
                                        <div className={styles["room-choose"]}>
                                            {room.roomNumbers.map((number) => (
                                                <div
                                                    className={
                                                        styles["room-checkbox"]
                                                    }
                                                    key={room._id + number}
                                                >
                                                    <label htmlFor={number}>
                                                        {number}
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        name={number}
                                                        id={number}
                                                        value={number}
                                                        onChange={(e) => {
                                                            getChosenRoom(
                                                                e,
                                                                room
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

                {/* Total Bill */}
                <div className={styles["total-bill"]}>
                    Total Bill : <span>${price}</span>
                </div>
                {/* Payment */}
                <div className={styles["payment"]}>
                    <form action="#">
                        <select
                            name="payment"
                            id="payment"
                            onChange={(e) => {
                                setPayment(e.target.value);
                            }}
                            defaultValue={"Cash"}
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                        </select>

                        <button onClick={reserveHandler}>Reserve Now</button>
                    </form>
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default ReserveBookPage;
