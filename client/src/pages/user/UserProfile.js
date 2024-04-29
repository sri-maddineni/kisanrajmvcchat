import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/UIComponents/Nav";
import Footer from "../../components/layouts/Footer";
import "./usercss/UserProfile.css"
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/UIComponents/Spinner";
import AuthContext from "../../context/AuthContext";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Radio } from 'antd';
import randint from "random-int"

const UserProfile = () => {

  const [loading, setLoading] = useState(false)
  // const [high, sethigh] = useState(true)

  const [user, setUser] = useState("")
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState(false)
  const [requirements, setrequirements] = useState([])
  const [equiphire, setequiphire] = useState([])
  const [equipsale,setequipsale]=useState([])
  const [display, setdisplay] = useState("posts")

  const params = useParams();
  const [posts, setposts] = useState([])
  const navigate = useNavigate()
  const [auth] = useContext(AuthContext)

  const formatteddate = (date) => {
    return format(new Date(date), 'dd MMM yyyy');
  }

  const images = ["https://domf5oio6qrcr.cloudfront.net/medialibrary/11499/3b360279-8b43-40f3-9b11-604749128187.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_yl40Qybp1ky-9b2FJ5wZuipZOQlJwtQKCvOFvLItQ&s",
    "https://www.hsph.harvard.edu/nutritionsource/wp-content/uploads/sites/30/2012/09/vegetables-and-fruits-farmers-market.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-RM2iCQ9H-ZxOdmdwB8dmowa0ts_-6X_YvYgGrhRlg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbeY69nOXHM5BNxFKLQbYSZDYjL-KObFv4QjOLtlPdqg&s"]



  const Breadcrumb = () => {
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
          <li className="breadcrumb-item"><NavLink to="/dashboard/user/allusers">All users</NavLink></li>
          <li className="breadcrumb-item active" aria-current="page">UserProfile - {user.name}</li>
        </ol>
      </nav>
    );
  };



  //user data to display in user profile 
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
        setrequirements(userdata.data.user.potentials)
        setequiphire(userdata.data.user.equipmenthire)
        setequipsale(userdata.data.user.equipmentsale)


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
        <div style={{ display: 'flex', flexDirection: 'row',flexWrap:"wrap" }}>
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
          {
            requirements?.length && requirements.map(item => (
              <div key={item._id} className="card m-2" style={{ width: '16rem', minHeight: "16rem" }}>
                <img src={images[randint(0, 4)]} alt="loading..." style={{ height: "25vh" }} />
                <div className="card-body">

                  <h5 className="card-title">{item.organic ? "Organic" : "Inorganic"} {item.productName}</h5>
                  <p className="card-text text-muted">Quantity Required: {item.quantity} {item.quantityUnit}s</p>
                  <p className="card-text">Price offered: <span style={{ fontWeight: "700", fontSize: "0.9rem" }}> &#8377;{item.price} per {item.quantityUnit}</span></p>

                  {/* Add more fields as needed */}
                </div>
              </div>
            ))
          }
          {
            !requirements?.length &&
            <>
              <div className="container border border-secondary" style={{ display: "flex", flexDirection: 'row', alignContent: 'center', alignItems: "center", justifyContent: "center" }}>
                <p className="h1 m-5">No Requirements posts yet</p>
              </div>
            </>
          }

        </div>
      </>
    )
  }

  const EqupmentHire = () => {
    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            equiphire?.length && equiphire.map(item => (
              <div key={item._id} className="card m-2" style={{ width: '16rem', minHeight: "10rem" }}>
                {/* <img src={images[randint(0, 4)]} alt="loading..." style={{ height: "25vh" }} /> */}
                <div className="card-body">

                  <h5 className="card-title">{item.item} {item.productName}</h5>
                  <p className="card-text text-muted">Des : {item.des} {item.quantityUnit}s</p>
                  <p className="card-text">Unit price : <span style={{ fontWeight: "700", fontSize: "0.9rem" }}> &#8377;{item.cost}</span></p>

                  {/* Add more fields as needed */}
                </div>
              </div>
            ))
          }
          {
            !equiphire?.length &&
            <>
              <div className="container border border-secondary" style={{ display: "flex", flexDirection: 'row', alignContent: 'center', alignItems: "center", justifyContent: "center" }}>
                <p className="h1 m-5">No equiphire posts yet</p>
              </div>
            </>
          }

        </div>
      </>
    )
  }

  const EqupmentSale = () => {
    return (
      <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {
          equipsale?.length && equipsale.map(item => (
            <div key={item._id} className="card m-2" style={{ width: '16rem', minHeight: "10rem" }}>
              {/* <img src={images[randint(0, 4)]} alt="loading..." style={{ height: "25vh" }} /> */}
              <div className="card-body">

                <h5 className="card-title">{item.item} {item.productName}</h5>
                <p className="card-text text-muted">Des : {item.des} {item.quantityUnit}s</p>
                <p className="card-text">Total cost : <span style={{ fontWeight: "700", fontSize: "0.9rem" }}> &#8377;{item.cost}</span></p>

                {/* Add more fields as needed */}
              </div>
            </div>
          ))
        }
        {
          !equipsale?.length &&
          <>
            <div className="container border border-secondary" style={{ display: "flex", flexDirection: 'row', alignContent: 'center', alignItems: "center", justifyContent: "center" }}>
              <p className="h1 m-5">No equipsale posts yet</p>
            </div>
          </>
        }

      </div>
    </>
    )
  }







  return (
    <>
      <Nav />
      <Breadcrumb />



      <div className="overall" style={{ display: "flex", flexDirection: "column" }}>
        {/* profile insta type model section */}
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
                      <p style={{ margin: "0", padding: "0" }} className="fw-bolder"><i className="fa-solid fa-phone mx-2"></i>{user.phone}</p>
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
                  {followers.includes(auth?.user?._id) ? "Following" : "Follow"}
                </button>
              </div>
              <div className="followers m-2 p-3" style={{ display: 'flex', flexDirection: "column" }}>
                <p className="foltxt">{user?.following?.length}</p>
                <p style={{ cursor: "pointer" }}>Following</p>
                {/* <button className={`btn btn-sm btn-primary ${auth?.user?._id === params.uid ? "disabled" : ""}`}>
                  Message
                </button> */}
              </div>
              <div className="followers m-2 p-3" style={{ display: 'flex', flexDirection: "column" }}>
                <p className="foltxt">{user?.listings?.length}</p>
                <p>{auth?.user?._id === params.uid ? "My posts" : "Posts"}</p>
                {/* <button className="btn btn-sm btn-primary">
                  share
                </button> */}
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
        {/* instagram view completed */}

        <div className="bottom container" style={{}}>
          <div className="mx-5 my-1">

            <div className="mx-3" >

              <Radio.Group className="d-flex justify-content-evenly" onChange={(e) => { setdisplay(e.target.value) }} value={display} style={{ display: "flex", flexDirection: 'row', flexWrap: "nowrap", justifyContent: "evenly" }}>

                <h1> <Radio className="navi" value={"posts"}>{auth?.user?._id === params.uid ? "My posts" : "Posts"}</Radio></h1>
                <h1><Radio className="navi" value={"requirements"} onClick={() => { setdisplay("requirements") }}>Requirements</Radio></h1>
                <h1><Radio className="navi" value={"equipment"} onClick={() => { setdisplay("equipment") }}>Equipment For hire</Radio></h1>
                <h1><Radio className="navi" value={"forsale"} onClick={() => { setdisplay("forsale") }}>Equipment For sale</Radio></h1>

              </Radio.Group>

              <div className="bottomcontent" style={{ minHeight: '50vh' }}>
                {display === "posts" && <PostData />}
                {display === "requirements" && <RequirementsData />}
                {display === "equipment" && <EqupmentHire />}
                {display === "forsale" && <EqupmentSale />}
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

