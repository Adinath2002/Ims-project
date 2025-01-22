// import React, { useState, useEffect } from "react";
// import Layout from "../component/Layout";
// import ApiService from "../service/ApiService";
// import { useNavigate } from "react-router-dom";
// import PaginationComponent from "../component/PaginationComponent";

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   //Pagination Set-Up
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const productData = await ApiService.getAllProducts();

//         if (productData.status === 200) {
//           setTotalPages(Math.ceil(productData.products.length / itemsPerPage));

//           setProducts(
//             productData.products.slice(
//               (currentPage - 1) * itemsPerPage,
//               currentPage * itemsPerPage
//             )
//           );
//         }
//       } catch (error) {
//         showMessage(
//           error.response?.data?.message || "Error Getting Products: " + error
//         );
//       }
//     };

//     getProducts();
//   }, [currentPage]);

//   //Delete a product
//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm("Are you sure you want to delete this Product?")) {
//       try {
//         await ApiService.deleteProduct(productId);
//         showMessage("Product sucessfully Deleted");
//         window.location.reload(); //relode page
//       } catch (error) {
//         showMessage(
//           error.response?.data?.message ||
//             "Error Deleting in a product: " + error
//         );
//       }
//     }
//   };

//   //method to show message or errors
//   const showMessage = (msg) => {
//     setMessage(msg);
//     setTimeout(() => {
//       setMessage("");
//     }, 4000);
//   };

//   return (
//     <Layout>
//       {message && <div className="message">{message}</div>}

//       <div className="product-page">
//         <div className="product-header">
//           <h1>Products</h1>
//           <button
//             className="add-product-btn"
//             onClick={() => navigate("/add-product")}
//           >
//             Add Product
//           </button>
//         </div>

//         {products && (
//           <div className="product-list">
//             {products.map((product) => (
//               <div key={product.id} className="product-item">
//                 <img
//                   className="product-image"
//                   src="./images/carpet.png"
//                   alt={product.name}
//                 />
 
//                 <div className="product-info">
//                     <h3 className="name">{product.name}</h3>
//                     <p className="sku">Sku: {product.su}</p>
//                     <p className="price">Price: {product.price}</p>
//                     <p className="quantity">Quantity: {product.stockQuantity}</p>
//                 </div>

//                 <div className="product-actions">
//                     <button className="edit-btn" onClick={()=> navigate(`/edit-product/${product.id}`)}>Edit</button>
//                     <button  className="delete-btn" onClick={()=> handleDeleteProduct(product.id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <PaginationComponent
//       currentPage={currentPage}
//       totalPages={totalPages}
//       onPageChange={setCurrentPage}
//       />
//     </Layout>
//   );
// };
// export default ProductPage;

// import React, { useState, useEffect } from "react";
// import Layout from "../component/Layout";
// import ApiService from "../service/ApiService";
// import { useNavigate } from "react-router-dom";
// import PaginationComponent from "../component/PaginationComponent";

// // Function to dynamically import images
// const importAll = (r) => {
//   let images = {};
//   r.keys().forEach((item, index) => {
//     images[item.replace('./', '')] = r(item);
//   });
//   return images;
// };

// // Import all images from the assets directory
// const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

// const ProductPage = () => {
//   const [products, setProducts] = useState([]);
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();

//   // Pagination Set-Up
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const productData = await ApiService.getAllProducts();

//         if (productData.status === 200) {
//           setTotalPages(Math.ceil(productData.products.length / itemsPerPage));

//           setProducts(
//             productData.products.slice(
//               (currentPage - 1) * itemsPerPage,
//               currentPage * itemsPerPage
//             )
//           );
//         }
//       } catch (error) {
//         showMessage(
//           error.response?.data?.message || "Error Getting Products: " + error
//         );
//       }
//     };

//     getProducts();
//   }, [currentPage]);

//   // Delete a product
//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm("Are you sure you want to delete this Product?")) {
//       try {
//         await ApiService.deleteProduct(productId);
//         showMessage("Product successfully Deleted");
//         window.location.reload(); // reload page
//       } catch (error) {
//         showMessage(
//           error.response?.data?.message ||
//             "Error Deleting a product: " + error
//         );
//       }
//     }
//   };

//   // Method to show message or errors
//   const showMessage = (msg) => {
//     setMessage(msg);
//     setTimeout(() => {
//       setMessage("");
//     }, 4000);
//   };

//   return (
//     <Layout>
//       {message && <div className="message">{message}</div>}

//       <div className="product-page">
//         <div className="product-header">
//           <h1>Products</h1>
//           <button
//             className="add-product-btn"
//             onClick={() => navigate("/add-product")}
//           >
//             Add Product
//           </button>
//         </div>

//         {products && (
//           <div className="product-list">
//             {products.map((product) => (
//               <div key={product.id} className="product-item">
//                 <img
//                   className="product-image"
//                   src={
//                     images[`${product.name}.jpg`] ||
//                     images[`${product.name}.png`] ||
//                     images[`${product.name}.svg`] ||
//                     'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500'
//                   }
//                   alt={product.name}
//                 />
 
//                 <div className="product-info">
//                     <h3 className="name">{product.name}</h3>
//                     <p className="sku">Sku: {product.su}</p>
//                     <p className="price">Price: {product.price}</p>
//                     <p className="quantity">Quantity: {product.stockQuantity}</p>
//                 </div>

//                 <div className="product-actions">
//                     <button className="edit-btn" onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
//                     <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <PaginationComponent
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={setCurrentPage}
//       />
//     </Layout>
//   );
// };

// export default ProductPage;

import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../component/PaginationComponent";
import axios from "axios";

const PEXELS_API_KEY = 'TkOcFNcK1JNYwaHBziZwMVXoeQMwBUweo7C7z3RsEotA1uO0IcuScJ4d'; // Replace with your Pexels API key

// Function to dynamically import images
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

// Import all images from the assets directory
const localImages = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Pagination Set-Up
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  // Function to fetch image from Pexels API
  const fetchImageFromPexels = async (query) => {
    try {
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      return response.data.photos[0]?.src?.medium || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
    } catch (error) {
      console.error('Error fetching image from Pexels:', error);
      return 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
    }
  };

  // Function to get image URL (local or Pexels)
  const getImageUrl = async (productName) => {
    // Check for local image first
    const localImageKey = Object.keys(localImages).find((key) =>
      key.toLowerCase().includes(productName.toLowerCase())
    );

    if (localImageKey) {
      return localImages[localImageKey]; // Return local image if found
    }

    // If local image not found, fetch from Pexels
    const pexelsImageUrl = await fetchImageFromPexels(productName);
    return pexelsImageUrl;
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ApiService.getAllProducts();

        if (productData.status === 200) {
          setTotalPages(Math.ceil(productData.products.length / itemsPerPage));

          // Fetch images for each product
          const productsWithImages = await Promise.all(
            productData.products
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map(async (product) => {
                const imageUrl = await getImageUrl(product.name);
                return { ...product, imageUrl };
              })
          );

          setProducts(productsWithImages);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting Products: " + error
        );
      }
    };

    getProducts();
  }, [currentPage]);

  // Delete a product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      try {
        await ApiService.deleteProduct(productId);
        showMessage("Product successfully Deleted");
        window.location.reload(); // reload page
      } catch (error) {
        showMessage(
          error.response?.data?.message ||
            "Error Deleting a product: " + error
        );
      }
    }
  };

  // Method to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="product-page">
        <div className="product-header">
          <h1>Products</h1>
          <button
            className="add-product-btn"
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </button>
        </div>

        {products && (
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <img
                  className="product-image"
                  src={product.imageUrl}
                  alt={product.name}
                />
 
                <div className="product-info">
                    <h3 className="name">{product.name}</h3>
                    <p className="sku">Sku: {product.su}</p>
                    <p className="price">Price: {product.price}</p>
                    <p className="quantity">Quantity: {product.stockQuantity}</p>
                </div>

                <div className="product-actions">
                    <button className="edit-btn" onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Layout>
  );
};

export default ProductPage;