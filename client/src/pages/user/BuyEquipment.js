import React from 'react'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import { NavLink } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast';

const BuyEquipment = () => {


    const getEquientHire=async()=>{
        try {
            const res=await axios.get(`${process.env.REACT_APP_API}/api/v1/equipment/getbuyequipment`)
            if(res.data.success){
                console.log("success")
                toast.success("equipment obtained successfuly!")
            }
            else{
                console.log("failed to get buy equipment")
            }
        } catch (error) {
            
        }
    }

    const Breadcrumb = () => {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                       
    
                    <li className="breadcrumb-item active" aria-current="page">Buy Equipment</li>
                </ol>
            </nav>
        );
    };


  return (
    <>
        <Nav/>
        <Breadcrumb/>
        <div className="container" style={{minHeight:"50vh"}}>


        </div>
        <Footer/>
    </>
  )
}

export default BuyEquipment