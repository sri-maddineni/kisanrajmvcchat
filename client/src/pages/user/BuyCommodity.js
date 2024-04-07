import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../components/UIComponents/Spinner";
import Footer from "../../components/layouts/Footer";

import AuthContext from "../../context/AuthContext";

import toast from "react-hot-toast";
import axios from "axios";



import commodities from "../../Data/Commodities";
import Nav from "../../components/UIComponents/Nav";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/CardRelated/buycommodity/ProductCard";



const BuyCommodity = () => {


  const [selectedProduct, setSelectedProduct] = useState(null); // To store the selected product
  const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered products

  const [loading, setLoading] = useState(true)

  const [searchitem, setSearchitem] = useState("");
  const navigate = useNavigate()

  const [auth] = useContext(AuthContext);

  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [date, setdate] = useState("");
  const [notes, setnotes] = useState("");

  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const [proposedlist, setProposedlist] = useState([]);
  const [products, setProducts] = useState([]);



  const filterSuggestions = (input) => {
    const filtered = commodities.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    setSuggestions(filtered.map((product) => product.name));
  };

  useEffect(() => {
    if (searchitem && isFocused) {
      filterSuggestions(searchitem);  // Only filter suggestions when name is not empty and input is focused
    } else {
      setSuggestions([]); // Clear suggestions when name is empty or input is not focused
    }
  }, [searchitem, isFocused]);

  const handleSelect = (suggest) => {
    setSearchitem(suggest);
    setSuggestions([]);
    handleProductFilter(suggest);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false); // Set input focus state to false after a delay
    }, 100);
  };


  //api call to propose offer

  const proposeOffer = async (pid, sellerId) => {

    const sentBy = auth?.user?._id;
    const buyerId = sentBy;
    const productId = pid;

    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/propose-offer`, { quantity, price, notes, date, sentBy, buyerId, productId, sellerId })
      if (res.data.success) {

        setquantity("")
        setprice("")
        setnotes("")
        setdate("")

        setProposedlist([...proposedlist, pid]);
        toast.success("offer proposed!")

      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }


  const getProposedList = async () => {
    try {
      const userid = auth?.user?._id;
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/proposedlist`, { userid });
      if (data?.success) {
        setProposedlist(data?.proposedList);
      }
    } catch (error) {
      console.error("Error fetching proposed list:", error);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getProposedList();
  }, []);


  const handleDecline = async (pid, sellerid) => {
    try {
      console.log("clicked on hndledecline")
      const buyerid = auth?.user._id;
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/decline`, { buyerid, pid, sellerid });
      console.log(res)
      if (res?.data?.success) {
        toast.success("Offer declined!");
        setProposedlist(proposedlist.filter((id) => id !== pid));
      }
    } catch (error) {
      console.log(error);
      toast.error("Decline failed!");
    }
    finally {
      setLoading(false)
    }
  };



  const getAllProducts = async () => {
    try {
      if (auth?.user) {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-all-products`);
        if (data?.success) {
          setProducts(data?.products);
        }
      }
      else {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-all-product`); //products not posted by him and posted by others
        if (data?.success) {
          setProducts(data?.products);
        }

      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all products!");
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleProductFilter = (productName) => {
    const filtered = products.filter((product) => product.name === productName);
    setFilteredProducts(filtered);
  };


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

      <div className="row m-3" style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
        <div style={{ minHeight: "50vh", width: "100%" }}>
          <div className="container" style={{ position: "relative" }}>
            <div className="d-flex align-items-center">
              <input
                className="form-control mr-sm-2 m-3"
                type="search"
                placeholder="Search for products"
                value={searchitem}
                onChange={(e) => {
                  setSearchitem(e.target.value);
                }}
                aria-label="Search"
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
              />
              {searchitem && ( // Render the cross button only when search item is not empty
                <button
                  className="fa-solid fa-multiply btn-sm btn"
                  onClick={() => {
                    setSearchitem("")
                    setFilteredProducts([])

                  }} // Clear the search input when the cross button is clicked
                ></button>
              )}
              <button
                className="btn btn-outline-info btn-sm m-3"
                onClick={() => {
                  handleProductFilter(
                    searchitem.charAt(0).toUpperCase() + searchitem.slice(1)
                  );
                }}
              >
                Search
              </button>
            </div>

            {isFocused && suggestions.length > 0 && searchitem && (
              <ul
                style={{
                  listStyle: "none",
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "100%",
                  zIndex: 999, // Ensure it's above other elements
                  backgroundColor: "#fff", // Set background color to match input field
                  padding: 0,
                  margin: 0,
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Add shadow for depth
                  borderRadius: "0.25rem", // Add rounded corners
                }}
              >
                {suggestions.slice(0, 6).map((suggest, index) => (
                  <li
                    key={index}
                    className="bg-info p-1 m-1"
                    onClick={() => handleSelect(suggest)}
                    style={{ cursor: "pointer" }} // Ensure cursor changes to pointer on hover
                  >
                    {suggest}
                  </li>
                ))}
              </ul>
            )}
          </div>


          {/* <Filtersbar onProductSelect={handlecategoryFilter} />*/}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent:"space-around"
            }}
          >
            {filteredProducts.length > 0
              ? filteredProducts.map((p) => (

                <ProductCard product={p}/>
              ))
              : products.map((p) => (
                <ProductCard product={p}/>

              ))}
          </div>
        </div>
      </div>




      <Footer />
    </>
  );
};

export default BuyCommodity;
