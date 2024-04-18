import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import Spinner from '../../components/UIComponents/Spinner';
import AuthContext from '../../context/AuthContext';
import TopFilterBar from '../../components/CardRelated/buycommodity/TopFilterBar';

const Wishlisted = () => {


  const [auth] = useContext(AuthContext);
  const [wishlist, setwishlist] = useState([]);
  const [loading, setloading] = useState(true);
  const [category, setCategory] = useState('all');
  const [filterState, setFilterstate] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  const getWishlist = async () => {
    setloading(true);
    try {
      const uid = auth?.user?._id;
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/profile/${uid}`);
      setwishlist(res.data.user.wishlist);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const addtoorders = async (itemid) => {
    try {
      const buyer = auth?.user?._id;
      const seller = JSON.stringify(itemid.sellerId);
      const details = { itemid, buyer, seller };
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/addtoorders`, details);
      removefromwishlist(itemid);
      if (res.data.success) {
        toast.success('Added to cart successfully!');
      }
      else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  const removefromwishlist = async (itemid) => {
    try {
      const buyer = auth?.user?._id;
      const remove = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/removefromwishlist`, { itemid, buyer });
      if (remove.data.success) {
        console.log(remove.data);
        toast.success(remove.data.message);
        getWishlist();
      }
      else {
        toast.error(remove.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.success("not done");
    }
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setFilterstate(selectedCategory !== 'all');
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortedWishlist = [...wishlist].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  if (loading) {
    return (
      <>
        <Nav />
        <Breadcrumb />
        <TopFilterBar />
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
      <Breadcrumb />
      <div className="container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>

        <div className="container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
          {/* Search input */}
          <input type="search" className='form-control m-2' placeholder='Search for products or use filters' style={{ height: "35px" }} />
          <i className='fa fa-search m-3' style={{ cursor: "pointer" }}></i>

          {/* Filter dropdown */}
          <div className="dropdown">
            <button className="btn btn-sm bg-primary text-white m-1 p-2 btn-light dropdown-toggle" style={{ width: "150px" }} type='button' data-bs-toggle="dropdown" aria-expanded="false">
              {category}
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" onClick={() => handleCategoryChange("all")} href="#">All</a></li>
              <li><a className="dropdown-item" onClick={() => handleCategoryChange("FOOD GRAINS/ CEREALS")} href="#">FOOD GRAINS/CEREALS</a></li>
              <li><a className="dropdown-item" onClick={() => handleCategoryChange("OILSEEDS")} href="#">OILSEEDS</a></li>
              <li><a className="dropdown-item" onClick={() => handleCategoryChange("FRUITS")} href="#">FRUITS</a></li>
              <li><a className="dropdown-item" onClick={() => handleCategoryChange("VEGETABLES")} href="#">VEGETABLES</a></li>
              <li><a className="dropdown-item" onClick={() => handleCategoryChange("SPICES")} href="#">SPICES</a></li>
              <li><a className="dropdown-item" onClick={() => handleCategoryChange("MISC")} href="#">MISC</a></li>
            </ul>
          </div>

          {/* Sorting dropdown */}
          <div className="dropdown">
            <button className="btn btn-sm bg-primary text-white m-1 p-2 btn-light dropdown-toggle" style={{ width: "80px" }} type='button' data-bs-toggle="dropdown" aria-expanded="false">
              Sort
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" onClick={() => handleSortChange('asc')} href="#">Price - low to high</a></li>
              <li><a className="dropdown-item" onClick={() => handleSortChange('desc')} href="#">Price - high to low</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container" style={{ minHeight: '50vh' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {sortedWishlist.map((item) => {
            if (filterState && item.commodityId.category !== category) {
              return null;
            }
            return (
              <div className="card" style={{ display: 'flex', flexDirection: 'column', width: '30rem' }} key={item._id}>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-light" style={{ left: '90%', zIndex: '1' }}>
                  {item?.commodityId?.category}
                </span>
                <div className="" style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className="image" style={{ display: 'flex', flexDirection: 'column' }}>
                    <img src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${item._id}`} className="card-img-top" alt={item.name} style={{ height: '15vh', width: '20vh', objectFit: 'cover' }} />
                  </div>
                  <div className="productdetails m-2" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="my-2">
                      <p>{item._id}</p>
                      <p style={{ margin: '0', padding: '0' }} className="fw-bolder m-1">{item.name}</p>
                      <p style={{ margin: '0', padding: '0' }} className="m-1 fw-bold">&#8377;{item.price} per {item.quantityUnit}</p>
                      <p style={{ margin: '0', padding: '0' }} className="text-muted fw-bolder m-1">{item.quantity} {item.quantityUnit}s available</p>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <button style={{ width: '100px', height: '30px' }} className="btn btn-sm btn-outline-info m-1" onClick={() => { navigate(`/dashboard/user/buy-commodity/${item.commodityId.catslug}/${item.slug.toLowerCase()}/${item._id}`) }}>View details</button>
                  <button style={{ width: '100px', height: '30px' }} className="btn btn-sm btn-primary m-1" onClick={() => { navigate(`/dashboard/user/profile/${item.sellerId}`) }}>Contact seller</button>
                  <button style={{ width: '100px', height: '30px' }} className="btn btn-sm btn-warning m-1" onClick={() => { addtoorders(item._id) }}>Place order</button>
                  <i className="fa-solid fa-trash-can m-3 text-danger" style={{ cursor: 'pointer' }} onClick={() => { removefromwishlist(item._id) }}></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

// Breadcrumb component directly integrated
const Breadcrumb = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="mr-2" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
            <abbr title="Go back">
              <IoArrowBackCircle style={{ fontSize: '1.8rem' }} />
            </abbr>
          </li>
          <li className="breadcrumb-item">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="breadcrumb-item">
            <NavLink to="/dashboard/user/profile">Profile</NavLink>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            My wishlist
          </li>
        </ol>
      </nav>
    </>
  );
};

export default Wishlisted;
