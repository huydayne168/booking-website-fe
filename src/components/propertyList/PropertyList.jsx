import styles from "./propertyList.module.css";
const PropertyList = ({ data }) => {
    return (
        <div className={styles["pList"]}>
            <div className={styles["pListItem"]}>
                <img
                    src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
                    alt=""
                    className={styles["pListImg"]}
                />
                <div className={styles["pListTitles"]}>
                    <h1>Hotels</h1>
                    <h2>{data.hotel ? data.hotel : 0} hotels</h2>
                </div>
            </div>
            <div className={styles["pListItem"]}>
                <img
                    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
                    alt=""
                    className={styles["pListImg"]}
                />
                <div className={styles["pListTitles"]}>
                    <h1>Apartments</h1>
                    <h2>{data.apartment ? data.apartment : 0} hotels</h2>
                </div>
            </div>
            <div className={styles["pListItem"]}>
                <img
                    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
                    alt=""
                    className={styles["pListImg"]}
                />
                <div className={styles["pListTitles"]}>
                    <h1>Resorts</h1>
                    <h2>{data.resort ? data.resort : 0} hotels</h2>
                </div>
            </div>
            <div className={styles["pListItem"]}>
                <img
                    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
                    alt=""
                    className={styles["pListImg"]}
                />
                <div className={styles["pListTitles"]}>
                    <h1>Villas</h1>
                    <h2>{data.villa ? data.villa : 0} hotels</h2>
                </div>
            </div>
            <div className={styles["pListItem"]}>
                <img
                    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
                    alt=""
                    className={styles["pListImg"]}
                />
                <div className={styles["pListTitles"]}>
                    <h1>Cabins</h1>
                    <h2>{data.cabin ? data.cabin : 0} hotels</h2>
                </div>
            </div>
        </div>
    );
};

export default PropertyList;
