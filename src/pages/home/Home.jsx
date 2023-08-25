import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import styles from "./home.module.css";
import axios from "axios";

const Home = () => {
    const url = "http://localhost:5000/home-page";
    const [featureData, setFeatureData] = useState({});
    const [propertyListData, setPropertyListData] = useState({});
    const [featuredPropertiesData, setFeaturedPropertiesData] = useState({});
    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                console.log(res);
                setFeatureData(res.data.area);
                setPropertyListData(res.data.hotelTypes);
                setFeaturedPropertiesData(res.data.highRateHotels);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div>
            <Navbar />
            <Header />
            <div className={styles["homeContainer"]}>
                <Featured data={featureData} />
                <h1 className={styles["homeTitle"]}>Browse by property type</h1>
                <PropertyList data={propertyListData} />
                <h1 className={styles["homeTitle"]}>Homes guests love</h1>
                <FeaturedProperties data={featuredPropertiesData} />
                <MailList />
                <Footer />
            </div>
        </div>
    );
};

export default Home;
