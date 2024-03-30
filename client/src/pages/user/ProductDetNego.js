import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Spinner from '../../components/UIComponents/Spinner';
import { format } from 'date-fns';

const ProductDetNego = () => {
    const [auth, setAuth] = useContext(AuthContext);

    const params = useParams();
    const [product, setProduct] = useState(null);
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [notes, setNotes] = useState('');
    const [quantity, setQuantity] = useState('');
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatLoad, setChatLoad] = useState(true);

    const messageendref = useRef(null)

    const formattedDate = (timestamp) => {
        return format(new Date(timestamp), 'dd-MMM hh:ss a');
    }

    const getProductData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product/${params.id}`);
            if (res.data.success) {
                setProduct(res.data.product);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const postOffer = async () => {
        setLoading(true);
        const sentBy = auth?.user?._id;
        const pid = product?._id;
        const sellerId = product?.sellerId._id;
        const toId = sellerId;
        const quantityUnit = product?.quantityUnit;


        const chatData = { pid, sentBy, toId, sellerId, quantity, price, notes, date, quantityUnit };

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/chats/post-chat`, chatData);
            if (res.data.success) {
                toast.success("Success posted chat");
                getChats();
            }
        } catch (error) {
            toast.error("Failed to post chat");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        messageendref?.current?.scrollIntoView();
    }, [chats])

    const proposeOffer = async () => {
        setLoading(true);
        const pid = product._id;
        const sentBy = auth?.user?._id;
        const buyerId = sentBy;
        const sellerId = product?.sellerId?._id;
        const name = auth?.user?.name;
        const quantityUnit = product?.quantityUnit;
        const proposedata = { pid, sentBy, quantity, price, notes, date, buyerId, sellerId, name, quantityUnit };

        try {
            const result = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/propose-offer`, proposedata);
            if (result.data.success) {
                setNotes('');
                setPrice('');
                setDate('');
                setQuantity('');
                toast.success(result.data.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getChats = async () => {
        setChatLoad(true);
        try {
            const pid = product._id;
            const uid = auth?.user?._id;
            const sentBy = product?.sellerId?._id;
            const result = await axios.post(`${process.env.REACT_APP_API}/api/v1/chats/getchats`, { pid, uid, sentBy });

            if (result.data.success) {
                setChats(result.data.chats.chats);
            } else {
                toast.error("Not done");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error");
        } finally {
            setChatLoad(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    useEffect(() => {
        getChats();
    }, [product]);

    if (loading) {
        return (
            <>
                <Nav />
                <div className="container" style={{ minHeight: "50vh" }}>
                    <Spinner />
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Nav />
            <div className="c" style={{ minHeight: "50vh" }}>
                <div className="d-flex justify-content-around">
                    <div className="cls">
                        <div className="card">
                            <div className="img">
                                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-light" style={{ left: "90%", zIndex: "1" }}>
                                    {product?.commodityId?.category}
                                </span>
                                <img src={`/api/v1/products/product-photo/${product._id}`} alt="" />
                            </div>
                            <div className="card-body">
                                <div className="card-title d-flex justify-content-around">
                                    <p>{product.name}</p>
                                    <p>rated : {product.quality} <i className='fa-solid fa-star text-warning'></i></p>
                                </div>
                                <p>Quantity Available : {product.quantity} {product.quantityUnit}s</p>
                                <p style={{ fontWeight: "700" }}>Unit Price : Rs. {product.price} /- per {product.quantityUnit}</p>
                                <div className="card">
                                    <div style={{ display: "flex", flexDirection: "column", }}>
                                        <div className="profile" style={{ display: "flex", flexDirection: "row", }}>
                                            <p><i className='fa-solid fa-user'></i></p>
                                            <p className='mx-2'>seller name: <span style={{ fontWeight: "700" }}>{product?.sellerId?.name}</span></p>
                                        </div>
                                        <div className="contact" style={{ display: "flex", flexDirection: "row", }}>
                                            <Link to={`/dashboard/users/profile/${product?.sellerId?._id}`}><button className='btn btn-sm btn-primary me-1'>view profile</button></Link>
                                            <p className='fa-brands fa-whatsapp m-2'></p>
                                            <p className='fa-solid fa-phone m-2 fa-1x'></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <button className='btn btn-primary btn-sm text-center m-2' onClick={() => { getChats(); }}>Refresh Negotiation history</button>
                        <div className="card m-1" style={{ width: "90%", minHeight: "40vh", maxHeight: "50vh", overflowY: "auto" }}>
                            {chatLoad && <Spinner />}
                            {!chatLoad && chats.map((chat, index) => (
                                <>
                                    <div style={{marginLeft: chat.sentBy === auth?.user?._id ? "auto" : "20px", marginRight: chat.sentBy === auth?.user?._id ? "20px" : "auto"}}>
                                        <div key={index} className="card" style={{ width: "15rem", color: chat.sentBy === auth?.user?._id ? "black" : "white", backgroundColor: chat.sentBy === auth?.user?._id ? "cyan" : "red", marginLeft: chat.sentBy === auth?.user?._id ? "auto" : "20px", marginRight: chat.sentBy === auth?.user?._id ? "20px" : "auto" }}>
                                            <p style={{ fontSize: "0.9rem" }} className="card-text">Qty: {chat.quantity}</p>
                                            <p style={{ fontSize: "0.9rem" }} className="card-text">Price: {chat.price}</p>
                                            <p style={{ fontSize: "0.9rem" }} className="card-text">Date: {chat.date}</p>
                                            <p style={{ fontSize: "0.9rem" }} className="card-text">Notes: {chat.notes}</p>

                                        </div>
                                        <p style={{ margin: "none", fontSize: "0.7rem" }}>{formattedDate(chat.timestamp)}</p>
                                    </div>


                                </>
                            ))}

                            <div ref={messageendref} />

                        </div>
                        <div className="card">
                            <div className="" style={{ display: "flex", flexDirection: "row" }}>
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
                            </div>
                            <div className="" style={{ display: "flex", flexDirection: "row" }}>
                                <div className="p-1 m-1">
                                    Required date:{" "}
                                    <input type="date" value={date+"T00:00:00.000+00:00"} placeholder='Available date' className='form-control' onChange={(e) => setDate(e.target.value)} />
                                </div>
                                <div className="p-1 m-1">
                                    <input
                                        type="text"
                                        required={true}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        style={{ borderRadius: "5px" }}
                                        className="p-1"
                                        placeholder="Some notes..."
                                    />
                                </div>
                                <button className='btn btn-sm btn-primary m-3' onClick={postOffer}>Post offer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetNego;
