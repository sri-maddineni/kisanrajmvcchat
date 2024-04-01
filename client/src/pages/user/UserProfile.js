import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/UIComponents/Nav";
import Footer from "../../components/layouts/Footer";
import "./usercss/UserProfile.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/UIComponents/Spinner";
import AuthContext from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const UserProfile = () => {

  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState("")

  const params = useParams();

  const getuserdata = async () => {



    const uid = params.uid;
    try {
      const userdata = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/${uid}`);

      if (userdata.data.success) {
        console.log("success")
        setUser(userdata.data.user)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getuserdata();
  }, [])

  const [auth, setAuth] = useContext(AuthContext)

  const followfun = async () => {

    try {
      const myid = auth?.user?._id;
      const hisid = params.uid
      const datar = { myid, hisid }

      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/follow`, datar)

      if (res) {
        console.log("follow success")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const copylink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
    toast("copied")
  }



  if (loading) {
    return (
      <>
        <Nav />
        <Spinner />
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />



      <div className="overall">


        <div className="left my-1">
          <div className="leftt my-1">
            <div className="card">
              <div className="roe">
                <img style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" alt="profile" />
                <div className="name m-3">
                  <p style={{ fontWeight: "700" }}>{user.name}  <span style={{ fontWeight: "500" }}>{user.rating} <i class="fa-solid fa-star text-warning"></i> </span> </p>
                  <div className="loc d-flex" >
                    <i className="fa-solid fa-location-dot m-2"></i>
                    <p className="m-1">{user.address}</p>
                  </div>
                </div>
              </div>
              <p>{user.description}</p>
            </div>

          </div>
        </div>

        <div className="right">
          <div className="mx-5 my-1" style={{ display: "flex", flexDirection: "column" }}>
            <div className="rtop">
              <div className="network m-3">
                <div className="followers m-2 p-3" style={{ display: 'flex', flexDirection: "column" }}>
                  <p className="foltxt">{user?.followers?.length}</p>
                  <p>Followers</p>
                  <button className="btn btn-sm btn-primary" onClick={() => followfun()}>follow</button>
                </div>
                <div className="followers m-2 p-3" style={{ display: 'flex', flexDirection: "column" }}>
                  <p className="foltxt">{user?.following?.length}</p>
                  <p>Following</p>
                  <button className="btn btn-sm btn-primary">
                    Message
                  </button>
                </div>
                <div className="followers m-2 p-3" style={{ display: 'flex', flexDirection: "column" }}>
                  <p className="foltxt">{user?.listings?.length}</p>
                  <p>Posts</p>
                  <button className="btn btn-sm btn-primary">
                    share
                  </button>
                </div>
                <div className="followers m-2 p-3" style={{ display: 'flex', flexDirection: "column" }}>
                  <p className="foltxt">36</p>
                  <p>Transactions</p>
                  <button className="btn btn-sm btn-primary" onClick={copylink}>
                    copy link
                  </button>
                </div>
              </div>

            </div>
            <div className="mx-3" >
              <hr />
              <div className="d-flex justify-content-evenly">
                <div className="navi">
                  Posts
                </div>
                <div className="navi">
                  Requirements
                </div>
                <div className="navi">
                  Equipment For hire
                </div>
                <div className="navi">
                  Equipment For sale
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>


      </div>

      <Footer />
    </>
  );
};

export default UserProfile;