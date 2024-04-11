import React, { useContext, useState } from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { Toaster } from "react-hot-toast";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/UIComponents/Navbar";
import Nav from "../components/UIComponents/Nav";
import AuthContext from "../context/AuthContext";
import HomeSummaryCards from "../components/CardRelated/SummaryCards/HomeSummaryCards";
import CategoriesCardHome from "../components/CardRelated/SummaryCards/CategoriesCardHome";
import products from "../../src/Data/MOCK_DATA"
import commodities from "../Data/Commodities";
import  "./Hero.css"
import random from "random-int"
import slugify from "slugify"

export const Homepage = () => {

  const navigate = useNavigate();

  const [auth, setAuth] = useContext(AuthContext);
  const [value, setvalue] = useState("")
  const [cat, setcat] = useState("")
  const [id, setid] = useState("")


  return (
    <>
      <Nav />
      <Toaster />

      <div className="hero" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>

        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWxhbmR8ZW58MHx8MHx8fDA%3D"
          alt="heroimage" />
        <div className="hero-text">
          <h1 className="text-warning">KisanRaj<br />Buy and Sell in advance</h1>
          {/* <h1 className="text-warning">Kisan Raj <br />Happy Farmers Happy India</h1> */}

          <input
            type="search"
            value={value}
            placeholder={`Try Searching for "${commodities[random(1, 190)].name}"`}
            className="loc"
            onChange={(e) => setvalue(e.target.value)}
            list={value.length >= 2 ? "commodities" : null} // Render datalist if value length is at least 3
          />

          {value.length >= 2 && (
            <datalist id="commodities">
              {commodities
                .filter((product) => product.name.toLowerCase().startsWith(value.toLowerCase())) // Filter options based on starting characters
                .map((product) => (
                  <option key={product._id} value={product.name} />
                ))}
            </datalist>
          )}



          {/* <datalist id="commodities">
            <option value="Tractors" />
            <option value="Sprayers" />
            <option value="Chrome" />
            <option value="Opera" />
            <option value="Safari" />
          </datalist> */}

          {/* <div className="dropdowner">
            {productlist
              .filter((item) => {
                const searchTerm = value.toLocaleLowerCase();
                const namer = item.name.toLocaleLowerCase();

                return (
                  searchTerm &&
                  namer.startsWith(searchTerm) &&
                  namer !== searchTerm
                );
              })
              .slice(0, 5)
              .map((item) => (
                <div
                  onClick={() => {
                    onsearch(item.name);
                  }}
                  className="dropdowner-row"
                  key={item.productId}
                >
                  {`${item.name}  ${item.teluguName}`}
                </div>
              ))}
          </div> */}

          <div className="buttons">
            <button
              className="btn buy btn-outline-info mx-2 my-2"
              onClick={() => {
                if (auth?.user) {
                  if (value) {
                    const selectedProduct = commodities.find(product => product.name.toLowerCase() === value.toLowerCase());
                    if (selectedProduct) {
                      const { category, slug } = selectedProduct;
                      navigate(`/dashboard/user/buy-commodity/${slugify(category.toLowerCase())}/${slugify(value.toLowerCase())}`);
                    } else {
                      navigate("/dashboard/user/buy-commodity/all");
                    }
                  } else {
                    navigate("/dashboard/user/buy-commodity/all");
                  }
                } else {
                  navigate("/buy-commodity");
                }
              }}
            >      
            Buy
          </button>
          <button
            className="btn buy btn-outline-info mx-2 my-2"
            onClick={() => {
              auth?.user && navigate("/dashboard/user/sell-commodity")
            }}
          >
            Sell
          </button>
          <button className="btn buy btn-outline-info mx-2 my-2" onClick={() => navigate("/dashboard/user/hire-equipment")}>Hire</button>
        </div>
      </div>

    </div >


      <CategoriesCardHome />

      <Footer />

  {/* <div className="container"style={{alignItems: "center",justifyContent: "center",display: "flex",flexDirection: "column",minHeight: "70vh", }} >
         <div className="searcher m-2 text-center" style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
          <input type="text" placeholder="enter product" className="m-2" />
        </div>
        <div>
          <button className="btn btn-md btn-info m-2" style={{ width: "4rem", padding: "0.3rem", borderRadius: "0.4rem" }} onClick={() => { auth?.user ? navigate("/dashboard/user/buy-commodity") : navigate("/buy-commodity") }}>Buy</button>
          <button className="btn btn-md btn-info m-2" style={{ width: "4rem", padding: "0.3rem", borderRadius: "0.4rem" }} onClick={() => { navigate("/dashboard/user/sell-commodity") }}>Sell</button>
          <button className="btn btn-md btn-info m-2" style={{ width: "4rem", padding: "0.3rem", borderRadius: "0.4rem" }} onClick={() => { navigate("/dashboard/user/hire-equipment") }}>Hire</button>
        </div>
      </div> */}



  {/* <div className="container" style={{ display: "flex", flexDirection: "row",flexWrap:'wrap',justifyContent:"center" }}>
      <hr />
        {
          products.map(product => (
            <>
              <div className="card" style={{ width: "10rem" }}>
                <p>{product.name} {product.price}</p>
              </div>
            </>
          )
          )
        }
        <hr />
      </div > */}



    </>
  );
};
