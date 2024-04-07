import React, { useEffect, useState } from 'react';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from './../../components/UIComponents/Spinner'
import { useNavigate } from 'react-router-dom';


const PotentialLeads = () => {
  const [potentials, setPotentials] = useState([]);
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

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

  if (loading) {
    return (<>
      <Nav />
      <div className="" style={{ minHeight: "50vh" }}>
        <Spinner />
      </div>
      <Footer />
    </>)
  }

  return (
    <>
      <Nav />
      <div style={{ minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
        {potentials && potentials.map((potential) => (
          <div key={potential._id} className="card m-2" style={{ width: '18rem' }}>
            <div className="card-body">
              <h5 className="card-title">{potential.organic?"Organic":"Inorganic"} {potential.productName}</h5>
              <p className="card-text text-muted">Quantity Required: {potential.quantity} {potential.quantityUnit}s</p>
              <p className="card-text">Price offered: <span style={{fontWeight:"700"}}> &#8377;{potential.price}/- per {potential.quantityUnit}</span></p>
              <p className="card-text">Buyer: {potential?.buyerId?.name}</p>
              <div className="d-flex justify-content-center">
                <button className='btn btn-sm btn-primary m-1'>contact</button>
                <button className='btn btn-sm btn-primary m-1' onClick={() => { navigate(`/dashboard/users/${potential.buyerId._id}`) }}>profile</button>
              </div>
              {/* Add more fields as needed */}
            </div>
          </div>
        ))}
        {
          !potentials.length && (
            <>
              <div className="container d-flex justify-content-center" >

                <button className='btn btn-primary m-3' onClick={()=>navigate("/dashboard/user/post-potential")}>No potentials found, Post a Requirement</button>
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
