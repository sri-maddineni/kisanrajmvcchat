import axios from 'axios'
import React, { useContext, useState } from 'react'
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import useConfig from 'antd/es/config-provider/hooks/useConfig'
import AuthContext from '../../context/AuthContext'

const CreateColdstorage = () => {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [description, setdescription] = useState("")
    const [link, setlink] = useState("")
    const [license, setlicense] = useState("")
    const [owner, setowner] = useState("")

    const [auth, setAuth] = useContext(AuthContext)


    const handleSubmit = async (e) => {

        e.preventDefault();

        setowner(auth?.user?._id)
        const datar = { name, email, phone, address, pincode, description, link, license, owner }



        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/cold/createcold`, datar)
            if (res.data.success) {
                console.log("done")

                setname("");
                setemail("");
                setphone("");
                setAddress("");
                setPincode("");
                setdescription("");
                setlink("");
                setlicense("");
                

            }
            else {
                console.log("failed")
            }
        } catch (error) {
            console.log("error")
        }
    }


    return (
        <>
            <Nav />

            <div className="d-flex justify-content-between">
                <div className=""></div>
                <div className="register my-2">
                    <h1 className="my-2 text-center">Register user</h1>
                    <form className="text-center m-3" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                required
                                onChange={(e) => {
                                    setname(e.target.value);
                                }}
                                placeholder="Enter cold storage Name"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={email}
                                onChange={(e) => {
                                    setemail(e.target.value);
                                }}
                                placeholder="Enter Email"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={phone}
                                onChange={(e) => {
                                    setphone(e.target.value);
                                }}
                                placeholder="Enter phone"
                                required
                            />
                        </div>



                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                                placeholder="Enter Address"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => {
                                    setdescription(e.target.value);
                                }}
                                placeholder="Enter descriptin"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={link}
                                onChange={(e) => {
                                    setlink(e.target.value);
                                }}
                                placeholder="Enter Address"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={license}
                                onChange={(e) => {
                                    setlicense(e.target.value);
                                }}
                                placeholder="Enter link"
                                required
                            />
                        </div>

                        <div
                            className="mb-3"
                            style={{ display: "flex", flexDirection: "row" }}
                        >
                            <input
                                type="number"
                                className="form-control m-1"
                                value={pincode}
                                onChange={(e) => {
                                    setPincode(e.target.value);
                                }}
                                placeholder="Enter Pincode"
                                required
                            />
                        </div>



                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                </div>
                <div className=""></div>
            </div>
            <Footer />
        </>
    )
}

export default CreateColdstorage