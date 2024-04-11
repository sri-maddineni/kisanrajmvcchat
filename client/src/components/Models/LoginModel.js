import React from 'react';
import {  Modal, Button } from 'antd';
import {useNavigate} from "react-router-dom"

const LoginModel = ({ showModal, setShowModal }) => {
    const handleCancel = () => {
        setShowModal(false); // Close the modal
    };

    const navigate=useNavigate();

    const handleok=()=>{
        
        navigate("/login")
    }



    return (
        <>
            <Modal title="Login to add to wishlist" visible={showModal} onCancel={handleCancel} onOk={handleok} >
                <div className="container" style={{minHeight:"10vh"}}>
                    <p>Inorder to add to wishlist or make any transaction, Please login first</p>
                
                </div>

            </Modal>
        </>
    );
}

export default LoginModel