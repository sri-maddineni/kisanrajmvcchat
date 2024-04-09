import React, { useContext, useEffect, useState } from "react";
import Spinner from "../../components/UIComponents/Spinner";
import Footer from "../../components/layouts/Footer";
import Filtersbar from "../../components/Filters/Filtersbar"
import AuthContext from "../../context/AuthContext";

import toast from "react-hot-toast";
import axios from "axios";



import commodities from "../../Data/Commodities";
import Nav from "../../components/UIComponents/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import ProductCard, { Prod } from "../../components/CardRelated/buycommodity/ProductCard";



const BuyCommodity = () => {


  const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered products

  const [loading, setLoading] = useState(true)

  const [searchitem, setSearchitem] = useState("");

  const [auth] = useContext(AuthContext);

  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [date, setdate] = useState("");
  const [notes, setnotes] = useState("");

  const [isFocused, setIsFocused] = useState(false);


  const [proposedlist, setProposedlist] = useState([]);
  const [products, setProducts] = useState([]);



  const handleCategoryFilter = (selectedCategory) => {
    // Filter products based on selected category
    console.log(selectedCategory);

    // Check if selectedCategory is not null or undefined
    if (selectedCategory) {
      // Filter products based on the selected category
      const filtered = products.filter((p) => {
        // Access category from commodityId if available
        const category = p?.commodityId?.category;
        return category && category.toLowerCase() === selectedCategory.toLowerCase();
      });

      if (filtered.length > 0) {
        //toast.success("Products filtered successfully"); // Display a success message
      } else {
        //toast.error("No products found for the selected category"); 
        setFilteredProducts([])// Display an error message if no products are found
      }

      // Update state with filtered products
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products)// Display an error message if selectedCategory is null or undefined
    }
  };



  const filterSuggestions = (input) => {
    const filtered = commodities.filter((product) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    // setSuggestions(filtered.map((product) => product.name));
  };

  useEffect(() => {
    if (searchitem && isFocused) {

      filterSuggestions(searchitem);
    } else {
      // setSuggestions([]);
    }
  }, [searchitem, isFocused]);

  // const handleSelect = (suggest) => {
  //   setSearchitem(suggest);
  //   setSuggestions([]);
  //   handleProductFilter(suggest);
  // };

  // const handleBlur = () => {
  //   setTimeout(() => {
  //     setIsFocused(false); // Set input focus state to false after a delay
  //   }, 100);
  // };


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

  const Breadcrumb = () => {
    return (
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><NavLink to="/">Home</NavLink></li>

          <li class="breadcrumb-item active" aria-current="page">buy-commodity - all categories</li>
        </ol>
      </nav>
    );
  };

  const FilterSearch = () => {
    return (
      <>
        <div className="d-flex align-items-center" style={{ display: 'flex', flexDirection: "row" }}>
          <input
            className="form-control mr-sm-2 m-3"
            type="search"
            placeholder={`search among ${products.length} products available`}
            value={searchitem}
            onChange={(e) => {
              setSearchitem(e.target.value);
            }}
            aria-label="Search"
            onFocus={() => setIsFocused(true)}
          // onBlur={handleBlur}
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
      </>
    )
  }



  return (
    <>
      <Nav />

      <Breadcrumb />


      <div className="row m-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <div style={{ minHeight: "50vh", width: "100%" }}>
          <div className="container" style={{ position: "relative" }}>
              <FilterSearch/>
          </div>

          {/* <Filtersbar onProductSelect={handlecategoryFilter} />*/}
          <div className="container" style={{ display: 'flex', flexDirection: "row" }}>
            <div className="col-3" style={{ border: 'solid 1px' }}>
              <Filtersbar onProductSelect={handleCategoryFilter} />
            </div>
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} >


              {filteredProducts.length > 0
                ? filteredProducts.map((p) => (
                  auth?.user ? <ProductCard key={p.id} product={p} /> : <Prod key={p.id} product={p} />
                ))
                : products
                  .filter((p) => p.name.toLowerCase().includes(searchitem.toLowerCase()))
                  .map((p) => auth?.user ? <ProductCard key={p.id} product={p} /> : <Prod key={p.id} product={p} />)
              }


            </div>
          </div>
        </div>
      </div>




      <Footer />
    </>
  );
};

export default BuyCommodity;




export const FilterSearch = ({ products, handleProductFilter }) => {
  const [searchitem, setSearchitem] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const clearSearch = () => {
    setSearchitem('');
    handleProductFilter('');
  };

  return (
    <div className="d-flex align-items-center" style={{ display: 'flex', flexDirection: "row" }}>
      <input
        className="form-control mr-sm-2 m-3"
        type="search"
        placeholder={`search among ${products.length} products available`}
        value={searchitem}
        onChange={(e) => setSearchitem(e.target.value)}
        aria-label="Search"
        onFocus={() => setIsFocused(true)}
        // onBlur={handleBlur}
      />
      {searchitem && ( // Render the cross button only when search item is not empty
        <button
          className="fa-solid fa-multiply btn-sm btn"
          onClick={clearSearch} // Clear the search input when the cross button is clicked
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
  );
};


