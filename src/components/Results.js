import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const productsPerPage = 2;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://jeval.com.au/collections/hair-care/products.json?page=1');
        const data = await response.json();
        
        setProducts(data.products);
        setSearchResults(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleSearch = (searchTerm) => {
    const results = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.body_html.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (product.tags && product.tags.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults(results);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchResults.slice(indexOfFirstProduct, indexOfLastProduct);

  const toggleWishlist = (productId) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter(id => id !== productId);
      } else {
        return [...prevWishlist, productId];
      }
    });
  };

  const totalPages = Math.ceil(searchResults.length / productsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  return (
    <div className="results-container">
      <div className="quote-section h-50 justify-content-center align-items-center">
        <h2>Your Hair Deserves the Best!</h2>
        <p className='text-white w-50'> 
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>
        <button className='text-white bg-transparent border' onClick={() => navigate('/')}>Retake Quiz</button>
      </div>
      <div className="carousel-container px-4">
        <div className="product-slider">
          <div className='col row justify-content-center align-items-center border rounded m-0 p-4 info-card'>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
          </div>
          {currentProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="heart-icon-wrapper">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`wishlist-icon ${wishlist.includes(product.id) ? 'wishlist-added' : ''}`}
                >
                  ♥
                </button>
              </div>
              <img src={product.images[0]?.src} alt={product.title} />
              <div className="product-info text-center">
                <h6>{product.title}</h6>
                <p>Price: ${product.variants[0].price}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className='arrow-right'>
          <button className="arrow-right p-4 m-0" onClick={handleNext}>
            &#8594;
          </button>
        </div>
      </div>

      <div className="dots-container py-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <span
            key={index}
            className={`dot ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => goToPage(index + 1)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Results;
