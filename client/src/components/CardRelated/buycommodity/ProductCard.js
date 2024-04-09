import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { RiWhatsappFill } from "react-icons/ri";
import { FaShareAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import {toast} from "react-hot-toast"
import AuthContext from '../../../context/AuthContext';




export const Prod=(props)=>{
    const [auth]=useContext(AuthContext)
    const p = props.product
    const navigate = useNavigate();

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        {auth?.user ? setClicked(!clicked):toast("please login first")}
        navigate("/login")
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
                        <i className={`m-2 ${clicked ? "text-danger" : ""}`} style={{ cursor: "pointer" }} onClick={handleClick}>
                            {clicked ? <FaHeart /> : <FaRegHeart />}
                        </i>

                        <br />
                        <i className='text-warning'>{<FaStar />}.repeat({p.quality})<FaStar /><FaStar /><FaStar /></i>
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
                        <span className='my-1'>{p.description ? p.description.substr(0, 20)+"..." : null}</span>
                    </p>


                    {/* <div className="icons my-2" style={{ color: "#000000" }}>
                        <a href={`https://wa.me/91${p.sellerId.phone}`} className='mx-2' target="_blank" style={{ color: "#000000" }}>
                            <i style={{ color: "#000000" }}><RiWhatsappFill /></i>
                        </a>
                        <i className="fa-solid fa-phone mx-2" style={{ cursor: "pointer" }} ></i>
                        <i className='mx-2' style={{ cursor: "pointer" }}><FaShareAlt /></i>

                    </div> */}

                    <div className="mt-1">
                        <button className="btn btn-sm btn-primary mx-1" onClick={() => navigate(`/dashboard/user/buy-commodity/${p._id}`)}>view details</button>
                        <button className="btn btn-sm btn-primary mx-1" onClick={() => navigate(`/dashboard/user/buy-commodity/${p._id}`)}>order it</button>
                    </div>



                </div>

            </div>

        </>
    )
}



const ProductCard = (props) => {
    const p = props.product
    const navigate = useNavigate();

    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
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
                        <i className={`m-2 ${clicked ? "text-danger" : ""}`} style={{ cursor: "pointer" }} onClick={handleClick}>
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
                        <span className='my-1'>{p.description ? p.description.substr(0, 20)+"..." : null}</span>
                    </p>

                    <div className="icons my-2" style={{ color: "#000000" }}>
                        <a href={`https://wa.me/91${p.sellerId.phone}`} className='mx-2' target="_blank" style={{ color: "#000000" }}>
                            <i style={{ color: "#000000" }}><RiWhatsappFill /></i>
                        </a>
                        <i className="fa-solid fa-phone mx-2" style={{ cursor: "pointer" }} ></i>
                        <i className='mx-2' style={{ cursor: "pointer" }}><FaShareAlt /></i>

                    </div>

                    <div className="btns">
                        <button className="btn btn-sm btn-primary mx-1" onClick={() => navigate(`/dashboard/user/buy-commodity/${p.commodityId.catslug}/${p._id}`)}>view details</button>
                        <button className="btn btn-sm btn-primary mx-1" onClick={() => navigate(`/dashboard/user/buy-commodity/${p._id}`)}>order it</button>
                    </div>

                </div>

            </div>

        </>
    )
}

export default ProductCard