import React, { useEffect, useState } from 'react';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from './../../components/UIComponents/Spinner'
import { NavLink, useNavigate } from 'react-router-dom';
import randint from "random-int"
import { IoArrowBackCircle } from 'react-icons/io5';


const PotentialLeads = () => {
  const [potentials, setPotentials] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  const images = ["https://domf5oio6qrcr.cloudfront.net/medialibrary/11499/3b360279-8b43-40f3-9b11-604749128187.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX_yl40Qybp1ky-9b2FJ5wZuipZOQlJwtQKCvOFvLItQ&s",
    "https://www.hsph.harvard.edu/nutritionsource/wp-content/uploads/sites/30/2012/09/vegetables-and-fruits-farmers-market.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-RM2iCQ9H-ZxOdmdwB8dmowa0ts_-6X_YvYgGrhRlg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbeY69nOXHM5BNxFKLQbYSZDYjL-KObFv4QjOLtlPdqg&s"]



  const potentialLeads = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/requirements/get-all-potentials`);
      if (res.data.success) {
        setPotentials(res.data.potentials);

      } else {
        console.log('Something went wrong');
        toast.error('Failed to fetch potentials');
      }
    } catch (error) {
      console.error('Error fetching potentials:', error);
      toast.error('Failed to fetch potentials');
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    potentialLeads();
  }, []);

  const Breadcrumb = () => {
    const navigate = useNavigate();

    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="mr-2" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
              <abbr title="Go back">
                <IoArrowBackCircle style={{ fontSize: '1.8rem' }} />
              </abbr>
            </li>
            <li className="breadcrumb-item">
              <NavLink to="/">Home</NavLink>
            </li>

            <li className="breadcrumb-item active" aria-current="page">
              Potential leads
            </li>
          </ol>
        </nav>
      </>
    );
  };


  if (loading) {
    return (<>
      <Nav />
      <Breadcrumb />
      <div className='container' style={{ minHeight: "50vh" }}>
        <Spinner />
      </div>
      <Footer />
    </>)
  }

  return (
    <>
      <Nav />
      <Breadcrumb />
      <div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {potentials && potentials.map((potential) => (
          <div key={potential._id} className="card m-2" style={{ width: '18rem', minHeight: "16rem" }}>
            <img src={images[randint(0, 4)]} alt="" />
            <div className="card-body">

              <h5 className="card-title">{potential.organic ? "Organic" : "Inorganic"} {potential.productName}</h5>
              <p className="card-text text-muted">Quantity Required: {potential.quantity} {potential.quantityUnit}s</p>
              <p className="card-text">Price offered: <span style={{ fontWeight: "700" }}> &#8377;{potential.price} per {potential.quantityUnit}</span></p>
              <p className="card-text">Buyer: {potential?.buyerId?.name}</p>
              <div className="d-flex justify-content-center">

                <button className='btn btn-sm btn-primary m-1' onClick={() => { navigate(`/dashboard/user/profile/${potential.buyerId._id}`) }}>Contact buyer</button>
              </div>
              {/* Add more fields as needed */}
            </div>
          </div>
        ))}
        {
          !potentials.length && (
            <>
              <div className="container d-flex justify-content-center" >

                <button className='btn btn-primary m-3' onClick={() => navigate("/dashboard/user/post-potential")}>No potentials found, Post a Requirement</button>
              </div>
            </>
          )
        }
      </div>
      <Footer />
    </>
  );
};

export default PotentialLeads;
