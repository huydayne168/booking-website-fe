import styles from "./list.module.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import axios from "axios";

const List = () => {
    // States :
    const location = useLocation();
    const navigate = useNavigate();
    const [destination, setDestination] = useState(location.state.destination);
    const [date, setDate] = useState(location.state.date);
    const [openDate, setOpenDate] = useState(false);
    const [options, setOptions] = useState(location.state.options);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    // Inputs Ref:
    const destinationRef = useRef();
    const adultRef = useRef();
    const childrenRef = useRef();
    const roomRef = useRef();
    const minPriceRef = useRef();
    const maxPriceRef = useRef();

    const [searchedHotels, setSearchedHotels] = useState([]);

    // fetch API:
    useEffect(() => {
        axios
            .get("http://localhost:5000/search-hotel", {
                params: {
                    destination: destination,
                    date: date,
                    options: options,
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                },
            })
            .then((res) => {
                console.log(res);
                setSearchedHotels(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [destination, options, minPrice, maxPrice]); // date will be add later due to missing of date data

    // Function to handle search:
    function searchHandler() {
        setDestination((prev) => destinationRef.current.value);
        setOptions((prev) => {
            return {
                adult: adultRef.current.value,
                children: childrenRef.current.value,
                room: roomRef.current.value,
            };
        });
        setMinPrice((prev) => minPriceRef.current.value);
        setMaxPrice((prev) => maxPriceRef.current.value);
    }

    // Return JSX:
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className={styles["listContainer"]}>
                <div className={styles["listWrapper"]}>
                    <div className={styles["listSearch"]}>
                        <h1 className={styles["lsTitle"]}>Search</h1>
                        <div className={styles["lsItem"]}>
                            <label>Destination</label>
                            <input
                                placeholder={destination}
                                type="text"
                                ref={destinationRef}
                            />
                        </div>
                        <div className={styles["lsItem"]}>
                            <label>Check-in Date</label>
                            <span
                                onClick={() => setOpenDate(!openDate)}
                            >{`${format(
                                date[0].startDate,
                                "MM/dd/yyyy"
                            )} to ${format(
                                date[0].endDate,
                                "MM/dd/yyyy"
                            )}`}</span>
                            {openDate && (
                                <DateRange
                                    onChange={(item) =>
                                        setDate([item.selection])
                                    }
                                    minDate={new Date()}
                                    ranges={date}
                                />
                            )}
                        </div>
                        <div className={styles["lsItem"]}>
                            <label>Options</label>
                            <div className={styles["lsOptions"]}>
                                <div className={styles["lsOptionItem"]}>
                                    <span className={styles["lsOptionText"]}>
                                        Min price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        className={styles["lsOptionInput"]}
                                        ref={minPriceRef}
                                    />
                                </div>
                                <div className={styles["lsOptionItem"]}>
                                    <span className={styles["lsOptionText"]}>
                                        Max price <small>per night</small>
                                    </span>
                                    <input
                                        type="number"
                                        className={styles["lsOptionInput"]}
                                        ref={maxPriceRef}
                                    />
                                </div>
                                <div className={styles["lsOptionItem"]}>
                                    <span className={styles["lsOptionText"]}>
                                        Adult
                                    </span>
                                    <input
                                        type="number"
                                        min={1}
                                        className={styles["lsOptionInput"]}
                                        placeholder={options.adult}
                                        ref={adultRef}
                                    />
                                </div>
                                <div className={styles["lsOptionItem"]}>
                                    <span className={styles["lsOptionText"]}>
                                        Children
                                    </span>
                                    <input
                                        type="number"
                                        min={0}
                                        className={styles["lsOptionInput"]}
                                        placeholder={options.children}
                                        ref={childrenRef}
                                    />
                                </div>
                                <div className={styles["lsOptionItem"]}>
                                    <span className={styles["lsOptionText"]}>
                                        Room
                                    </span>
                                    <input
                                        type="number"
                                        min={1}
                                        className={styles["lsOptionInput"]}
                                        placeholder={options.room}
                                        ref={roomRef}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={searchHandler}>Search</button>
                    </div>
                    <div className={styles["listResult"]}>
                        {searchedHotels[0] &&
                            searchedHotels.map((hotel) => {
                                return (
                                    <SearchItem data={hotel} key={hotel._id} />
                                );
                            })}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default List;
