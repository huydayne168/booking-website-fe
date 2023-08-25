import styles from "./searchItem.module.css";
import { useNavigate, useLocation } from "react-router";
const SearchItem = ({ data }) => {
    const location = useLocation();
    const navigate = useNavigate();
    // Function to see the hotel detail Page:
    function goToHotelDetailPage(data) {
        console.log(data);
        navigate(`/hotels/${data._id}`, { state: data });
    }

    return (
        <div
            className={styles["searchItem"]}
            onClick={() => {
                goToHotelDetailPage(data);
            }}
        >
            <img src={data.photos[0]} alt="" className={styles["siImg"]} />
            <div className={styles["siDesc"]}>
                <h1 className={styles["siTitle"]}>{data.name}m</h1>
                <span className={styles["siDistance"]}>
                    {data.distance} from center
                </span>
                <span className={styles["siTaxiOp"]}>{data.featured}</span>
                <span className={styles["siSubtitle"]}>{data.description}</span>
                <span className={styles["siFeatures"]}>{data.type}</span>
                {/* If can cancel */}
                {data.featured ? (
                    <div>
                        <span className={styles["siCancelOp"]}>
                            Free cancellation{" "}
                        </span>
                        <span className={styles["siCancelOpSubtitle"]}>
                            You can cancel later, so lock in this great price
                            today!
                        </span>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
            <div className={styles["siDetails"]}>
                <div className={styles["siRating"]}>
                    <span>Excellent</span>
                    <button>{data.rating}</button>
                </div>
                <div className={styles["siDetailTexts"]}>
                    <span className={styles["siPrice"]}>
                        ${data.cheapestPrice}
                    </span>
                    <span className={styles["siTaxOp"]}>
                        Includes taxes and fees
                    </span>
                    <button className={styles["siCheckButton"]}>
                        See availability
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
