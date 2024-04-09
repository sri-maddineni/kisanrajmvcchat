import React, { useContext, useEffect, useState } from 'react';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import AuthContext from '../../context/AuthContext';
import { toast } from "react-hot-toast";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Spinner from '../../components/UIComponents/Spinner';

const Allusers = () => {
    const [auth] = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)


    const getAllUsers = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/getallusers`);
            setUsers(response.data); // Update state with fetched users
        } catch (error) {
            console.log(error);
            toast.error("Error fetching users."); // Display toast for error
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const Breadcrumb = () => {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <li className="breadcrumb-item active" aria-current="page">All users</li>
                </ol>
            </nav>
        );
    };

    return (
        <>
            <Nav />
            <Breadcrumb />
            {loading && <Spinner />}
            <div className="container border border-info" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                {users.length > 0 ? (
                    users.map(user => (
                        <div className='card bg-secondary text-warning' onClick={() => navigate(`/dashboard/user/profile/${user._id}`)} style={{ width: "15rem" }} key={user._id}>
                            <p>name: {user.name}</p>
                            <p>email:{user.email}</p>
                            <p>phone: {user.phone}</p>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Allusers;
