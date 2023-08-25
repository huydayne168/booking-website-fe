import styles from "./featuredProperties.module.css";

import { useNavigate, useLocation } from "react-router";
const FeaturedProperties = ({ data }) => {
    const location = useLocation();
    const navigate = useNavigate();
    // Function to see the hotel detail Page:
    function goToHotelDetailPage(hotel) {
        console.log(data);
        navigate(`/hotels/${hotel._id}`, { state: hotel });
    }
    console.log(data);
    return (
        <div className={styles["fp"]}>
            {data[0] &&
                data.map((hotel) => {
                    return (
                        <div
                            className={styles["fpItem"]}
                            key={hotel._id}
                            onClick={() => {
                                goToHotelDetailPage(hotel);
                            }}
                        >
                            <img
                                src={hotel.photos[0]}
                                alt=""
                                className={styles["fpImg"]}
                            />
                            <span className={styles["fpName"]}>
                                <div href="./hotels/0" target="_blank">
                                    {hotel.name}
                                </div>
                            </span>
                            <span className={styles["fpCity"]}>
                                {hotel.city}
                            </span>
                            <span className={styles["fpPrice"]}>
                                Starting from ${hotel.cheapestPrice}
                            </span>
                            <div className={styles["fpRating"]}>
                                <button>{hotel.rating}</button>
                                <span>Excellent</span>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default FeaturedProperties;
