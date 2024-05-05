import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import slugify from "slugify"
import axios from "axios"

function CategoriesCardHome() {
  const navigate = useNavigate();
  const [alldata, setalldata] = useState([])

  const getdata = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/total/alldata`);
      if (res.data.success) {
        console.log(res.data.datar);
        setalldata(res.data.datar)
      } else {
        console.log('Fruits data not available.');
      }
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    getdata();
  }, [])

  const cropcategories = [
    {
      name: "FOOD GRAINS/ CEREALS",
      image: "https://www.netmeds.com/images/cms/wysiwyg/blog/2021/03/1614588224_grains_big_450.jpg"
    },
    {
      name: "OILSEEDS",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm521zpRsil_Ox9sGSvZIPTKvw6x3yjegCSKQYSCTxlA&s"
    },
    {
      name: "VEGETABLES",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-RM2iCQ9H-ZxOdmdwB8dmowa0ts_-6X_YvYgGrhRlg&s"
    }
    ,
    {
      name: "SPICES",
      image: "https://static.toiimg.com/thumb/74416043.cms?width=680&height=512&imgsize=1947366"
    },
    {
      name: "FRUITS",
      image: "https://img.freepik.com/free-photo/vibrant-collection-healthy-fruit-vegetables-generated-by-ai_24640-80425.jpg",
      types: "45 types available"
    },
    {
      name: "MISC",
      image: "https://aseamarine.sg/wp-content/uploads/2020/06/Others.png"
    },

  ]

  const equipcategories = [
    {
      name: "TRACTORS",
      image: "https://thumbs.dreamstime.com/b/tractor-plowing-rice-field-chitvan-nepal-apr-april-39772341.jpg"
    },
    {
      name: "SPRAYERS",
      image: "https://assets-global.website-files.com/5e270c1f7082827312b019e1/5e4ed105c71462dd83eb59ef_F1060A-1%201000%20Field%20Sprayer-60%27%20Boom-p-500.jpeg"
    },
    {
      name: "SEEDERS / HARVESTORS",
      image: "https://www.deere.com.au/assets/images/region-4/products/harvesting/harvesting-hero-r4f086239-rrd.jpg"
    },
    {
      name: "WATER TANKERS",
      image: "https://5.imimg.com/data5/RC/TW/MY-34785017/tractor-water-tanker-1000x1000.jpg"
    },
    {
      name: "OTHERS",
      image: "https://aseamarine.sg/wp-content/uploads/2020/06/Others.png"
    },
  ]


  const features = [
    {
      name: "users",
      value: alldata.totalusers,
      link:"/"
    },
    {
      name: "products",
      value: alldata.productscount,
      link:"/dashboard/user/buy-commodity/all"
    },
    {
      name: "Equipment for hire",
      value: alldata.equipmentforhire,
      link:"/dashboard/user/hire-equipment"
    },
    {
      name: "Equipment for sale",
      value: alldata.equipmentforsale,
      link:"/dashboard/user/buy-equipment"
    },
    {
      name: "Requirements",
      value:alldata.potentials,
      link:"/dashboard/user/potential-leads"
    },
    {
      name: "storages",
      value: alldata.storages,
      link:"/dashboard/user/coldstorages"
    }
  ]



  return (
    <>
      <div className="container">

        <h2 className='text-center m-3'>Our Features</h2>

        <div className="row" style={{ display: 'flex', flexDirection: 'row', flexWrap: "nowrap", justifyContent: 'space-around', borderBottom: "solid 1px black" }}>
          {
            features.map(item => (
              <>
                <div onClick={() => navigate(item.link)} className='p-1 m-1 d-flex flex-column justify-content-center align-items-center' style={{ width: "12rem", cursor: 'pointer' }}>
                 <h1 className='bg-secondary text-white p-5' style={{borderRadius:"48%"}}>{item.value}+</h1>
                  <p className='my-3' style={{ fontWeight: "400", fontSize: "0.9rem" }}>{item.name}</p>
                </div>
              </>
            ))
          }
        </div>



        <hr />
        <h2 className='text-center'>Product categories</h2>
        <hr />
        <div className="row" style={{ display: 'flex', flexDirection: 'row', flexWrap: "nowrap", justifyContent: 'space-around', borderBottom: "solid 1px black" }}>
          {
            cropcategories.map(category => (
              <>
                <div onClick={() => navigate(`/dashboard/user/buy-commodity/${slugify(category.name.toLowerCase())}`)} className='p-1 m-1 d-flex flex-column justify-content-center align-items-center' style={{ width: "12rem", cursor: 'pointer' }}>
                  <img src={category.image} alt="catimage" style={{ objectFit: "cover", width: "125px", height: "125px", borderRadius: "50%" }} />
                  <p className='my-3' style={{ fontWeight: "400", fontSize: "0.9rem" }}>{category.name}</p>
                </div>
              </>
            ))
          }
        </div>



        <h2 className='text-center mt-3' style={{}}>Equipment for Hire</h2>

        <div className="row" style={{ display: 'flex', flexDirection: 'row', flexWrap: "nowrap", justifyContent: 'space-around' }}>
          {
            equipcategories.map(category => (
              <>
                <div onClick={() => navigate(`/dashboard/user/hire-equipment/${slugify(category.name.toLowerCase())}`)} className='p-1 m-1 d-flex flex-column justify-content-center align-items-center' style={{ width: "14rem", cursor: 'pointer' }}>
                  <img src={category.image} alt="catimage" style={{ objectFit: "cover", width: "150PX", height: "150PX", borderRadius: "75%" }} />
                  <p className='my-3' style={{ fontWeight: "400", fontSize: "0.9rem" }}>{category.name}</p>
                </div>
              </>
            ))
          }
        </div>
      </div>



    </>
  )
}

export default CategoriesCardHome