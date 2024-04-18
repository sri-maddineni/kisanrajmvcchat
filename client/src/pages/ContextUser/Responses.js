import React, { useContext, useEffect, useState } from 'react'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackCircle } from 'react-icons/io5'
import Spinner from '../../components/UIComponents/Spinner'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { setISOWeek } from 'date-fns'

const Responses = () => {

    const params = useParams()

    const [loading, setloading] = useState(false)
    const [date, setDate] = useState("")
    const [price, setPrice] = useState("")
    const [notes, setNotes] = useState("")
    const product = params.pid;
    const [quantity, setQuantity] = useState("")

    const [chats, setChats] = useState([])

    const [selecteduser, setselecteduser] = useState({ name: "click on user to chat" })

    const [auth] = useContext(AuthContext)

    const navigate = useNavigate();

    const [responses, setresponses] = useState([])

    const pid = params.pid


    const getuserdata = async () => {
        setloading(true);
        try {
            const uid = auth?.user?._id;
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/profile/${uid}`);

            const responseData = res.data.user.proposalsReceived[pid];
            setresponses(responseData);

            // Iterate through each response and fetch basic user details
            for (const response of responseData) {
                await getBasicDetails(response); // Assuming response contains user ID
            }

            console.log(res.data.user);

        } catch (error) {
            console.log(error);
        } finally {
            setloading(false);
        }
    };

    const getBasicDetails = async (uid) => {
        try {

            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/profile/basic/${uid.sentBy}`);
            if (res.data.success) {
                // Update state or do further processing with the basic user details
                console.log("Basic user details:", res.data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getuserdata();
    }, []);


    const getchats = async () => {
        try {

            const seller = auth?.user?._id;
            const buyer = selecteduser.uid
            const chat = { pid, seller, buyer }

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/chats/getchats`, chat)
            if (res.data.success) {
                setChats(res.data.chats.chats)
                console.log(res)
                toast.success(res.data.message)
            }
            else {
                toast.success(JSON.stringify(res))
                console.log("failed to fetch chats")
            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getchats();
    }, [])

    const sendoffer = async () => {

        try {
            const pid = params.pid;
            const sentBy = auth?.user?._id;
            const recievedby =selecteduser.uid
            const sentname = auth?.user?.name
            const quantityUnit = product.quantityUnit
            const phone = auth?.user?.phone
            const rating = auth?.user?.rating
            const address = auth?.user?.address

            console.log(quantityUnit)




            // const propose=await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/proposalsent`,{pid})


            const obj = { pid, sentBy, recievedby, sentname, phone, quantity, quantityUnit, price, notes, date, rating, address }
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/propose-offer`, obj)
            if (res.data.success) {
                console.log("done")
                toast.success("done")
                getchats();
            }
        } catch (error) {
            toast.error("not done")
            console.log(error)
        }
    }


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
                            <NavLink to="/dashboard/user/proposals-recieved">Proposals Recieved </NavLink>
                        </li>
                        <li className="breadcrumb-item">
                            <NavLink to="/dashboard/user/proposals-recieved">Responses </NavLink>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {params.pid}
                        </li>
                    </ol>
                </nav>
            </>
        );
    };

    if (loading) {
        <>
            <Nav />
            <Breadcrumb />
            <div className="container" style={{ minHeight: "50vh" }}>
                <Spinner />
            </div>
            <Footer />

        </>
    }
    return (
        <>
            <Nav />
            <Breadcrumb />
            <div className="container mb-3" style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", minHeight: "50vh" }}>
                <div className="col-3" style={{ border: "solid 1px black" }}>
                    <div className='text-center mt-2 fw-bolder text-muted'>Responded users</div>
                    {
                        responses.map((res, index) => (
                            <div key={index} className='card'>
                                <p className='m-1' style={{ fontSize: "0.9rem", margin: "0", padding: "0" }}><i className="fa-solid fa-user mx-2"></i>{res.sentname}</p> {/* Render the sentname property */}
                                <p className='m-1' style={{ fontSize: "0.9rem", margin: "0", padding: "0" }}><i className="fa-solid fa-phone mx-2"></i>{res.phone}</p> {/* Render the sentname property */}
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <button style={{ margin: "0" }} className='btn btn-sm btn-primary m-1' onClick={() => { navigate(`/dashboard/user/profile/${res.sentBy}`) }}>View Profile</button>
                                    <button
                                        style={{ margin: "0" }}
                                        className='btn btn-sm btn-primary m-1'
                                        onClick={() => {
                                            setloading(true);

                                            setTimeout(() => {
                                                setloading(false);
                                                setselecteduser({
                                                    uid: res.sentBy,
                                                    name: res.sentname
                                                });

                                            }, 2000);

                                        }}
                                    >
                                        chat
                                    </button>


                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="col-9" style={{ display: "flex", flexDirection: "column", minHeight: "40vh" }}>
                    <div style={{ display: "flex", flexDirection: "column", border: "solid 1px black", height: "60vh" }}>
                        <div className="card" style={{ margin: "5px", padding: "5px", background: "violet" }}>
                            <p><i className="fa-solid fa-user m-2"></i> {selecteduser.name} ({selecteduser.uid})</p>
                        </div>
                        <div className="container" style={{overflowY:"auto"}}>
                        {chats.map((chat, index) => (
                                    <div
                                        key={index}
                                        className="card"
                                        style={{
                                            width: "15rem",
                                            marginLeft: auth?.user?._id === chat.sentBy ? "500px" : "0",
                                            background:auth?.user?._id === chat.sentBy ? "red" : "cyan",
                                            color:auth?.user?._id === chat.sentBy ? "white" : "0",
                                        }}
                                    >
                                        <p style={{margin:"0",padding:"0"}}>{chat.quantity} {chat.quantityUnit} required by {chat.date} with &#8377;{chat.price} per {chat.quantityUnit}</p>
                                        
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className='mt-1' style={{ border: "solid 1px black", minHeight: "15vh" }}>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div className="p-1 m-1">
                                <input
                                    type="number"
                                    required={true}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    style={{ borderRadius: "5px" }}
                                    className="p-1 m-1"
                                    placeholder="Required quantity"
                                />{" "}
                                <label htmlFor=""> {product?.quantityUnit}s</label>
                            </div>
                            <div className="p-1 m-1">
                                Rs.{" "}
                                <input
                                    type="number"
                                    required={true}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    style={{ borderRadius: "5px" }}
                                    className="p-1 m-1"
                                    placeholder="Offered price"
                                />{" "}
                                per {product?.quantityUnit}
                            </div>
                            <div className="p-1 m-1">
                                Required date:
                                <input
                                    type="date"
                                    id="requiredDate"
                                    value={date} // Ensure that the value is in the correct format for date input
                                    onChange={(e) => setDate(e.target.value)}
                                    className="p-1 my-1 mx-2"
                                    style={{ borderRadius: "5px" }}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className="p-1 m-1" style={{ width: "80%" }}>
                                Notes :
                                <input
                                    type="text"
                                    id="notes"
                                    required={true}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    style={{ borderRadius: "5px", width: "90%" }}
                                    className="p-1 m-1"
                                    placeholder="Some notes..."
                                />
                            </div>

                            <button className="btn btn-sm btn-primary mt-3 mx-1" style={{ height: "35px" }} onClick={() => sendoffer()}>send offer</button>
                            <button className="btn btn-sm btn-success mt-3 mx-1" style={{ height: "35px" }}>Accept offer</button> {/*  on clicking on accept offer the response should be sent to sellers transactos page */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Responses