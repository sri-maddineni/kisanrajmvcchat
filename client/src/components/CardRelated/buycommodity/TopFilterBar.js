import React, { useState } from 'react'

const TopFilterBar = () => {
    const [category,setCategory]=useState("All")
    return (
        <>
            <div className="container" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <input type="search" className='form-control m-2' placeholder='search for products or use filters' style={{height:"35px"}} />
                <i className='fa fa-magnifying-glass m-3' style={{cursor:"pointer"}}></i>
                
                <div class="dropdown">
                    <button class="btn btn-sm bg-primary text-white m-1 p-2 btn-light dropdown-toggle" type='button'  data-bs-toggle="dropdown" aria-expanded="false">
                       {category}
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" onClick={()=>{setCategory("food-grains-cereals")}} href="#">All</a></li>
                        <li><a class="dropdown-item" onClick={()=>{setCategory("food-grains-cereals")}} href="#">FOOD GRAINS/CEREALS</a></li>
                        <li><a class="dropdown-item" onClick={()=>{setCategory("food-grains-cereals")}} href="#">OILSEEDS</a></li>
                        <li><a class="dropdown-item" onClick={()=>{setCategory("food-grains-cereals")}} href="#">FRUITS</a></li>
                        <li><a class="dropdown-item" onClick={()=>{setCategory("food-grains-cereals")}} href="#">VEGETABLES</a></li>
                        <li><a class="dropdown-item" onClick={()=>{setCategory("food-grains-cereals")}} href="#">SPICES</a></li>
                        <li><a class="dropdown-item" onClick={()=>{setCategory("food-grains-cereals")}} href="#">MISC</a></li>
                     
                    </ul>
                </div>
                <div class="dropdown">
                    <button class="btn btn-sm bg-primary text-white m-1 p-2 btn-light dropdown-toggle" type='button'  data-bs-toggle="dropdown" aria-expanded="false">
                        select category
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                <div class="dropdown">
                    <button class="btn btn-sm bg-primary text-white m-1 p-2 btn-light dropdown-toggle" type='button'  data-bs-toggle="dropdown" aria-expanded="false">
                        select category
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>
                
            </div>
        </>
    )
}

export default TopFilterBar