import React, { useContext, useEffect, useRef, useState } from "react";
import Footer from "../../components/layouts/Footer";
import axios from "axios";
import toast from "react-hot-toast";
import { format } from "date-fns"
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Nav from "../../components/UIComponents/Nav";
import Spinner from "../../components/UIComponents/Spinner";


const Responses = () => {
    const params = useParams();

    const [proposal, setProposal] = useState([]);
    const [proposalsRecieved, setProposalsRecieved] = useState([])   // to propose a new offer by seller to buyer for negotiation

    const [product, setProduct] = useState({}); //for product details maintenance

    const [leads, setLeads] = useState([]);

    const [auth, setAuth] = useContext(AuthContext);//to maintain user state and logged-in details for profile page

    const [responsesState, setResponsesState] = useState(true)

    const [quantity, setquantity] = useState("")        //these are for new proposal or negotiation details
    const [price, setprice] = useState("")
    const [date, setdate] = useState("")
    const [notes, setnotes] = useState("")

    const [chats, setChats] = useState([])
    const [chatState, setChatState] = useState(false)
    const [chatload, setChatload] = useState(true)

    const [loading, setLoading] = useState(true)

    const [selectedProposal, setSelectedProposal] = useState("")

    const formattedDater = (timestamp) => {
        return format(new Date(timestamp), 'dd-MMM hh:mm a');
    }



    const navigate = useNavigate("");

    const getPotentials = async (productName) => {
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/get-product-potentials`, { productName });

            if (response?.data.success) {
                setLeads(response.data.potentials);
            } else {
                console.log("if else case");
            }
        } catch (error) {
            console.log(error)
            console.log("somethig wrong");
        }
        finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        getPotentials(product.name);
    }, [])

    const formattedDate = product.createdAt ? format(new Date(product.createdAt), 'dd MMM yyyy') : '';

    const pid = params.pid;

    const getProductData = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product/${pid}`);

            if (data?.success) {
                const proposalsReceived = data.product?.sellerId?.proposalsReceived?.[pid] || [];
                setProduct(data.product);
                setProposal(proposalsReceived);
            } else {
                console.log("Failed to get product data");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Failed to get product data responses");
        }
        finally {
            setLoading(false)
        }
    };


    useEffect(() => {
        getProductData();
    }, [])


    //chat click means post
    const postoffer = async () => {

        const sentBy = auth?.user?._id
        const pid = product?._id
        const sellerId = sentBy
        const toId = selectedProposal?.sentBy
        const qunit = product.quantityUnit


        console.log(toId)

        const chatData = { pid, sentBy, toId, sellerId, quantity, qunit, price, notes, date }

        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/chats/post-chat`, chatData)

            if (res.data.success) {
                toast.success("success posted chat")
                getChats(auth?.user?._id, selectedProposal?.pid, selectedProposal.sentBy)

            }
        } catch (error) {
            toast.error("failed to post chat")
            console.log(error)
        }
    }




    const getProposalsRecieved = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/${auth?.user?._id}`)
            if (res.data.success) {
                const pid = params.pid
                console.log(pid)
                setProposalsRecieved(res.data.user.proposalsReceived[pid])
                console.log(res.data.user.proposalsReceived[pid])
            }
            else {
                console.log("failed to get pid proposals")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProposalsRecieved();
    }, [])

    const endref = useRef(null)




    const getChats = async (sby, pidd, uidd) => {
        setChatload(true)
        try {

            const pid = pidd
            const uid = uidd
            const sentBy = sby
            const result = await axios.post(`${process.env.REACT_APP_API}/api/v1/chats/getchats`, { pid, uid, sentBy })

            // toast.success(uid)

            if (result.data.success) {
                console.log((result.data.chats))
                setChats(result.data.chats.chats)

            }
            else {
                toast.error("not done")
            }

        } catch (error) {
            console.log(error)
            toast.error("error")
        }
        finally {
            setChatload(false)
        }
    }

    useEffect(() => {
        endref?.current?.scrollIntoView();
    }, [])




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
            <div className="container-fluid">
                <div className="row">

                    <div style={{ minHeight: "50vh" }}>
                        <div className="titler">
                            <div className="topper p-3">
                                <div style={{ flexDirection: "column" }}>
                                    <p>
                                        <span className="text-primary m-2" style={{ fontWeight: "500", fontSize: "1.5rem" }}>
                                            {product.name}
                                        </span>{" "}
                                        <span className="text-warning bg-dark">Rs.{product.price}/-</span> per {" "} {product.quantityUnit}{" "}
                                        <span className="bg-warning">{product.quantity} {product.quantityUnit}s available</span> Lot id: <span className="text-danger">{product._id} </span>{" "}
                                        Posted on : <span className="text-info">{formattedDate}</span>{" "}
                                    </p>
                                    <div className="buttons">
                                        <button className="btn btn-lg btn-warning m-1" style={{ width: "49%" }} onClick={() => {
                                            setResponsesState(true)
                                        }}>
                                            Buyer Responses
                                        </button>
                                        <button className="btn btn-lg btn-warning m-1" style={{ width: "49%" }} onClick={() => {
                                            setResponsesState(false)

                                            getPotentials(product.name);

                                        }}>
                                            Potential Leads
                                        </button>
                                    </div>
                                    <>{
                                        responsesState && (
                                            <div className="container">
                                                <div className="text-center h1">
                                                    Responses
                                                </div>



                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <div className="left col-3" style={{ minHeight: "10vh" }}>
                                                        {proposalsRecieved.map((proposal, index) => (
                                                            <div className="card" style={{ cursor: "pointer" }} onClick={() => { setChatState(true); setSelectedProposal(proposal); }}>
                                                                <p style={{ fontSize: "0.9rem" }}><i className="fa-solid fa-user mx-2"></i>{proposal.name} <i className="mx-2 fa-solid fa-clock"></i> {proposal.date}</p>
                                                                <div style={{ fontSize: "0.95rem" }}>Rs. <span className="text-muted" style={{ fontWeight: "600" }}>{proposal.price ? proposal.price : "NA"}</span>/- per {proposal?.quantityUnit} <span className="bg-warning px-1">{proposal.quantity} {proposal.quantityUnit}s needed</span> </div>
                                                                <div style={{ fontSize: "0.9rem" }}>Note : {proposal.notes}</div>
                                                                <div className="row">
                                                                    <div className="btns">
                                                                        <div className="btn btn-sm btn-primary m-1">contact</div>
                                                                        <div className="btn btn-sm btn-primary m-1" onClick={() => navigate(`/dashboard/users/${proposal.sentBy}`)}>profile</div>
                                                                        <div className="btn btn-sm btn-primary m-1" onClick={() => {
                                                                            setChatState(true);
                                                                            setSelectedProposal(proposal);

                                                                            getChats(proposal.sellerId, product._id, proposal.buyerId);
                                                                            //auth?.user?._id,selectedProposal?.sentBy,selectedProposal.pid
                                                                        }}>chat</div>


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>


                                                    <div className="right col-9" style={{ minHeight: "10vh", display: "flex", flexDirection: "column", border: "solid 1px black" }}>
                                                        <div style={{ minHeight: "60vh", borderBottom: "solid 1px black" }}>
                                                            {chatState && selectedProposal ? (

                                                                <>
                                                                    <div className="card" style={{ display: "flex", flexDirection: "row", backgroundColor: "cyan", margin: "none" }}>
                                                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                                                            <p className="m-2"><i className="fa-solid fa-user"></i> : {selectedProposal.name}</p>
                                                                            <p className="m-2">Required Date: {selectedProposal.date}</p>
                                                                            <p className="m-2">Unit Price offered: Rs. {selectedProposal.price} /- per {selectedProposal.quantityUnit}</p>
                                                                            <p className="m-2">Quantity: {selectedProposal.quantity} {selectedProposal.quantityUnit}s needed</p>
                                                                            <p className="m-2">Notes: {selectedProposal.notes}</p>
                                                                        </div>

                                                                    </div>


                                                                    <div className="card" style={{ width: "90%", minHeight: "40vh", maxHeight: "50vh", overflowY: "auto" }}>
                                                                        {
                                                                            chatload && <Spinner />
                                                                        }

                                                                        {chats.map((chat, index) => (
                                                                            <>
                                                                                <div style={{ marginLeft: chat.sentBy === auth?.user?._id ? "auto" : "20px", marginRight: chat.sentBy === auth?.user?._id ? "20px" : "auto" }}>
                                                                                    <div key={index} style={{ backgroundColor: chat.sentBy === auth?.user?._id ? "cyan" : "red", width: "15rem", color: chat.sentBy === auth?.user?._id ? "black" : "white" }} className="card">
                                                                                        <p className="card-text">quantity: {chat.quantity} {chat.qunit}s</p>
                                                                                        <p className="card-text">Price: {chat.price}</p>
                                                                                        <p className="card-text">Date: {chat.date}</p>
                                                                                        <p className="card-text">Notes: {chat.notes}</p>
                                                                                    </div>
                                                                                    <p style={{ fontSize: "0.8rem", marginLeft: "100px" }}>{formattedDater(chat.timestamp)}</p>
                                                                                </div>
                                                                            </>
                                                                        ))}

                                                                        <div className="" ref={endref}></div>

                                                                    </div>

                                                                </>


                                                            ) : (
                                                                <div className="text-center text-warning">
                                                                    <h1>
                                                                        Click on a response item to start chatting with buyer
                                                                    </h1>
                                                                </div>
                                                            )}
                                                        </div>


                                                        <div className="p-2">
                                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                                <div className="p-1 m-1">
                                                                    <input
                                                                        type="number"
                                                                        required={true}
                                                                        value={quantity}
                                                                        onChange={(e) => setquantity(e.target.value)}
                                                                        style={{ borderRadius: "5px" }}
                                                                        className="p-1 m-1"
                                                                        placeholder="Required quantity"
                                                                    />{" "}
                                                                    <label htmlFor="">{product?.quantityUnit}s</label>
                                                                </div>
                                                                <div className="p-1 m-1">
                                                                    Rs.{" "}
                                                                    <input
                                                                        type="number"
                                                                        required={true}
                                                                        value={price}
                                                                        onChange={(e) => setprice(e.target.value)}
                                                                        style={{ borderRadius: "5px" }}
                                                                        className="p-1 m-1"
                                                                        placeholder="Offered price"
                                                                    />{" "}
                                                                    per  {product?.quantityUnit}
                                                                </div>

                                                                <div className="p-1 m-1">
                                                                    Required date:{" "}
                                                                    <input
                                                                        type="date"
                                                                        required={true}
                                                                        value={date}
                                                                        onChange={(e) => setdate(e.target.value)}
                                                                        style={{ borderRadius: "5px" }}
                                                                        className="p-1 m-1"
                                                                        placeholder="Required date"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                                                <div style={{ flex: "1", marginRight: "10px" }}>
                                                                    <input
                                                                        type="text"
                                                                        required={true}
                                                                        value={notes}
                                                                        onChange={(e) => setnotes(e.target.value)}
                                                                        style={{ borderRadius: "5px", width: "100%" }}
                                                                        placeholder="Some notes..."
                                                                        className="p-1"
                                                                    />
                                                                </div>

                                                                <button className='btn btn-sm btn-primary m-3' onClick={() => {
                                                                    postoffer();
                                                                    getChats(selectedProposal.sellerId, product._id, selectedProposal.buyerId); //auth?.user?._id,selectedProposal?.sentBy,selectedProposal.pid

                                                                }}>Post offer</button>
                                                            </div>


                                                        </div>

                                                    </div>
                                                </div>




                                            </div>
                                        )
                                    }



                                        {
                                            !responsesState && (
                                                <div className="container">
                                                    <h1 className="text-center">Potential Leads</h1>
                                                    {leads.length ?
                                                        (<div className="row"
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                flexWrap: "wrap",
                                                                justifyContent: "space-around",
                                                            }}>
                                                            {leads.map((lead, index) => (
                                                                <div className="card p-1 m-1" key={index}>
                                                                    <div className="d-flex justify-content-between">

                                                                        <p>Quantity Required : {lead.quantity} {lead.quantityUnit}</p>
                                                                        <p className="">Cost offered : {lead.price}/- ( Rs.{lead.price / lead.quantity} per {lead?.quantityUnit} )</p>

                                                                        <div className="card mx-2 p-1" style={{ width: "30%", display: "flex", flexDirection: "column" }}>
                                                                            <div style={{ display: "flex", flexDirection: "row" }} >
                                                                                <div style={{ width: "30%" }}>
                                                                                    <i className="fa-solid fa-circle-user fa-2x p-1"></i>
                                                                                </div>
                                                                                <div className="p-1" style={{ width: "70%" }}>
                                                                                    <p style={{ fontSize: "15px" }}>{lead.buyerId?.name}</p>
                                                                                </div>
                                                                            </div>
                                                                            <div>
                                                                                <button className="btn btn-primary btn-sm m-1">Accept</button>

                                                                                <i className="fa-solid fa-phone m-2" style={{ cursor: "pointer" }}></i>
                                                                                <i className="fa-brands fa-whatsapp m-2" style={{ cursor: "pointer" }}></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            ))}
                                                        </div>
                                                        ) : <>
                                                            <div className="text-center">
                                                                <button className="btn btn-danger">0 Potential leads found</button></div></>}
                                                </div>

                                            )
                                        }
                                    </>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />

        </>
    );
};

export default Responses;
