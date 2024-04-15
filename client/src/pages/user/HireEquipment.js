import React, { useEffect, useState } from 'react'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import { NavLink } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast';

const HireEquipment = () => {

    const [equip, setequip] = useState([])

    const images = {
        "Tractors": "https://www.agrifarming.in/wp-content/uploads/2019/01/Importance-of-Tractors-in-Agriculture..jpg",
        "Sprayers": "https://assets-global.website-files.com/5e270c1f7082827312b019e1/5e4ed105c71462dd83eb59ef_F1060A-1%201000%20Field%20Sprayer-60%27%20Boom-p-500.jpeg",
        "Seeders / Harvestors": "https://toscano.com.tr/wp-content/uploads/2023/02/toscano-seeder.jpeg",
        "": ""
    }



    const getEquientHire = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/equipment/gethireequipment`)
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

    const conditionalHire=async()=>{
        try {
            const res=await axios.get()
        } catch (error) {
            
        }
    }

    const Breadcrumb = () => {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>


                    <li className="breadcrumb-item active" aria-current="page">Hire Equipment</li>
                </ol>
            </nav>
        );
    };


    return (
        <>
            <Nav />
            <Breadcrumb />
            <div className="container" style={{ minHeight: "50vh" }}>
                <div className="" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                    {equip.map(item => (

                        <div className="card" style={{ width: "14rem" }}>
                            <div className="image">
                                <img src={images[item.item]} alt="equipimage" style={{height:"150px"}} />
                            </div>
                            <div className="details">
                                <p style={{margin:"0",padding:"0"}}>{item.item}</p>
                                <p style={{margin:"0",padding:"0"}}>{item.contact}</p>
                                <p className="d-flex justify-content-between" style={{margin:"0",padding:"0"}}>{item.owner.name} : {item.phone}</p>
                                <p style={{margin:"0",padding:"0"}}>{item.address}</p>
                                <abbr title="For unit time cost description click here" onClick={()=>{alert("for each equipment, it has its own unit time: \n tractors: per day \n sparayers: per day \n JCB : per hour etc..,")}}><p className='text-muted fw-bolder' style={{margin:"0",padding:"0"}}>Unit time cost : &#8377;{item.cost}</p></abbr>
                            </div>
                        </div>

                    ))}
                </div>

            </div>
            <Footer />
        </>
    )
}

export default HireEquipment