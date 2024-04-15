import React, { useEffect, useState } from 'react';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../../components/UIComponents/Spinner';
import "./usercss/cold.css"
import randint from "random-int"


const ColdStorages = () => {
  const [coldstorages, setColdStorages] = useState([]);
  const [loading, setLoading] = useState(true);

  const images=["https://dce0qyjkutl4h.cloudfront.net/wp-content/webp-express/webp-images/uploads/2020/01/cold-storage-1.jpg.webp", "https://stellarfoodforthought.net/wp-content/uploads/2018/08/IMG_2007-e1600808052986.jpg", "https://media.licdn.com/dms/image/C4E12AQGfpTZRLTLLkA/article-cover_image-shrink_720_1280/0/1634835177119?e=2147483647&v=beta&t=qRyRzxImCCThsXwpMsovUN4IoweNAH0mFl89ztGgEug"]

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
      <div className="container" style={{ marginTop: '20px' , minHeight:"50vh"}}>
        <div className="r">
          {coldstorages.map((coldStorage) => (
            <div key={coldStorage._id}>

              <div className="card" style={{ width: "18rem", minHeight:"24rem"}}>

              
                <div>
                  <img src={images[randint(0,2)]}  style={{height:"150px"}} alt="cold" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{coldStorage.name}</h5>
                  <p className="card-text"><i className='fa-solid fa-phone'></i> {coldStorage.phone}</p>
                  <p className="card-text"><i className='fa-solid fa-location-dot'></i>  {coldStorage.address}</p>
                  <p className="card-text"><i class="fa-solid fa-warehouse"></i> {coldStorage.capacity ? coldStorage.capacity : "NA"} Metric tons</p>
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
