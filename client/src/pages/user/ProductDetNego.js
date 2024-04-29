import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import toast from 'react-hot-toast';
import Spinner from '../../components/UIComponents/Spinner';
import { format } from 'date-fns';
import { Modal } from 'antd';
import ProductCard from '../../components/CardRelated/buycommodity/ProductCard';

const ProductDetNego = () => {
    const [auth, setAuth] = useContext(AuthContext);

    const params = useParams();
    const [product, setProduct] = useState(null);


    const [date, setDate] = useState('');
    const [price, setPrice] = useState("");
    const [notes, setNotes] = useState('');
    const [quantity, setQuantity] = useState('');


    const [chats, setChats] = useState([]);

    const [loading, setLoading] = useState(true);
    const [chatLoad, setChatLoad] = useState(true);
    const [othersellers, setothersellers] = useState([])
    const [proposals, setproposals] = useState([])

    const [postbtn, setpostbtn] = useState(false)

    const [start, setStart] = useState(false)

    const [isClicked, setIsclicked] = useState(false)



    const messageendref = useRef(null)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {

        setIsModalOpen(false);

    };
    const handleCancel = () => {

        setIsModalOpen(false);

    };




    const formattedDate = (timestamp) => {
        return format(new Date(timestamp), 'dd-MMM hh:mm a');
    }

    // const authdata = async () => {
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API}/api/users/${auth?.user?._id}`)
    //         if (res.data.success) {
    //             setproposals(res?.data?.user?.proposalsSentids)
    //             console.log(res.data.user)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     authdata();
    // }, [])

    useEffect(() => {
        messageendref.current?.scrollIntoView();
    }, [chats])

    useEffect(() => {
        messageendref.current?.scrollIntoView();
    }, [])

    const getProductData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product/${params.pid}`);
            if (res.data.success) {
                setProduct(res.data.product);

            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, [])

    const getchats = async () => {
        try {
            const pid = params.pid;
            const buyer = auth?.user?._id;
            const seller = product?.sellerId?._id;
            const chat = { pid, seller, buyer }

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/chats/getchats`, chat)
            if (res.data.success) {
                setChats(res.data.chats.chats)
                console.log(res)
                messageendref.current?.scrollIntoView();
            }
            else {
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
            const recievedby = product.sellerId._id
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
                setQuantity("")
                setPrice("")
                setDate("")
                setNotes("")
                getchats();
            }
        } catch (error) {
            toast.error("not done")
            console.log(error)
        }
    }




    const Breadcrumb = () => {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to="/dashboard/user/buy-commodity/all">buy-commodity</NavLink></li>
                    <li className="breadcrumb-item"><NavLink to={`/dashboard/user/buy-commodity/${product?.commodityId?.catslug}`}>{product?.commodityId?.category}</NavLink></li>

                    <li className="breadcrumb-item active" aria-current="page">product details - {product?.name}</li>
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
        );
    }


    const ChatContainer = () => {
        return (
            <>

                <div style={{ display: "flex", flexDirection: 'column', width: "60%" }}>
                    <div className='mt-4 pb-3' style={{ border: "solid 1px black", height: "50vh", overflowY: "auto" }}>
                        <div className="bg-warning">
                            <p className='p-1'>{product.sellerId?.name}</p>
                        </div>
                        <div style={{ height: "50vh", }}> {/* Subtracting button height */}
                            {chats.map((chat, index) => (
                                <div
                                    key={index}
                                    className="card"
                                    style={{
                                        width: "20rem",
                                        marginLeft: auth?.user?._id === chat.sentBy ? "550px" : "",
                                        background: auth?.user?._id === chat.sentBy ? "red" : "cyan",
                                        color: auth?.user?._id === chat.sentBy ? "white" : "0",
                                    }}
                                >
                                    <p style={{ margin: "0", padding: "0" }}>{chat.quantity} {chat.quantityUnit} required by {chat.date} with &#8377;{chat.price} per {chat.quantityUnit}</p>
                                </div>
                            ))}
                            <div className="refcont" ref={messageendref}></div>


                        </div>
                    </div>


                    <div className="format my-1" style={{ border: "dotted 1px black", display: 'flex', flexDirection: 'column' }}>
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

                            <button className="btn btn-sm btn-primary m-3" onClick={() => sendoffer()}>send offer</button>
                            <button className="btn btn-sm btn-success m-3">Accept offer</button> {/*  on clicking on accept offer the response should be sent to sellers transactos page */}
                        </div>
                    </div>


                </div>
            </>
        )
    }


    const LeftDetailsProduct = () => {
        return (
            <>
                <div className="cls" style={{ width: "35%" }}>
                    <div className="card" style={{ width: "20rem" }}>
                        <div style={{ position: "relative" }}>
                            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-light" style={{ left: "90%", zIndex: "1" }}>
                                {product?.commodityId?.category}
                            </span>
                            <img
                                src={`/api/v1/products/product-photo/${product._id}`}
                                alt="product image"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </div>

                        <div className="card-body">
                            <div className="card-title d-flex justify-content-between" style={{ margin: "0", padding: "0" }}>
                                <p>{product.organic ? "organic" : "inorganic"}</p>
                                <p>{product.name}</p>
                                <p>rated : {product.quality} <i className='fa-solid fa-star text-warning'></i></p>
                            </div>
                            <p className='text-muted fw-bolder' >Quantity Available : {product.quantity} {product.quantityUnit}s</p>
                            <p style={{ fontWeight: "700" }}>Unit Price : Rs. {product.price} /- per {product.quantityUnit}</p>
                            <div className="card">
                                <div style={{ display: "flex", flexDirection: "column", }}>
                                    <div className="profile" style={{ display: "flex", flexDirection: "row", }}>
                                        <p><i className='fa-solid fa-user'></i></p>
                                        <p className='mx-2'>seller : <span style={{ fontWeight: "700" }}>{product?.sellerId?.name}</span></p>
                                    </div>
                                    <div className="contact" style={{ display: "flex", flexDirection: "row", }}>
                                        <Link to={`/dashboard/user/profile/${product?.sellerId?._id}`}><button className='btn btn-sm btn-primary me-1'>view profile</button></Link>
                                        <p className='fa-brands fa-whatsapp m-2'></p>
                                        <p className='fa-solid fa-phone m-2 fa-1x'></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }

    const getOtherSellers = async () => {
        try {
            // Fetch products with the same name but different IDs
            const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/get-same-named`, { name: product.name, id: params.pid });


            if (response.data.success && !othersellers.length) {
                toast.success("Successfully fetched products from other sellers!");
                setothersellers(response.data.products)
                console.log(response.data.products)
            }

        } catch (error) {
            console.error(error);
            toast.error("Error fetching products from other sellers!");
        }
    }

    const OtherSellers = () => {

        getOtherSellers();

        return (
            <>
            
                <div className="container" style={{borderTop:"solid 1px black"}}>
                <h3 className='text-center'>Other sellers for {product.name}</h3>
                    {othersellers.map(p => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div>
            </>
        )

    };





    return (
        <>
            <Nav />
            <Breadcrumb />
            <div className="c" style={{ minHeight: "50vh" }}>
                <div style={{ display: 'flex', flexDirection: 'row', }}>

                    <LeftDetailsProduct />

                    <ChatContainer />

                </div>

                <OtherSellers />

            </div>

            <Modal title="Propose offer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Are you sure you want to propose offer?</p>
            </Modal>
            <Footer />
        </>
    );
};

export default ProductDetNego;
