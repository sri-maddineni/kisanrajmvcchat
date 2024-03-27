import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import toast from 'react-hot-toast';



const ProductDetNego = () => {

    const [auth, setAuth] = useContext(AuthContext)

    const params = useParams();
    const [product, setProduct] = useState("")

    const [date, setdate] = useState("");
    const [price, setprice] = useState("")
    const [notes, setnotes] = useState("")
    const [quantity, setquantity] = useState("")
  




    const getProductData = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/get-product/${params.id}`)
            console.log(res)
            if (res.data.success) {
                setProduct(res.data.product)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProductData();
    }, [])


    //chat click means post
    const postOffer = async () => {

        const sentBy = auth?.user?._id
        const pid = product?._id
        const sellerId = product?.sellerId._id
        const toId = sellerId

        

        const chatData = { pid, sentBy, sellerId, toId, quantity, price, notes, date}

        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/chats/post-chat`, chatData)

            if (res.data.success) {
                toast.success("success posted chat")

                proposeOffer();

            }
        } catch (error) {
            toast.error("failed to post chat")
            console.log(error)
        }
    }

    //for proposalsent and proposalsRecieved
    const proposeOffer = async () => {
        const pid = product._id;
        const sentBy = auth?.user?._id;
        const buyerId = sentBy;
        const sellerId = product?.sellerId?._id;
        const name=auth?.user?.name;
        const quantityUnit=product?.quantityUnit

        setdate(new Date(date).getTime() / 1000)

        console.log(date)

        

        const proposedata = { pid, sentBy, quantity, price, notes, date, buyerId, sellerId,name, quantityUnit }
        try {
            const result = await axios.post(`${process.env.REACT_APP_API}/api/v1/requirements/propose-offer`, proposedata)
            console.log(result)
            if(result.data.success){
                setnotes("")
                setprice("")
                setdate("")
                setquantity("")
                toast.success(result.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

   




    return (
        <>
            <Nav />
            <div className="c" style={{ minHeight: "50vh" }}>
                <div className="d-flex justify-content-around">
                    <div className="cls">
                        <div className="card">
                            <div className="img">
                                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-light" style={{ left: "90%", zIndex: "1" }}>{" "}
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
                        <button className='btn btn-primary btn-sm text-center m-2' >Refresh Negotiation history</button>
                        <div className="card" style={{ width: "90%", minHeight: "40vh", maxHeight: "50vh", overflowY: "auto" }}>

                        </div>


                        <div className="card">
                            <div className="" style={{ display: "flex", flexDirection: "row" }}>
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
                            </div>

                            <div className="" style={{ display: "flex", flexDirection: "row" }}>

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

                                <div className="p-1 m-1">
                                    <input
                                        type="text"
                                        required={true}
                                        value={notes}
                                        onChange={(e) => setnotes(e.target.value)}
                                        style={{ borderRadius: "5px" }}
                                        className="p-1"
                                        placeholder="Some notes..."
                                    />

                                </div>
                                <button className='btn btn-sm btn-primary m-3' onClick={() => {
                                    postOffer()
                                }}>Post offer</button>

                            </div>

                        </div>


                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductDetNego