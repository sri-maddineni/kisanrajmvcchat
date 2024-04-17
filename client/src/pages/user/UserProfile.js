import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/UIComponents/Nav";
import Footer from "../../components/layouts/Footer";
import "./usercss/UserProfile.css"
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/UIComponents/Spinner";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Radio } from 'antd';

const UserProfile = () => {

  const [loading, setLoading] = useState(false)
  // const [high, sethigh] = useState(true)

  const [user, setUser] = useState("")
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState(false)

  const params = useParams();
  const [posts, setposts] = useState([])

  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const Breadcrumb = () => {
    return (
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
          <li class="breadcrumb-item"><NavLink to="/dashboard/user/allusers">All users</NavLink></li>
          <li class="breadcrumb-item active" aria-current="page">UserProfile - {user.name}</li>
        </ol>
      </nav>
    );
  };


  const getuserdata = async () => {
    // setLoading(true)
    const uid = params.uid;
    try {
      const userdata = await axios.get(`${process.env.REACT_APP_API}/api/v1/users/profile/${uid}`);

      if (userdata.data.success) {
        console.log(userdata.data.user.listings)
        console.log(userdata.data)
        setFollowers(userdata.data.user.followers)
        if (followers.includes(auth?.user?._id)) {
          setFollowing(true)
        }
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
  }, []); // Include getuserdata in the



  const [auth] = useContext(AuthContext)

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
        getuserdata()
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
        <div className="m" style={{ minHeight: "50vh" }}>
          <Spinner />
        </div>
        <Footer />
      </>
    )
  }

  const PostData = () => {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {posts.length ? (
            posts.map(post => (
              <div key={post._id} className="card" style={{ width: "16rem" }}>
                <div className="img">
                  <img src={`/api/v1/products/product-photo/${post._id}`} alt="productpic" style={{ height: "25vh", objectFit: "cover" }} />
                </div>
                <div className="details">
                  <p>{post.organic ? "organic" : "Inorganic"} {post.name}</p>
                  <p><span style={{ fontWeight: "700" }}>&#8377;{post.price} per {post.quantityUnit} </span><span> <br /> {post.quantity} {post.quantityUnit}s Available</span></p>
                  <p>Available by : {formatteddate(post.availableDate)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="container border border-secondary" style={{ display: "flex", flexDirection: 'row', alignContent: 'center', alignItems: "center", justifyContent: "center" }}>
              <p className="h1 m-5">No posts yet</p>
            </div>
          )}

        </div>
      </>
    )
  }

  const RequirementsData = () => {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {posts.length ? (
            posts.map(post => (
              <div key={post._id} className="card" style={{ width: "16rem" }}>
                <div className="img">
                  <img src={`/api/v1/products/product-photo/${post._id}`} alt="productpic" style={{ height: "25vh", objectFit: "cover" }} />
                </div>
                <div className="details">
                  <p>{post.organic ? "organic" : "Inorganic"} {post.name}</p>
                  <p><span style={{ fontWeight: "700" }}>&#8377;{post.price} per {post.quantityUnit} </span><span>{post.quantity} {post.quantityUnit}s Available</span></p>
                  <p>Available by : {formatteddate(post.availableDate)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="container border border-secondary" style={{ display: "flex", flexDirection: 'row', alignContent: 'center', alignItems: "center", justifyContent: "center" }}>
              <p className="h1 m-5">No posts yet</p>
            </div>
          )}

        </div>
      </>
    )
  }







  return (
    <>
      <Nav />
      <Breadcrumb />



      <div className="overall" style={{ display: "flex", flexDirection: "column" }}>

        <div className="topsec" style={{ display: "flex", flexDirection: 'row', flexWrap: 'nowrap', justifyContent: "center" }}>
          <div className="left p-3">
            <div className="leftt my-1">
              <div className="card">
                <div className="roe">
                  <img style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%", border: 'solid 1px red' }} src="https://w7.pngwing.com/pngs/3/855/png-transparent-man-wearing-brown-hat-illustration-farmer-avatar-straw-farmers-avatar-heroes-hat-logo.png" alt="profile" />
                  <div className="name m-3">
                    <p style={{ fontWeight: "700" }}>
                      {user.name}  {/* Added a space after name */}
                      <span style={{ fontWeight: "500" }}>
                        <>
                          {Array.from({ length: user.rating }, (_, index) => (
                            <i key={index} className="fa-solid fa-star text-warning"></i>
                          ))}
                        </>

                      </span>
                    </p>
                    <div className="d-flex" style={{ flexDirection: 'column' }}>
                      <p><i className="fa-solid fa-location-dot m-2"></i>{user?.address}</p>
                      <p style={{ margin: "0", padding: "0" }} className="fw-bolder"><i class="fa-solid fa-phone mx-2"></i>{user.phone}</p>
                    </div>
                  </div>
                </div>
                <p style={{ margin: "0", padding: "0" }}>{user.description}</p>

              </div>

            </div>
          </div>

          <div className="rtop">
            <div className="network m-3">
              <div className="followers m-2 p-3" style={{ display: 'flex', flexDirection: "column" }}>
                <p className="foltxt">{user?.followers?.length}</p>
                <p style={{ cursor: "pointer" }}>Followers</p>
                <button
                  className={`btn btn-sm btn-primary ${auth?.user?._id === params.uid ? "disabled" : ""} ${followers.includes(auth?.user?._id) ? "btn-outline-secondary" : "btn-primary"}`}
                  onClick={followfun}
                >
                  {followers.includes(auth?.user?._id) ? "Unfollow" : "Follow"}
                </button>
              </div>
              <div className="followers m-2 p-3" style={{ display: 'flex', flexDirection: "column" }}>
                <p className="foltxt">{user?.following?.length}</p>
                <p style={{ cursor: "pointer" }}>Following</p>
                <button className={`btn btn-sm btn-primary ${auth?.user?._id === params.uid ? "disabled" : ""}`}>
                  Message
                </button>
              </div>
              <div className="followers m-2 p-3" style={{ display: 'flex', flexDirection: "column" }}>
                <p className="foltxt">{user?.listings?.length}</p>
                <p>{auth?.user?._id === params.uid ? "My posts" : "Posts"}</p>
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




        <div className="bottom container" style={{}}>
          <div className="mx-5 my-1">

            <div className="mx-3" >

              <h1 className="fw-bolder">  <hr /></h1>
              <Radio.Group className="d-flex justify-content-evenly" onChange={(e) => { setValue(e.target.value) }} value={value} style={{ display: "flex", flexDirection: 'row', flexWrap: "nowrap", justifyContent: "evenly" }}>

                <h1> <Radio className="navi" value={1}>{auth?.user?._id === params.uid ? "My posts" : "Posts"}</Radio></h1>
                {/* <h1><Radio className="navi" value={2}>Requirements</Radio></h1>
                <h1><Radio className="navi" value={3}>Equipment For hire</Radio></h1>
                <h1><Radio className="navi" value={4}>Equipment For sale</Radio></h1> */}


              </Radio.Group>
              <hr />





              <div className="bottomcontent" style={{ minHeight: '50vh' }}>
                <PostData />
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

