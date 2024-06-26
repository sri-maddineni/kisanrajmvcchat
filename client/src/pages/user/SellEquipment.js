import React, { useState, useEffect, useContext } from 'react';
import Nav from '../../components/UIComponents/Nav'
import Footer from '../../components/layouts/Footer'
import "../user/usercss/PostEquipment.css"
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoArrowBackCircle } from 'react-icons/io5';
import { NavLink, useNavigate } from 'react-router-dom';



const SellEquipment = () => {

    const [auth, setAuth] = useContext(AuthContext)

    const navigate=useNavigate();
    const owner = auth?.user?._id;

    const [item, setitem] = useState("")
    const [cost, setcost] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState('')
    const [des, setdes] = useState("")
    const [purp, setpurp] = useState("sale")
    const [license, setlicense] = useState("")

    const handlesubmit = async (e) => {
        e.preventDefault()
        const owner = auth?.user?._id;
        const formdata = { item, cost, phone, address, owner, des, purp }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/equipment/postequipment`, formdata)
            console.log(res)
            if (res.data.success) {
                console.log("success")
                toast.success("equipment posted successfully!")
                setcost("")
                setitem("")
                setphone("")
                setaddress("")
                setdes("")
                setlicense("")

            }
        } catch (error) {
            toast.error("Failed to post equipment")
            console.log(error)
        }
    }

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


                    <li className="breadcrumb-item active" aria-current="page">Sell Equipment</li>
                </ol>
            </nav>
        );
    };




    return (
        <>
            <Nav />
            <Breadcrumb/>
            <div className="container">
                <div className="register-photo">
                    <div className="form-container">
                        <div className="image-holder"></div>
                        <form method='post'>
                            <h2 className="text-center"><strong>Post Equipment for sale</strong></h2>
                            <div className="form-group">
                                <input list="equip" value={item} className="form-control" name="browser" id="browser" placeholder='select equipment' onChange={(e) => { setitem(e.target.value) }} />

                                <datalist id="equip">
                                    <option value="Tractors" />
                                    <option value="Sprayers" />
                                    <option value="Seeders / Harvestors" />
                                    <option value="JCB" />
                                    <option value="Others" />

                                </datalist>
                            </div>
                            <div className="form-group"><input value={cost} className="form-control" type="number" name="item" placeholder="Rs. Total cost" onChange={(e) => { setcost(e.target.value) }} /></div>
                            <div className="form-group"><input value={phone} className="form-control" type="number" name="phone" placeholder="Phone number" onChange={(e) => { setphone(e.target.value) }} /></div>
                            <div className="form-group"><input value={address} className="form-control" type="text" name="address" placeholder="Address" onChange={(e) => { setaddress(e.target.value) }} /></div>
                            <div className="form-group"><input value={des} className="form-control" type="text" name="description" placeholder="Description of Equipment..." onChange={(e) => { setdes(e.target.value) }} /></div>
                            <div className="form-group"><input value={license} className="form-control" type="text" name="description" placeholder="Description of license(if vehicle)..." onChange={(e) => { setlicense(e.target.value) }} /></div>
                            <div className="form-group"><button className="btn btn-primaryy btn-block text-white" type="submit" onClick={handlesubmit}>Post Equipment</button></div>

                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SellEquipment


//     const [equipmentDesc, setEquipmentDesc] = useState('');
//     const [equipmentModel, setEquipmentModel] = useState('');
//     const [license, setLicense] = useState('');
//     const [selectedCategoryId, setSelectedCategoryId] = useState('');
//     const [equipmentCategories, setEquipmentCategories] = useState([]);

//     const [auth] = useContext(AuthContext)

//     useEffect(() => {
//         const fetchEquipmentCategories = async () => {
//             try {
//                 const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/equipment/equipment-categories`);
//                 if (response.data.success) {
//                     setEquipmentCategories(response.data.categories);
//                 } else {
//                     console.error('Failed to fetch equipment categories:', response.data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching equipment categories:', error);
//             }
//         };

//         fetchEquipmentCategories();
//     }, []);


//     const handleCategoryChange = (categoryId) => {
//         setSelectedCategoryId(categoryId);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log('in handle responce');
//         try {
//             const formData = {
//                 equipment_category_id: selectedCategoryId,
//                 equipment_desc: equipmentDesc,
//                 equipment_model: equipmentModel,
//                 license: license,
//                 owner_id: auth.user._id,
//             };
//             console.log('befor responce');
//             const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/equipment/post-equipment`, formData);
//             console.log(response);
//             if (response.data.success) {
//                 toast.success('Equipment created successfully');
//                 // Clear form fields after successful submission if needed
//                 setEquipmentDesc('');
//                 setEquipmentModel('');
//                 setLicense('');
//                 setSelectedCategoryId('');
//             } else {
//                 toast.error('Failed to create equipment: ' + response.data.message);
//             }
//         } catch (error) {
//             console.error('Error creating equipment:', error);
//             toast.error('Failed to create equipment');
//         }
//     };

//     return (
//         <>
//             <Nav />
//             <div className="container-fluid m-3 p-3">
//                 <div className="row">
//                     <div className="col-md-3">
//                         <UserMenu />
//                     </div>
//                     <div className="col-md-8 text-center m-1" style={{ minHeight: '50vh' }}>
//                         <div>
//                             <h2>Create Equipment</h2>
//                             <form onSubmit={handleSubmit} className="equipment-form">
//                                 <div className="row my-3">
//                                     <div className="col-md-6">
//                                         <div className="form-group">
//                                             <label htmlFor="equipmentDesc">Equipment Description:</label>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group">
//                                             <input type="text" id="equipmentDesc" value={equipmentDesc} onChange={(e) => setEquipmentDesc(e.target.value)} className="form-control" />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row my-3">
//                                     <div className="col-md-6">
//                                         <div className="form-group">
//                                             <label htmlFor="equipmentModel">Equipment Model:</label>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group">
//                                             <input type="text" id="equipmentModel" value={equipmentModel} onChange={(e) => setEquipmentModel(e.target.value)} className="form-control" />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row my-3">
//                                     <div className="col-md-6">
//                                         <div className="form-group">
//                                             <label htmlFor="license">License:</label>
//                                         </div>
//                                     </div>
//                                     <div className="col-md-6">
//                                         <div className="form-group">
//                                             <input type="text" id="license" value={license} onChange={(e) => setLicense(e.target.value)} className="form-control" />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row my-3">
//                                     <div className="col">
//                                         <h3>Equipment Category:</h3>
//                                         <div className="category-options">
//                                             {equipmentCategories.map(category => (
//                                                 <label key={category._id} className="category-option">
//                                                     <input
//                                                         type="radio"
//                                                         name="category"
//                                                         value={category._id}
//                                                         checked={selectedCategoryId === category._id}
//                                                         onChange={() => handleCategoryChange(category._id)}
//                                                         className="category-input"
//                                                     />
//                                                     <span className="category-label">{category.equipment_category}</span>
//                                                 </label>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="row my-3">
//                                     <div className="col">
//                                         <button type="submit" className="btn btn-primary">Create Equipment</button>
//                                     </div>
//                                 </div>
//                             </form>

//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );


