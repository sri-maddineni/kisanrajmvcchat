import React, { useEffect, useState } from 'react'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import { NavLink,useNavigate } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast';
import TopFilterBar from "../../components/CardRelated/buycommodity/TopFilterBar";
import { IoArrowBackCircle } from 'react-icons/io5';

const BuyEquipment = () => {

    const [equip, setequip] = useState([])

    const navigate=useNavigate();

    const images = {
        "Tractors": "https://www.agrifarming.in/wp-content/uploads/2019/01/Importance-of-Tractors-in-Agriculture..jpg",
        "Sprayers": "https://assets-global.website-files.com/5e270c1f7082827312b019e1/5e4ed105c71462dd83eb59ef_F1060A-1%201000%20Field%20Sprayer-60%27%20Boom-p-500.jpeg",
        "Seeders / Harvestors": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/National_Agro_Happy_Seeder.jpg/1200px-National_Agro_Happy_Seeder.jpg",
        "JCB": "https://t3.ftcdn.net/jpg/04/24/00/98/240_F_424009863_WdlOPZcdH1shYd255ywQJVgobkU6hEf3.jpg",
        "Water tanks":"https://i.ytimg.com/vi/40rV3JPa3pU/maxresdefault.jpg"    
    }


    const getEquientHire = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/equipment/getbuyequipment`)
            if (res.data.success) {
                console.log("success")
                toast.success("equipment obtained successfuly!")
                setequip(res.data.equip)
                console.log(res)
            }
            else {
                console.log("failed to get hire equipment")
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEquientHire();
    }, [])

    const Breadcrumb = () => {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="mr-2" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
                        <abbr title="Go back">
                            <IoArrowBackCircle style={{ fontSize: '1.8rem' }} />
                        </abbr>
                    </li>
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>


                    <li className="breadcrumb-item active" aria-current="page">Buy Equipment</li>
                </ol>
            </nav>
        );
    };


    return (
        <>
            <Nav />
            <Breadcrumb />
            <TopFilterBar />

            <div className="container" style={{ minHeight: "50vh" }}>
                <div className="" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                    {equip.map(item => (

                        <div className="card" style={{ width: "14rem" }}>
                            <div className="image">
                                <img src={images[item.item]} alt="equipimage" style={{ height: "150px" }} />
                            </div>
                            <div className="details">
                                <p style={{ margin: "0", padding: "0" }}>{item.item}</p>
                                <p className='text-muted fw-bolder' style={{ margin: "0", padding: "0" }}>Cost : &#8377;{item.cost}</p>

                                <p style={{ margin: "0", padding: "0" }}><i className='mx-1 fa-solid fa-phone'></i> {item.owner.name} : {item.phone}</p>
                                <p style={{ margin: "0", padding: "0" }}><i className="mx-2 fa-solid fa-location-dot"></i>{item.address}</p>
                            </div>
                        </div>

                    ))}
                </div>

            </div>
            <Footer />
        </>
    )
}

export default BuyEquipment