import React, { useState } from 'react';
import { Radio } from 'antd';

const Filtersbar = ({ onProductSelect }) => {
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  const handleprice = (value) => {
    setPrice(value);
    onProductSelect(value);
  };

  const handlecategory = (value) => {
    setCategory(value)
    onProductSelect(value)
  }



  return (
    <>

      <div className="categories m-1 p-1">
        <div className="icon">
          <i class="fa-solid fa-filter m-1 p-1"></i>
          Filters
          
        </div>
        <div className="my-2">
          <h5>categories</h5>
          <Radio.Group onChange={(e) => handlecategory(e.target.value)} value={category} style={{ display: "flex", flexDirection: "column" }}>
            <Radio value={"allcategories"} className="m-1">All</Radio>
            <Radio value={"FOOD GRAINS/ CEREALS"} className="m-1">FOOD GRAINS/CEREALS</Radio>
            <Radio value={"OILSEEDS"} className="m-1">OILSEEDS</Radio>
            <Radio value={"FRUITS"} className="m-1">FRUITS</Radio>
            <Radio value={"VEGETABLES"} className="m-1">VEGETABLES</Radio>
            <Radio value={"SPICES"} className="m-1">SPICES</Radio>
            <Radio value={"MISC"} className="m-1">MISC</Radio>

          </Radio.Group>

        </div>
        <div className="mt-3 mb-1">
          <h5>Unit price</h5>
          <Radio.Group onChange={(e) => handleprice(e.target.value)} value={price} style={{ display: "flex", flexDirection: "column" }}>
            <Radio value={"allprice"} className="m-1">All</Radio>
            <Radio value={"l100"} className="m-1">&lt; &#8377;100</Radio>
            <Radio value={"100199"} className="m-1">&#8377;100 - &#8377;199</Radio>
            <Radio value={"200299"} className="m-1">&#8377;200 - &#8377;299</Radio>
            <Radio value={"300399"} className="m-1">&#8377;300 - &#8377;399</Radio>
            <Radio value={"400499"} className="m-1">&#8377;400 - &#8377;499</Radio>
            <Radio value={"g500"} className="m-1">&gt; &#8377;500 </Radio> 

          </Radio.Group>

        </div>
      </div>

    </>
  );
};

export default Filtersbar;
