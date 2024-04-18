import React, { useContext, useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import Nav from '../../components/UIComponents/Nav'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { toast } from "react-hot-toast"
import TopFilterBar from "../../components/CardRelated/buycommodity/TopFilterBar";
import { IoArrowBackCircle } from 'react-icons/io5'

const Orders = () => {

    const [auth] = useContext(AuthContext)
    const [orders, setorders] = useState([])
    const [wishlist,setwishlist]=useState([])

    const navigate=useNavigate();

    const getuserdata = async () => {
        try {
            console.log("orders")
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/profile/${auth?.user?._id}`)
            if (res.data.success) {
                setorders(res.data.user.ordersplaced)
                setwishlist(res.data.user.wishlist)
                console.log(res.data.user.ordersplaced)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getuserdata();
    }, [])





    const Breadcrumb = () => {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="mr-2" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
              <abbr title="Go back">
                <IoArrowBackCircle style={{ fontSize: '1.8rem' }} />
              </abbr>
            </li>
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/dashboard/user/profile">Profile</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">orders</li>
                </ol>
            </nav>
        );
    };

    return (
        <>
            <Nav />
            <Breadcrumb />
            <TopFilterBar />

            <div className="container" style={{ minHeight: "50vh", display: "flex", flexDirection: "row",flexWrap:"wrap",justifyContent:"space-evenly" }}>
                {orders.map((item, index) =>
                    <div key={index} className="card" style={{ width: "16rem" }}>
                        
                            <span
                                className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-light"
                                style={{ left: "90%", zIndex: "1" }}>
                                {" "}
                                {item?.commodityId?.category}
                            </span>
                            <img
                                src={`/api/v1/products/product-photo/${item._id}`}
                                className="card-img-top" 
                                alt={item.name}
                                style={{ objectFit: "cover", maxHeight: "139px" }} />
                            <p>{item.name}</p>
                            <p>{item.quantity}{item.quantityUnit}s as &#8377;{item.price} per  {item.quantityUnit}</p>
                            <p>{item.availableDate}</p>
                            <div style={{display:"flex",flexDirection:"row",flexWrap:"nowrap"}}>
                            <button className='btn btn-warning btn-sm m-2'>Pending confirmation </button>
                            <button className='btn btn-danger btn-sm m-2'>Cancel</button>

                            </div>
                        
                    </div>
                )
                }
            </div>
            <Footer />
        </>
    )
}

export default Orders