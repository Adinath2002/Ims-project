import React, { useState, useEffect, useCallback } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PEXELS_API_KEY = 'TkOcFNcK1JNYwaHBziZwMVXoeQMwBUweo7C7z3RsEotA1uO0IcuScJ4d'; // Replace with your Pexels API key

const TransactionDetailsPage = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [imageUrl, setImageUrl] = useState('');

  const navigate = useNavigate();

  // Fetch transaction details
  useEffect(() => {
    const getTransaction = async () => {
      try {
        const transactionData = await ApiService.getTransactionById(transactionId);

        if (transactionData.status === 200) {
          setTransaction(transactionData.transaction);
          setStatus(transactionData.transaction.status);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting a transaction: " + error
        );
      }
    };

    getTransaction();
  }, [transactionId]);

  // Fetch image from Pexels API
  const fetchImageFromPexels = useCallback(async (query) => {
    try {
      const response = await axios.get(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      });
      const imageUrl = response.data.photos[0]?.src?.medium || 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
      console.log('Fetched image URL:', imageUrl); // Log the URL
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image from Pexels:', error);
      return 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
    }
  }, []);

  // Get image URL (local or Pexels) - Memoized with useCallback
  const getImageUrl = useCallback(async (productName) => {
    const pexelsImageUrl = await fetchImageFromPexels(productName);
    return pexelsImageUrl;
  }, [fetchImageFromPexels]); // Add fetchImageFromPexels as a dependency

  // Fetch and set the image URL when transaction or product changes
  useEffect(() => {
    const fetchImage = async () => {
      if (transaction && transaction.product) {
        const url = await getImageUrl(transaction.product.name);
        setImageUrl(url);
      }
    };

    fetchImage();
  }, [transaction, getImageUrl]); // Add getImageUrl to dependencies

  // Update transaction status
  const handleUpdateStatus = async () => {
    try {
      await ApiService.updateTransactionStatus(transactionId, status);
      navigate("/transaction");
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Updating a transaction: " + error
      );
    }
  };

  // Show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <p className="message">{message}</p>}
      <div className="transaction-details-page">
        {transaction && (
          <>
            {/* Transaction base information */}
            <div className="section-card">
              <h2>Transaction Information</h2>
              <p>Type: {transaction.transactionType}</p>
              <p>Status: {transaction.status}</p>
              <p>Description: {transaction.description}</p>
              <p>Note: {transaction.note}</p>
              <p>Total Products: {transaction.totalProducts}</p>
              <p>Total Price: {transaction.totalPrice.toFixed(2)}</p>
              <p>Create AT: {new Date(transaction.createdAt).toLocaleString()}</p>

              {transaction.updatedAt && (
                <p>Updated At: {new Date(transaction.updatedAt).toLocaleString()}</p>
              )}
            </div>

            {/* Product information of the transaction */}
            <div className="section-card">
              <h2>Product Information</h2>
              <p>Name: {transaction.product.name}</p>
              <p>SKU: {transaction.product.sku}</p>
              <p>Price: {transaction.product.price.toFixed(2)}</p>
              <p>Stock Quantity: {transaction.product.stockQuantity}</p>
              <p>Description: {transaction.product.description}</p>

              {imageUrl && (
                <img src={imageUrl} alt={transaction.product.name} />
              )}
            </div>

            {/* User information who made the transaction */}
            <div className="section-card">
              <h2>User Information</h2>
              <p>Name: {transaction.user.name}</p>
              <p>Email: {transaction.user.email}</p>
              <p>Phone Number: {transaction.user.phoneNumber}</p>
              <p>Role: {transaction.user.role}</p>
              <p>Create AT: {new Date(transaction.createdAt).toLocaleString()}</p>
            </div>

            {/* Supplier information who made the transaction */}
            {transaction.suppliers && (
              <div className="section-card">
                <h2>Supplier Information</h2>
                <p>Name: {transaction.supplier.name}</p>
                <p>Contact Address: {transaction.supplier.contactInfo}</p>
                <p>Address: {transaction.supplier.address}</p>
              </div>
            )}

            {/* UPDATE TRANSACTION STATUS */}
            <div className="section-card transaction-staus-update">
              <label>Status: </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="PENDING">PENDING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
              <button onClick={handleUpdateStatus}>Update Status</button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default TransactionDetailsPage;