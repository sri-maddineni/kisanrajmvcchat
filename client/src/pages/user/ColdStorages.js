import React, { useEffect, useState } from 'react';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../../components/UIComponents/Spinner';
import "./usercss/cold.css"

const ColdStorages = () => {
  const [coldstorages, setColdStorages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCold = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/cold/getcold`);

      if (res.data.success) {
        console.log("got cold storages");
        setColdStorages(res.data.result);
      } else {
        console.log("failed to get cold storages");
      }
    } catch (error) {
      console.log("failed to get them");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCold();
  }, []);

  if (loading) {
    return (
      <>
        <Nav />
        <Spinner />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="r">
          {coldstorages.map((coldStorage) => (
            <div key={coldStorage._id}>

              <div className="card" style={{ width: "18rem", minHeight:"18rem"}}>

              <div className="card" style={{ width: "18rem" }}>

                <div className="card-img">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZyvAhKAugumJj0TveFUEfRIpZ8qTeKf939w&usqp=CAU" style={{ width: "100px", objectFit: "cover" }} alt="cold" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{coldStorage.name}</h5>
                  <p className="card-text"><i className='fa-solid fa-phone'></i> {coldStorage.phone}</p>
                  <p className="card-text"><i className='fa-solid fa-location-dot'></i>  {coldStorage.address}</p>
                  <p className="card-text"><i class="fa-solid fa-warehouse"></i> {coldStorage.capacity ? coldStorage.capacity : "NA"} Metric tons</p>
                </div> 
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ColdStorages;
