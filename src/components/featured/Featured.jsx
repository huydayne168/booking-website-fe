import styles from "./featured.module.css";
import HanoiImg from "../../asset/City Image/Ha Noi.jpg";
import DaNangImg from "../../asset/City Image/Da Nang.jpg";
import HCMImg from "../../asset/City Image/HCM.jpg";

const Featured = ({ data }) => {
    return (
        <div className={styles["featured"]}>
            <div className={styles["featuredItem"]}>
                <img src={HanoiImg} alt="" className={styles["featuredImg"]} />
                <div className={styles["featuredTitles"]}>
                    <h1>Ha Noi</h1>
                    <h2>{data.hanoi ? data.hanoi : 0} properties</h2>
                </div>
            </div>

            <div className={styles["featuredItem"]}>
                <img src={DaNangImg} alt="" className={styles["featuredImg"]} />
                <div className={styles["featuredTitles"]}>
                    <h1>Da Nang</h1>
                    <h2>{data.danang ? data.danang : 0} properties</h2>
                </div>
            </div>
            <div className={styles["featuredItem"]}>
                <img src={HCMImg} alt="" className={styles["featuredImg"]} />
                <div className={styles["featuredTitles"]}>
                    <h1>Ho Chi Minh</h1>
                    <h2>{data.hochiminh ? data.hochiminh : 0} properties</h2>
                </div>
            </div>
        </div>
    );
};

export default Featured;
