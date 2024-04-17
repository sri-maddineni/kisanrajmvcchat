import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { RiWhatsappFill } from "react-icons/ri";
import { FaShareAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { toast } from "react-hot-toast"
import AuthContext from '../../../context/AuthContext';
import axios from 'axios';
import LoginModel from '../../Models/LoginModel';



export const Prod = (props) => {
    const [auth, setAuth] = useContext(AuthContext)
    const p = props.product
    const navigate = useNavigate();

    const [clicked, setClicked] = useState(false);

    const addtoorders = async (itemid) => {

        try {
            const buyer = auth?.user?._id;
            // let seller=JSON.stringify(itemid.sellerId.toString());
            //  seller = seller.substring(1, seller.length - 1);

            const seller = JSON.stringify(itemid.sellerId)

            const details = { itemid, buyer, seller }
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/addtoorders`, details)

            removefromwishlist(itemid)

            if (res.data.success) {
                toast.success("add to cart successfully!")
            }

        } catch (error) {
            toast.error("something went wrong")
            console.log(error)
        }
    }



    const removefromwishlist = async () => {

    }








    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        toast("Please login to add to wishlist");
        setShowModal(true); // Open the modal
    };


    return (
        <>
            <div
                className="card m-3 text-center"
                style={{ width: "15rem", maxHeight: "380px" }}
                key={p._id}>
                <span
                    className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-light"
                    style={{ left: "90%", zIndex: "1" }}>
                    {" "}
                    {p?.commodityId?.category}
                </span>
                <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ objectFit: "cover", maxHeight: "139px" }} />
                <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "0.9rem", fontWeight: '700' }}>
                        {p.organic ? "Organic" : "Inorganic"} {p.name}{" "}
                        <i className='m-2' style={{ cursor: "pointer" }} onClick={() => setShowModal(true)}>
                            <FaRegHeart />
                        </i>
                        <LoginModel showModal={showModal} setShowModal={setShowModal} />

                        <br />
                        <i className='text-warning'><FaStar /><FaStar /><FaStar /><FaStar /></i>
                        {/* {p.quality}
                        <i className="fa-solid fa-star text-warning"></i> */}
                        <br />

                    </h5>

                    <p className="card-text" style={{ fontSize: "1rem", margin: "0" }}>
                        <span>
                            <span className='text-danger fw-bolder'>&#8377;{p.price}/- per {p.quantityUnit}</span>
                            <br />
                            <span className='text-muted fw-bold'>{p.quantity} {p.quantityUnit}s available</span>
                        </span>
                        <br />
                        <span className='my-1'>{p.description ? p.description.substr(0, 20) + "..." : null}</span>
                    </p>


                    {/* <div className="icons my-2" style={{ color: "#000000" }}>
                        <a href={`https://wa.me/91${p.sellerId.phone}`} className='mx-2' target="_blank" style={{ color: "#000000" }}>
                            <i style={{ color: "#000000" }}><RiWhatsappFill /></i>
                        </a>
                        <i className="fa-solid fa-phone mx-2" style={{ cursor: "pointer" }} ></i>
                        <i className='mx-2' style={{ cursor: "pointer" }}><FaShareAlt /></i>

                    </div> */}

                    <div className="mt-1">
                        <button className="btn btn-sm btn-primary mx-1" onClick={() => navigate(`/dashboard/user/buy-commodity/${p.commodityId.slug}/${p._id}`)}>view details</button>
                        <button className="btn btn-sm btn-primary mx-1" onClick={() => navigate(`/dashboard/user/buy-commodity/${p.commodityId.slug}/${p._id}`)}>order it</button>
                    </div>



                </div>

            </div>

        </>
    )
}


const ProductCard = (props) => {
    const p = props.product

    const navigate = useNavigate();
    const [auth] = useContext(AuthContext)
    

    const [clicked, setClicked] = useState(props.wish);

    const handleClick = (pid) => {
        if (auth?.user) {
            setClicked(!clicked);
            if (clicked) {
                removefromwishlist(pid);
            }
            else {
                addtoWishlist(pid);
            }
        } else {
            toast("Please login first");
            navigate("/login");
        }
    };

    const addtoWishlist = async (pid) => {

        try {
            //requirement routes
            const url = `${process.env.REACT_APP_API}/api/v1/requirements/addtowishlist`
            const data = { uid: auth?.user?._id, pid: pid }
            axios.post(url, data)
                .then(response => {
                    response ? toast.success(response.data.message) : toast.error("failed");
                    console.log(response)

                })
                .catch(error => {
                    // handle error
                    toast.error(error)
                });

        } catch (error) {

        }
    }




    const addtoorders = async (itemid) => {

        try {
            //   const buyer = auth?.user?._id;
            // let seller=JSON.stringify(itemid.sellerId.toString());
            //  seller = seller.substring(1, seller.length - 1);

            //   const seller = JSON.stringify(itemid.sellerId)

            //   const details = { itemid, buyer, seller }
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/products/addtoorders`, { itemid })

            removefromwishlist(itemid)

            if (res.data.success) {
                toast.success("add to cart successfully!")
            }

        } catch (error) {
            toast.error("something went wrong")
            console.log(error)
        }
    }



    const removefromwishlist = async () => {

    }




    return (
        <>
            <div
                className="card m-3 text-center"
                style={{ width: "15rem", maxHeight: "380px" }}
                key={p._id}>
                <span
                    className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-light"
                    style={{ left: "90%", zIndex: "1" }}>
                    {" "}
                    {p?.commodityId?.category}
                </span>
                <img
                    src={`/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ objectFit: "cover", maxHeight: "139px" }} />
                <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "0.9rem", fontWeight: '700' }}>
                        {p.organic ? "Organic" : "Inorganic"} {p.name}{" "}
                        <i className={`m-2 ${clicked ? "text-danger" : ""}`} style={{ cursor: "pointer" }} onClick={() => { handleClick(p._id) }}>
                            {clicked ? <FaHeart /> : <FaRegHeart />}
                        </i>

                        <br />
                        <i className='text-warning'><FaStar /><FaStar /><FaStar /><FaStar /></i>
                        {/* {p.quality}
                        <i className="fa-solid fa-star text-warning"></i> */}
                        <br />

                    </h5>

                    <p className="card-text" style={{ fontSize: "1rem", margin: "0" }}>
                        <span>
                            <span className='text-danger fw-bolder'>&#8377;{p.price}/- per {p.quantityUnit}</span>
                            <br />
                            <span className='text-muted fw-bold'>{p.quantity} {p.quantityUnit}s available</span>
                        </span>
                        <br />
                        <span className='my-1'>{p.description ? p.description.substr(0, 20) + "..." : null}</span>
                    </p>

                    <div className="icons my-2" style={{ color: "#000000" }}>
                        <a href={`https://wa.me/91${p.sellerId.phone}`} className='mx-2' target="_blank" style={{ color: "#000000" }}>
                            <i style={{ color: "#000000" }}><RiWhatsappFill /></i>
                        </a>
                        <i className="fa-solid fa-phone mx-2" style={{ cursor: "pointer" }} ></i>
                        <i className='mx-2' style={{ cursor: "pointer" }}><FaShareAlt /></i>

                    </div>

                    <div className="btns">
                        <button className="btn btn-sm btn-primary mx-1" onClick={() => navigate(`/dashboard/user/buy-commodity/${p.commodityId.catslug}/${p.commodityId.slug}/${p._id}`)}>view details</button>
                        <button className="btn btn-sm btn-primary mx-1" onClick={() => { addtoorders(p._id) }}>order it</button>
                    </div>

                </div>

            </div>

        </>
    )
}

export default ProductCard