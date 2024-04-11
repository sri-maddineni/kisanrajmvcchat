import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import { NavLink } from 'react-router-dom'
import Spinner from '../../components/UIComponents/Spinner';

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
      <div className="container" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around",minHeight:"50vh" }}>

        {wishlist.map((item) => (

          <div className="card" style={{ width: "18rem" }} key={item._id}>
            {item.name}
          </div>

        ))}
      </div>
      <Footer />
    </>
  )
}

export default Wishlisted