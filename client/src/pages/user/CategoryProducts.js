import React, { useContext, useEffect, useState } from 'react';
import Nav from '../../components/UIComponents/Nav';
import Footer from '../../components/layouts/Footer';
import axios from "axios";
import AuthContext from '../../context/AuthContext';
import toast from "react-hot-toast";
import { NavLink, useParams } from "react-router-dom";
import ProductCard from '../../components/CardRelated/buycommodity/ProductCard';
import { FilterSearch } from './BuyCommodity';
import Filtersbar from '../../components/Filters/Filtersbar';

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [auth] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const category = params.category;

  const getAllProducts = async () => {
    try {
      let url = `${process.env.REACT_APP_API}/api/v1/products/get-all-product`;
      if (auth?.user) {
        url = `${process.env.REACT_APP_API}/api/v1/products/get-all-products`;
      }
      const { data } = await axios.get(url);
      if (data?.success) {
        const filteredProducts = data.products.filter(product => product.commodityId.catslug === category);
        setProducts(filteredProducts);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting all products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [category]);

  const Breadcrumb = () => {
    return (
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
          <li class="breadcrumb-item"><NavLink to="/dashboard/user/buy-commodity/all">buy-commodity / all categories</NavLink></li>

          <li class="breadcrumb-item active" aria-current="page">{params.category}</li>
        </ol>
      </nav>
    );
  };

  return (
    <>
      <Nav />
      <Breadcrumb/>
      
      <div className="container" style={{ minHeight: "50vh", display:'flex', flexDirection:"row" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          products.map(p => (
            <ProductCard key={p.id} product={p}  />
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryProducts;
