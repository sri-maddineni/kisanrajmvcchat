import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import UserMenu from "./UserMenu";
import axios from "axios";
import Nav from '../../components/UIComponents/Nav';
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Spinner from "../../components/UIComponents/Spinner";

const ProposalsRecieved = () => {
  const [auth] = useContext(AuthContext); //for maintaining session data
  const [proposals, setProposals] = useState({}); //for listing proposals count and data related
  const [posted, setPosted] = useState([]);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("responses"); // State to manage active section

  const getProductData = async (pid) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-product/${pid}`
      );
      if (res.data.success) {
        return res.data.product;
      } else {
        return "abc";
      }
    } catch (error) {
      console.log("Error fetching product data:", error);
      return "abc";
    }
    finally {
      setLoading(false)
    }
  };

  const getProposalsRecieved = async () => {
    setLoading(true)
    try {
      const uid = auth?.user?._id;
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/${uid}`);
      if (res.data.success) {
        const proposalsData = res.data.user?.proposalsReceived;

        const proposalsCount = {};
        const productData = {};

        for (const productId in proposalsData) {
          const count = proposalsData[productId].length;
          if (count > 0) {
            proposalsCount[productId] = count;
            if (!productData[productId]) {
              const product = await getProductData(productId);
              if (product) {
                productData[productId] = product;
              }
            }
          }
        }
        setProductData(productData);
        setProposals(proposalsCount);
      }
    } catch (error) {
      console.log("Error fetching proposals:", error);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getProposalsRecieved();
  }, []);

  if (loading) {
    return (<>
      <Nav />
      <div className="container" style={{ minHeight: "50vh" }}>
        <Spinner />
      </div>
      <Footer />
    </>
    )
  }


  return (
    <>
      <Nav />
      <div style={{ display: 'flex', flexDirection: "row", minHeight: "50vh" }}>
        {Object.entries(proposals).map(([productId, count]) => (
          <div key={productId}>
            <div className="card">
              <div>
                {productData[productId] ? (
                  <>
                    <img
                      src={`/api/v1/products/product-photo/${productId}`}
                      alt="ima"
                      style={{ objectFit: "cover", height: "18vh" }}
                    />
                    <p>
                      Product Name: {productData[productId].name}
                    </p>
                    <p>
                      Description: {productData[productId].description}
                    </p>
                    <p>
                      Price: {productData[productId].price}/-
                    </p>
                    <p>
                      Quantity: {productData[productId].quantity} {productData[productId].quantityUnit}s
                    </p>
                  </>
                ) : (
                  <p>Loading...</p>
                )}
                <Link
                  to={`/dashboard/user/${activeSection}/${productId}`}
                >
                  <button className="btn btn-primary">
                    {count}{" "}
                    {activeSection === "responses"
                      ? "responses"
                      : "negotiations"}{" "}
                    received
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
        {
          !Object.entries(proposals).length && (
            <>
              <div className="container my-5">
                <div className="container my-5" style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
                  <button className="btn btn-danger m-5">No Responses for any of the products yet</button>
                </div>
              </div>
            </>
          )
        }

      </div >
      <Footer />
    </>
  );
};

export default ProposalsRecieved;
