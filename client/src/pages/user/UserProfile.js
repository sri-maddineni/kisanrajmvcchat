import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/UIComponents/Nav";
import Footer from "../../components/layouts/Footer";
import "./usercss/UserProfile.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/UIComponents/Spinner";
import AuthContext from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { format } from "date-fns";
import { Radio } from 'antd';


const UserProfile = () => {

  const [loading, setLoading] = useState(false)
  const [high, sethigh] = useState(true)

  const [user, setUser] = useState("")

  const params = useParams();
  const [posts, setposts] = useState([])

  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const getuserdata = async () => {
    setLoading(true)
    const uid = params.uid;
    try {
      const userdata = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/${uid}`);

      if (userdata.data.success) {
        console.log(userdata.data.user.listings)
        setUser(userdata.data.user)
        setposts(userdata.data.user.listings)
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

  const formatteddate = (date) => {
    return format(new Date(date), 'dd MMM yyyy');
  }

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
    toast("copied profile url")
  }


  if (loading) {
    return (
      <>
        <Nav />
        <div className="m" style={{minHeight:"50vh"}}>
        <Spinner />
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Nav />



      <div className="overall" style={{ border: 'solid 1px red', display: "flex", flexDirection: "column" }}>

        <div className="topsec" style={{ display: "flex", flexDirection: 'row', flexWrap: 'nowrap', justifyContent: "center" }}>
          <div className="left p-3">
            <div className="leftt my-1">
              <div className="card">
                <div className="roe">
                  <img style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} src="https://marketplace.canva.com/EAFHfL_zPBk/1/0/1600w/canva-yellow-inspiration-modern-instagram-profile-picture-kpZhUIzCx_w.jpg" alt="profile" />
                  <div className="name m-3">
                    <p style={{ fontWeight: "700" }}>{user.name}  <span style={{ fontWeight: "500" }}>{user.rating} <i className="fa-solid fa-star text-warning"></i> </span> </p>
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
                <p className="foltxt">{user?.transactions ? user?.transactions : "0"}</p>
                <p>Transactions</p>
                <button className="btn btn-sm btn-primary" onClick={copylink}>
                  copy link
                </button>
              </div>
            </div>

          </div>


        </div>




        <div className="bottom" style={{ border: 'solid 1px red' }}>
          <div className="mx-5 my-1">

            <div className="mx-3" >

              <hr />{/* bottom section horisantal line */}
              <Radio.Group className="d-flex justify-content-evenly" onChange={onChange} value={value} style={{ display: "flex", flexDirection: 'row', flexWrap: "nowrap", justifyContent: "evenly" }}>

                <Radio className="navi" value={1}>Posts</Radio>
                <Radio className="navi" value={2}>Requirements</Radio>
                <Radio className="navi" value={3}>Equipment For hire</Radio>
                <Radio className="navi" value={4}>Equipment For sale</Radio>

              </Radio.Group>
              <hr />





              <div className="bottomcontent" style={{ minHeight: '50vh' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {
                    posts.map(post => (
                      <>
                        <div className="card" style={{ width: "18rem" }}>
                          <div className="img">
                            <img src={`/api/v1/products/product-photo/${post._id}`} alt="" />
                          </div>
                          <div className="details">
                            <p>{post.organic ? "organic" : "Inorganic"} {post.name}</p>
                            <p ><span style={{ fontWeight: "700" }}>&#8377;{post.price} per {post.quantityUnit} </span>{post.quantity} {post.quantityUnit}s Available</p>
                            <p>Available by : {formatteddate(post.availableDate)}</p>
                          </div>
                        </div>
                      </>
                    ))
                  }
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>

      <Footer />
    </>
  );
};

export default UserProfile;
