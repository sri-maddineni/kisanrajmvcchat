import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const ProductCard=(props)=> {
    const p=props.product
    const navigate=useNavigate();
    
    return (
        <>
            <div
                className="card m-3 text-center"
                style={{ width: "18rem" }}
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
                    style={{ height: "30vh", objectFit: "cover" }}/>
                <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "1rem" }}>
                        {p.organic ? "Organic" : "Inorganic"} {p.name}{" "}
                        {p.quality}
                        <i className="fa-solid fa-star text-warning"></i>
                        <br />
                        {p.description}
                    </h5>
                    <p className="card-text" style={{ fontSize: "1rem" }}>
                        <span className="text-dark bg-warning">
                            Rs.{p.price}/- per {p.quantity} {p.quantityUnit}s
                            <br />
                            (Rs. {(p.price / p.quantity).toFixed(1)} per{" "}
                            {p.quantityUnit})
                        </span>
                    </p>


                    <div className="icons">
                        <button className="btn btn-sm btn-primary mx-1" onClick={() => navigate(`/dashboard/user/buy-commodity/${p._id}`)}>view details</button>
                        <a href={`https://wa.me/91${p.sellerId.phone}`} target="_blank" style={{ textDecoration: "none" }}>
                            <i className="fa-brands fa-whatsapp mx-2" style={{ cursor: "pointer" }} aria-hidden="true"></i>
                        </a>
                        <i className="fa-solid fa-phone mx-2" style={{ cursor: "pointer" }} ></i>

                        <i class="fa-solid fa-share-nodes mx-2" style={{ cursor: "pointer" }}></i>
                    </div>
                </div>

            </div>

        </>
    )
}

export default ProductCard