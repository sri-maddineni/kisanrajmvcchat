import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../../components/UIComponents/Navbar";
import Nav from "../../components/UIComponents/Nav";
import "./Register.css"


export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    await getLocation();
    if (pincode.length > 6) {
      toast("Please enter valid pincode");
    } else {
      e.preventDefault();

      try {
        const passeddata={ name,email,password,phone,answer,address,pincode,latitude,longitude,}
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,passeddata);

        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error in registration!");
      }
    }
  };

  const getLocation = async() => {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        } 
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <Nav />
      <Toaster />
      {/* <div className="d-flex justify-content-between">
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
                  setName(e.target.value);
                }}
                placeholder="Enter Full Name"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter Email"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter password"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="Enter phone"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                placeholder="Enter secret code"
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

            <div
              className="mb-3"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="number"
                className="form-control m-1"
                value={latitude}
                placeholder="Enter latitude"
                required
              />
              <input
                type="number"
                className="form-control m-1"
                value={longitude}
                placeholder="Enter Longitude"
                required
              />
              <button
                className="btn btn-sm btn-success m-1"
                onClick={getLocation}
                style={{ padding: "0.5rem 1rem" }}
              >
                <i className="fas fa-map-marker-alt"></i>
              </button>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className=""></div>
      </div> */}




      <div className="container">
        <div className="card bg-light">
          <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-1 text-center">Create Account</h4>
            <p className="text-center">Get started with your free account</p>            
            <form onSubmit={handleSubmit}>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                </div>
                <input value={name} onChange={(e)=>setName(e.target.value)} className="form-control" placeholder="Full name" type="text" />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                </div>
                <input name="" value={email}  onChange={(e)=>setEmail(e.target.value)}  className="form-control" placeholder="Email address" type="email" />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                </div>
                <input name="" value={"+91"}  className="form-control" placeholder="+91" style={{maxWidth:"60px"}} />

                <input name="" value={phone}  onChange={(e)=>setPhone(e.target.value)}  className="form-control" placeholder="Enter phone" type="number" />

              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-building"></i> </span>
                </div>
                <input value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" placeholder="Enter address" type="text" />

              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-location-dot"></i> </span>
                </div>
                <input value={pincode} onChange={(e)=>setPincode(e.target.value)} className="form-control" placeholder="Enter pincode" type="text" />

              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                </div>
                <input className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Create password" type="password" />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                </div>
                <input className="form-control" value={answer} onChange={(e)=>setAnswer(e.target.value)} placeholder="Create secret code" type="password" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block"> Create Account  </button>
              </div>
              <p className="text-center">Have an account?<NavLink to="/login"> Log In </NavLink></p>
            </form>
            {/* <p className="divider-text">
              <span className="bg-light">OR</span>
            </p>
            <p>
              <a href="" className="btn btn-block btn-twitter"> <i className="fab fa-google"></i>   Login via Google</a>
              <a href="" className="btn btn-block btn-phone"> <i className="fas fa-phone"></i>   Login via Phone</a>
              <a href="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i>   Login via facebook</a>
            </p> */}
          </article>

          
        </div>

      </div>
      <Footer />
    </>
  );
};
