import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import { NavLink } from 'react-router-dom'
import Spinner from '../../components/UIComponents/Spinner';
import TopFilterBar from '../../components/CardRelated/buycommodity/TopFilterBar'

const Wishlisted = () => {

  const [auth] = useContext(AuthContext)
  const [wishlist, setwishlist] = useState([])
  const [loading, setloading] = useState(true)

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


  const Breadcrumb = () => {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
          <li className="breadcrumb-item"><NavLink to="/dashboard/user/profile">Profile</NavLink></li>


          <li className="breadcrumb-item active" aria-current="page">My wishlist</li>
        </ol>
      </nav>
    );
  };


  if (loading) {
    return (
      <>
        <Nav />
        <Breadcrumb />

        <div className="container" style={{ minHeight: "50vh" }}>
          <TopFilterBar />
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
      <TopFilterBar />
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
                    

                  </div>
                </div>

              </div>

              <div style={{ display: "flex", flexDirection: "row",flexWrap:"nowrap" }}>
                <button className='btn btn-sm btn-primary'>view details</button>
                <button className='btn btn-sm btn-primary m-1'>Contact seller</button>
                <button className='btn btn-sm btn-warning m-1'>Place order</button>
                <i className="fa-solid fa-trash-can m-3" style={{ cursor: "pointer" }}></i>
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