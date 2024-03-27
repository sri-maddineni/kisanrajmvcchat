import React, { useContext, useEffect, useState } from "react";
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

    const [requirements, setRequirements] = useState([]);   //to fetch all requirements from requirements model

    const [auth, setAuth] = useContext(AuthContext);//to maintain user state and logged-in details for profile page

    const [open, setOpen] = useState(false);    //for modal in negotiate button

    const [requirement, setRequirement] = useState('')  //to attach details of requirement to it and use eg: requirement.productId
    const [responsesState, setResponsesState] = useState(true)

    const [negotiation, setnegotiation] = useState("")

    const [quantity, setquantity] = useState("")        //these are for new proposal or negotiation details
    const [price, setprice] = useState("")
    const [date, setdate] = useState("")
    const [notes, setnotes] = useState("")

    const [chats, setChats] = useState([])
    const [chatState, setChatState] = useState(false)

    const [loading, setLoading] = useState(true)

    const [selectedProposal, setSelectedProposal] = useState("")


    const navigate = useNavigate("");



    const handleOk = async (pid, buyerid) => {
        try {
            const sellerId = auth?.user._id;
            const productId = pid;
            const buyerId = buyerid;
            const sentBy = auth?.user?._id;

            const res2 = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/negotiate`, { quantity, price, date, notes, buyerId, sellerId, productId, sentBy });

            if (res2?.data.success) {
                toast.success("Offer proposed!");
                setOpen(false);
                setquantity("")
                setprice("")
                setdate("")
                setnotes("")
            }
        } catch (error) {
            console.log(error);
            toast.error("Propose failed!");
        }
    };

    useEffect(() => {
        getPotentials(product.name);
    }, [])












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


    const getUserData = async (uid) => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/uid`)
            if (result) {
                console.log("success")
            }
            else {
                console.log("response failed")
            }
        } catch (error) {
            console.log(error)
        }
    }




    const getProposalChatData = async (pid, sellerId, buyerId) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/chats/getProposedChatData`, { pid, sellerId, buyerId })
            console.log(data.chat)

        } catch (error) {
            console.log(error)
        }
    }


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
            <div className="container" style={{ display: "flex", flexDirection: "row" }}>
                <div className="left col-3 m-1" style={{ border: "solid 1px red", minHeight: "10vh" }}>
                    {proposalsRecieved.map((proposal, index) => (
                        <div className="card" style={{ cursor: "pointer" }} onClick={() => { setChatState(true); setSelectedProposal(proposal); }}>
                            <p style={{ fontSize: "0.9rem" }}><i className="fa-solid fa-user mx-2"></i>{proposal.name} <i className="mx-2 fa-solid fa-clock"></i> {proposal.date}</p>
                            <div style={{ fontSize: "0.95rem" }}>Rs. <span className="text-muted" style={{ fontWeight: "600" }}>{proposal.price ? proposal.price : "NA"}</span>/- per {proposal?.quantityUnit} <span className="bg-warning px-1">{proposal.quantity} {proposal.quantityUnit}s needed</span> </div>
                            <div style={{ fontSize: "0.9rem" }}>Note : {proposal.notes}</div>
                            <div className="row">
                                <div className="btns">
                                    <div className="btn btn-sm btn-primary m-1">contact</div>
                                    <div className="btn btn-sm btn-primary m-1" onClick={() => navigate(`/dashboard/users/${proposal.sellerId}`)}>profile</div>
                                    <div className="btn btn-sm btn-primary m-1" onClick={() => {
                                        setChatState(true);
                                        setSelectedProposal(proposal);
                                    }}>chat</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="right col-9 m-1" style={{ border: "solid 1px red", minHeight: "10vh" }}>
                    {chatState && selectedProposal ? (
                        <div style={{ display: "flex", flexDirection: "row", backgroundColor: "cyan", margin: "none", borderBottom: "1px solid red" }}>
                            <div style={{display:"flex",flexDirection:"row"}}>
                            <p className="m-2"><i className="fa-solid fa-user"></i> : {selectedProposal.name}</p>
                                <p className="m-2">Required Date: {selectedProposal.date}</p>
                                <p className="m-2">Unit Price offered: {selectedProposal.price} per {selectedProposal.quantityUnit}</p>
                                <p className="m-2">Quantity: {selectedProposal.quantity} {selectedProposal.quantityUnit}s needed</p>
                                <p className="m-2">Notes: {selectedProposal.notes}</p>
                            </div>
                            
                        </div>
                    ) : (
                        <div className="contaier text-center text-warning">
                            <h1>
                                Click on a response item to start chatting with buyer
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}



                                        {/*
                                        {responsesState && (
                                            <div className="container">
                                                <h1 className="text-center">Responses</h1>
                                                <div className="row">
                                                    {requirements.map((requirement, index) => (
                                                        <div className="card p-1 mx-2 mb-2" key={index}>
                                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                                <div className="p-2" style={{ width: "70%" }}>
                                                                    <div className="d-flex justify-content-between">
                                                                        <p>{product.name}</p>
                                                                        <p><i className="fa-regular fa-clock p-1"></i>{format(new Date(requirement.date), 'dd MMM yy')}</p>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between p-1" style={{ display: "flex", flexDirection: "row" }}>
                                                                        <p>Rs.{requirement.price} /- per {product.quantityUnit}</p>
                                                                        <p>Quantity : {requirement.quantity} {product.quantityUnit}s needed</p>
                                                                        <p>Description : {requirement.notes}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="card mx-2 p-1" style={{ width: "30%", display: "flex", flexDirection: "column" }}>
                                                                    <div style={{ display: "flex", flexDirection: "row" }} >
                                                                        <div style={{ width: "30%" }}>
                                                                            <i className="fa-solid fa-circle-user fa-2x p-1"></i>
                                                                        </div>
                                                                        <div className="p-1" style={{ width: "70%" }}>
                                                                            <p style={{ fontSize: "15px" }}>{requirement.sentBy.name}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <button className="btn btn-primary btn-sm m-1">Accept</button>
                                                                        <button onClick={() => showModal(requirement)} className="btn btn-primary btn-sm m-1">Negotiate</button>
                                                                        <i className="fa-solid fa-phone m-2" style={{ cursor: "pointer" }}></i>
                                                                        <i className="fa-brands fa-whatsapp m-2" style={{ cursor: "pointer" }}></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        */}
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
