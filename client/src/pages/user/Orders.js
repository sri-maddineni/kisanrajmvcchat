import React, { useContext, useEffect, useState } from 'react'
import UserMenu from './UserMenu'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import Nav from '../../components/UIComponents/Nav'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { toast } from "react-hot-toast"

const Orders = () => {

    const [auth] = useContext(AuthContext)
    const [orders, setorders] = useState([])

    const getuserdata = async () => {
        try {
            console.log("orders")
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/profile/${auth?.user?._id}`)
            if (res.data.success) {
                setorders(res.data.user.ordersplaced)
                console.log(res.data.user.ordersplaced)
            }
            console.log(res)
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
            <div className="container" style={{ minHeight: "50vh", display: "flex", flexDirection: "column" }}>
                {orders.map((item,index) =>
                    <div key={index}>
                        <p>{JSON.stringify(item)}</p>
                    </div>
                )
                }
            </div>
            <Footer />
        </>
    )
}

export default Orders