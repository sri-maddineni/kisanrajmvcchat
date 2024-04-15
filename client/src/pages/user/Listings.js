import React from "react";
import UserMenu from "./UserMenu";
import { useState, useEffect } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Nav from "../../components/UIComponents/Nav";
import Spinner from "../../components/UIComponents/Spinner";
import TopFilterBar from "../../components/CardRelated/buycommodity/TopFilterBar";

const Listings = () => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true)

  const navigate = useNavigate();

  //get all products

  const getAllProducts = async () => {
    setloading(true)
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-posted-products`);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting products!");
    }
    finally {
      setloading(false)
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return (
      <>
        <Nav />
        <div className="container" style={{ minHeight: "50vh" }}>
          <Spinner />
        </div>
        <Footer />
      </>
    )
  }

  const Breadcrumb = () => {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
          <li className="breadcrumb-item"><NavLink to="/dashboard/user/profile">Profile</NavLink></li>


          <li className="breadcrumb-item active" aria-current="page">Listings</li>
        </ol>
      </nav>
    );
  };


  return (
    <>
      <Nav />
      <Breadcrumb />
      <div>
        <TopFilterBar/>
        <div className="row">

          <div className="container" style={{ minHeight: "50vh" }}>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",

              }}
            >
              <>
                {products.length ? (
                  products.map((p) => (
                    <div key={p._id}>
                      <Link
                        to={`/dashboard/user/product/${p._id}`}
                        className="text-dark text-decoration-none"
                      >
                        <div className="card" style={{ width: "14rem" }}>
                          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-light" style={{ left: "90%", zIndex: "1" }}>{" "}
                            {p?.commodityId?.category}
                          </span>
                          <img
                            src={`/api/v1/products/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            style={{ height: "20vh", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h5
                              className="card-title"
                              style={{ fontSize: "1rem" }}
                            >
                              <span style={{ fontWeight: "600" }}>
                                {" "}
                                {p.organic ? "organic" : "Inorganic"}{" "}
                              </span>
                              <span
                                style={{ fontSize: "0.9rem", fontWeight: "600" }}
                              >
                                {p.name}
                              </span>{" "}
                              &nbsp;{p.quality}
                              <i className="fa fa-star fa-sm text-warning"> </i>
                            </h5>
                            <p
                              style={{ fontSize: "0.8rem", fontWeight: "600" }}
                            >
                              {p.description}
                            </p>
                            <p className="card-text">
                              <span className="text-dark text-muted fw-bolder">
                                {" "}
                                Rs.{p.price}/-
                              </span>{" "}
                              per{" "}
                              <span>

                                {p.quantityUnit ? p.quantityUnit : ""}
                              </span>
                              <br />

                            </p>
                            <p><span>{p.quantity} {p.quantityUnit}s available</span></p>
                            <p style={{ fontSize: "0.8rem" }}>
                              Available by :{" "}
                              {format(new Date(p.availableDate), `dd MMM yyyy`)}
                            </p>
                            <p style={{ fontSize: "0.8rem" }}>
                              Posted on :{" "}
                              {format(new Date(p.createdAt), `dd MMM yyyy`)}
                            </p>
                            <p style={{ fontSize: "0.7rem" }}>{p._id}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="container d-flex justify-content-center" >
                      <p></p>
                      <button className="btn btn-primary" onClick={() => navigate("/dashboard/user/sell-commodity")}>No listings yet, start posting commodities</button>
                      <p></p>
                    </div>
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Listings;
