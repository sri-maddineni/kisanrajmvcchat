import React, { useContext, useEffect, useState } from 'react'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { IoArrowBackCircle } from 'react-icons/io5'
import Spinner from '../../components/UIComponents/Spinner'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Responses = () => {

    const params = useParams()

    const [loading, setloading] = useState(false)
    const [date, setDate] = useState("")
    const [price, setPrice] = useState("")
    const [notes, setNotes] = useState("")
    const product = params.pid;
    const [quantity, setQuantity] = useState("")

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
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/profile/basic/${uid}`);
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

    const sendoffer = () => {

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
                                <p style={{ fontSize: "0.9rem" }}><i className="fa-solid fa-user mx-2"></i>{res.sentname}</p> {/* Render the sentname property */}
                                <p style={{ fontSize: "0.9rem" }}><i className="fa-solid fa-phone mx-2"></i>{res.phone}</p> {/* Render the sentname property */}
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <button className='btn btn-sm btn-primary m-1' onClick={() => { navigate(`/dashboard/user/profile/${res.sentBy}`) }}>View Profile</button>
                                    <button className='btn btn-sm btn-primary m-1'>chat</button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="col-9" style={{ display: "flex", flexDirection: "column", minHeight: "40vh" }}>
                    <div style={{ border: "solid 1px black", minHeight: "50vh" }}>

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