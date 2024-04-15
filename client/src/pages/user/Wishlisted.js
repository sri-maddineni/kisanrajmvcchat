import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import { NavLink, useNavigate } from 'react-router-dom'
import Spinner from '../../components/UIComponents/Spinner';
import TopFilterBar from '../../components/CardRelated/buycommodity/TopFilterBar'
import { IoArrowBackCircle } from "react-icons/io5";
import {toast} from "react-hot-toast"

const Wishlisted = () => {

  const [auth] = useContext(AuthContext)
  const [wishlist, setwishlist] = useState([])
  const [loading, setloading] = useState(true)
  const navigate = useNavigate();

  const [category, setCategory] = useState("category")
  const [sort, setsort] = useState("sorty by")
  const [rating, setrating] = useState("rating")

  const [filterState,  setFilterstate]=useState(false)

  

  const getWishlist = async () => {
    setloading(true)
    try {
      //requirement routes
      const uid = auth?.user?._id
      const url = `${process.env.REACT_APP_API}/api/v1/users/profile/${uid}`
      await axios.get(url)
        .then(response => {
          // handle success
          console.log(response)
          setwishlist(response.data.user.wishlist)
          console.log(response.data.user.wishlist)
        })
        .catch(error => {
          console.log(error)
        });
    } catch (error) {
      console.log(error)
    }
    finally {
      setloading(false)
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])


  const filterCommodities = (category = 'all', sort = "all") => {
    return wishlist.filter(commodity => {
      console.log(commodity.commodityId)
      return (
        
        (category === 'all' || commodity.commodityId.catslug === category) &&
        (!sort || commodity.sort === sort)
      );
    });
};


  if (filterState) {
    // Call filterCommodities with the selected category
    const filteredCommodities = filterCommodities(category);
    console.log("filteres",filteredCommodities)
  }


  const addtoorders=async(itemid)=>{

    try {
      const buyer=auth?.user?._id;
      // let seller=JSON.stringify(itemid.sellerId.toString());
      //  seller = seller.substring(1, seller.length - 1);

      const seller=JSON.stringify(itemid.sellerId)
      
      const details={itemid,buyer,seller}
      const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/products/addtoorders`,details)
      
      if(res.data.success){
        toast.success("add to cart successfully!")
      }

    } catch (error) {
      toast.error("something went wrong")
      console.log(error)
    }
  }

  


  const Breadcrumb = () => {
    return (

      <>

        <nav aria-label="breadcrumb">


          <ol className="breadcrumb">
            <li className='mr-2' style={{ cursor: "pointer" }} onClick={() => { navigate(-1) }}>
              <abbr title="go back"><IoArrowBackCircle style={{ fontSize: '1.8rem' }} /></abbr> {/* Increase size here */}
            </li>
            <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
            <li className="breadcrumb-item"><NavLink to="/dashboard/user/profile">Profile</NavLink></li>
            <li className="breadcrumb-item active" aria-current="page">My wishlist</li>
          </ol>

        </nav>
      </>
    );
  };


  if (loading) {
    return (
      <>
        <Nav />
        <Breadcrumb />

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

      <div className="container" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
            <input type="search" className='form-control m-2' placeholder='search for products or use filters' style={{ height: "35px" }} />
            <i className='fa fa-magnifying-glass m-3' style={{ cursor: "pointer" }}></i>

            <div class="dropdown">
              <button class="btn btn-sm bg-primary text-white m-1 p-2 btn-light dropdown-toggle" style={{ width: "150px" }} type='button' data-bs-toggle="dropdown" aria-expanded="false">
                {category}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" onClick={() => { setCategory("all") ;  setFilterstate(false)}} href="#">All</a></li>
                <li><a class="dropdown-item" onClick={() => { setCategory("food-grains-cereals");  setFilterstate(true) }} href="#">FOOD GRAINS/CEREALS</a></li>
                <li><a class="dropdown-item" onClick={() => { setCategory("oilseeds");  setFilterstate(true) }} href="#">OILSEEDS</a></li>
                <li><a class="dropdown-item" onClick={() => { setCategory("fruits");  setFilterstate(true) }} href="#">FRUITS</a></li>
                <li><a class="dropdown-item" onClick={() => { setCategory("vegetables");  setFilterstate(true) }} href="#">VEGETABLES</a></li>
                <li><a class="dropdown-item" onClick={() => { setCategory("spices");  setFilterstate(true) }} href="#">SPICES</a></li>
                <li><a class="dropdown-item" onClick={() => { setCategory("misc");  setFilterstate(true) }} href="#">MISC</a></li>

              </ul>
            </div>
            {/* <div class="dropdown">
              <button class="btn btn-sm bg-primary text-white m-1 p-2 btn-light dropdown-toggle" style={{ width: "80px" }} type='button' data-bs-toggle="dropdown" aria-expanded="false">
                {sort}
              </button>
              <ul class="dropdown-menu">
                <li><a className="dropdown-item" onClick={() => { setsort("Price ↓") }} href="#">Price - low to high &#8595;</a></li>
                <li><a class="dropdown-item" onClick={() => { setsort("Price ↑") }} href="#">Price - high to low &#8593;</a></li>
                <li><a class="dropdown-item" onClick={() => { setsort("date ↓") }} href="#">Date Asc</a></li>
                <li><a class="dropdown-item" onClick={() => { setsort("date ↑") }} href="#">Date Desc</a></li>
                <li><a className="dropdown-item" onClick={() => { setrating("Rating ↓") }} href="#">Rating &#8595;</a></li>
                <li><a class="dropdown-item" onClick={() => { setrating("Rating ↑") }} href="#">Rating &#8593;</a></li>
              </ul>
            </div> */}


          </div>

      <div className="container" style={{ minHeight: "50vh" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", }}>
          {wishlist.map((item) => (
            <div className="card" style={{ display: 'flex', flexDirection: "column", width: "30rem" }} key={item._id}>


              <div className="" style={{ display: "flex", flexDirection: "row" }}>
                <div className="image" style={{ display: "flex", flexDirection: "column" }}>
                  <img
                    src={`/api/v1/products/product-photo/${item._id}`}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "15vh", width: "20vh", objectFit: "cover" }}
                  />

                </div>
                <div className="productdetails m-2" style={{ display: "flex", flexDirection: 'column' }}>

                  <div className='my-2'>
                    <p style={{ margin: "0", padding: "0" }} className='fw-bolder m-1'>{item.name}</p>
                    <p style={{ margin: "0", padding: "0" }} className='m-1 fw-bold'>&#8377;{item.price} per {item.quantityUnit}</p>
                    <p style={{ margin: "0", padding: "0" }} className='text-muted fw-bolder m-1'>{item.quantity} {item.quantityUnit}s available</p>
                    {/* <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
                      <input type="number" className="form-control m-1" placeholder='quantity' /><span className='m-2' value={item.quantity}>{item.quantityUnit}s</span>
                    </div> */}

                  </div>
                </div>

              </div>

              <div style={{ display: "flex", flexDirection: "row",  }}>
                <button style={{width:"100px", height:"30px"}} className='btn btn-sm btn-outline-info m-1'>view details</button>
                <button style={{width:"100px", height:"30px"}} className='btn btn-sm btn-primary m-1' onClick={() => { navigate(`/dashboard/user/profile/${item.sellerId}`) }}>Contact seller</button>
                <button style={{width:"100px", height:"30px"}} className='btn btn-sm btn-warning m-1' onClick={()=>{addtoorders(item.commodityId)}}>Place order</button>
                <i className="fa-solid fa-trash-can m-3 text-danger" style={{ cursor: "pointer" }}></i>
              </div>




            </div>

          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Wishlisted