import React, { useState } from 'react'

const TopFilterBar = () => {
    const [category, setCategory] = useState("category")
    const [sort, setsort] = useState("sorty by")
    const [rating,setrating]=useState("rating")
    return (
        <>
            <div className="container" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}>
                <input type="search" className='form-control m-2' placeholder='search for products or use filters' style={{ height: "35px" }} />
                <i className='fa fa-magnifying-glass m-3' style={{ cursor: "pointer" }}></i>

                <div className="dropdown">
                    <button className="btn btn-sm bg-primary text-white m-1 p-2 btn-light dropdown-toggle" style={{ width: "150px" }} type='button' data-bs-toggle="dropdown" aria-expanded="false">
                        {category}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={() => { setCategory("all") }} href="#">All</a></li>
                        <li><a className="dropdown-item" onClick={() => { setCategory("food-grains-cereals") }} href="#">FOOD GRAINS/CEREALS</a></li>
                        <li><a className="dropdown-item" onClick={() => { setCategory("oilseeds") }} href="#">OILSEEDS</a></li>
                        <li><a className="dropdown-item" onClick={() => { setCategory("fruits") }} href="#">FRUITS</a></li>
                        <li><a className="dropdown-item" onClick={() => { setCategory("vegetables") }} href="#">VEGETABLES</a></li>
                        <li><a className="dropdown-item" onClick={() => { setCategory("spices") }} href="#">SPICES</a></li>
                        <li><a className="dropdown-item" onClick={() => { setCategory("misc") }} href="#">MISC</a></li>

                    </ul>
                </div>
                <div className="dropdown">
                    <button className="btn btn-sm bg-primary text-white m-1 p-2 btn-light dropdown-toggle" style={{width:"80px"}} type='button' data-bs-toggle="dropdown" aria-expanded="false">
                        {sort}
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" onClick={() => { setsort("Price ↓") }} href="#">Price - low to high &#8595;</a></li>
                        <li><a className="dropdown-item" onClick={() => { setsort("Price ↑") }} href="#">Price - high to low &#8593;</a></li>
                        <li><a className="dropdown-item" onClick={() => { setsort("date ↓") }} href="#">Date Asc</a></li>
                        <li><a className="dropdown-item" onClick={() => { setsort("date ↑") }} href="#">Date Desc</a></li>
                        <li><a className="dropdown-item" onClick={() => { setrating("Rating ↓") }} href="#">Rating &#8595;</a></li>
                        <li><a className="dropdown-item" onClick={() => { setrating("Rating ↑") }} href="#">Rating &#8593;</a></li>
                    </ul>
                </div>
                

            </div>
        </>
    )
}

export default TopFilterBar