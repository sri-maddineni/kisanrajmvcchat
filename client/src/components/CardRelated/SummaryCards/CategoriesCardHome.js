import React from 'react'

function CategoriesCardHome() {

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
      name:"VEGETABLES",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz-RM2iCQ9H-ZxOdmdwB8dmowa0ts_-6X_YvYgGrhRlg&s"
    }
    ,
    {
      name:"SPICES",
      image:"https://static.toiimg.com/thumb/74416043.cms?width=680&height=512&imgsize=1947366"
    },
    {
      name:"FRUITS",
      image:"https://img.freepik.com/free-photo/vibrant-collection-healthy-fruit-vegetables-generated-by-ai_24640-80425.jpg",
      types:"45 types available"
    },
    {
      name:"MISC",
      image:"https://aseamarine.sg/wp-content/uploads/2020/06/Others.png"
    },
    
  ]

  const equipcategories=[
    {
      name:"TRACTORS",
      image:"https://thumbs.dreamstime.com/b/tractor-plowing-rice-field-chitvan-nepal-apr-april-39772341.jpg"
    },
    {
      name:"SPRAYERS",
      image:"https://assets-global.website-files.com/5e270c1f7082827312b019e1/5e4ed105c71462dd83eb59ef_F1060A-1%201000%20Field%20Sprayer-60%27%20Boom-p-500.jpeg"
    },
    {
      name:"PLOUGH",
      image:"https://thumbs.dreamstime.com/b/plough-machine-farmer-2375760.jpg?w=768"
    },
    {
      name:"OTHERS",
      image:"https://aseamarine.sg/wp-content/uploads/2020/06/Others.png"
    },
  ]

  return (
    <>
      <div className="container">
        <hr />
        <h2 className='text-center'>Crop categories</h2>
        <hr />
        <div className="row" style={{ display: 'flex', flexDirection: 'row', flexWrap: "nowrap",justifyContent:'space-around' }}>
          {
            cropcategories.map(category => (
              <>
                <div className='p-1 m-1 d-flex flex-column justify-content-center align-items-center' style={{ width: "12rem", cursor:'pointer' }}>
                  <img src={category.image} alt="catimage" style={{ objectFit: "cover", width: "125px", height: "125px", borderRadius: "50%" }} />
                  <p className='my-3' style={{ fontWeight: "400",fontSize:"0.9rem" }}>{category.name}</p>
                  
                </div>
              </>
            ))
          }
        </div>


        <hr />
        <h2 className='text-center'>Equipment for Hire</h2>
        <hr />
        <div className="row" style={{ display: 'flex', flexDirection: 'row', flexWrap: "nowrap",justifyContent:'space-around' }}>
          {
            equipcategories.map(category => (
              <>
                <div className='p-1 m-1 d-flex flex-column justify-content-center align-items-center' style={{ width: "18rem", cursor:'pointer' }}>
                  <img src={category.image} alt="catimage" style={{ objectFit: "cover", width: "175px", height: "175px", borderRadius: "75%" }} />
                  <p className='my-3' style={{ fontWeight: "400",fontSize:"0.9rem" }}>{category.name}</p>
                  
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