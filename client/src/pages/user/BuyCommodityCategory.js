import React, { useContext, useEffect, useState } from 'react'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import TopFilterBar from '../../components/CardRelated/buycommodity/TopFilterBar';
import axios from 'axios';
import ProductCard, { Prod } from '../../components/CardRelated/buycommodity/ProductCard';
import AuthContext from '../../context/AuthContext';




const BuyCommodityCategory = () => {

    const navigate = useNavigate();
    const [auth] = useContext(AuthContext)

    const params = useParams();

    const product = params.pslug

    console.log(product)

    const [products, setproducts] = useState([])


    const getCatProducts = async () => {
        try {
            const product = params.pslug
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/products/getcatproducts/${product}`)
            if (res.data.success) {
                console.log("res found")
                setproducts(res.data.response)
            }
            else {
                console.log("nor found ")
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getCatProducts();
    }, [])


    const Breadcrumb = () => {
        return (

            <>

                <nav aria-label="breadcrumb">


                    <ol className="breadcrumb">
                        <li className='mr-2' style={{ cursor: "pointer" }} onClick={() => { navigate(-1) }}>
                            <abbr title="go back"><IoArrowBackCircle style={{ fontSize: '1.8rem' }} /></abbr> {/* Increase size here */}
                        </li>
                        <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to="/dashboard/user/buy-commodity">buy-commodity / all categories</NavLink></li>
                        <li className="breadcrumb-item"><NavLink to={`/dashboard/user/buy-commodity/${params.cat}`}>{params.cat}</NavLink></li>


                        <li className="breadcrumb-item active" aria-current="page">{params.pslug}</li>
                    </ol>

                </nav>
            </>
        );
    };


    return (
        <>

            <Nav />
            <Breadcrumb />
            <div className="container" style={{ minHeight: "50vh" }}>
                <TopFilterBar />

                <div className="container" style={{ display: "flex", flexDirection: "row" }}>
                    {products.length > 0
                        ? products.map((p) => (
                            auth?.user ? <ProductCard key={p._id} product={p} /> : <Prod key={p._id} product={p} />
                        ))
                        : <>
                            <div className="container text-center m-5" style={{ border: "solid 1px black" }}>
                                <h1 className='m-5'>No products available for the search result</h1>
                            </div>
                        </>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BuyCommodityCategory