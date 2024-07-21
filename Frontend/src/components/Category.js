import React, { useEffect, useState } from "react";
import "./Category.css";
import Product from "./Product";

function Category() {
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  //handles change in the minimum price value
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  //handles change in the maximum price value
  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  //handles change in the sort option (price high to low or low to high)
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  //handles the current page value
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //filters the product based on the categories, min price and max price
  const filteredProducts = productList
    .filter(
      (product) =>
        selectedCategory === "All" || product.category === selectedCategory
    )
    .filter(
      (product) =>
        (minPrice === "" || parseInt(product.price) >= parseInt(minPrice)) &&
        (maxPrice === "" || parseInt(product.price) <= parseInt(maxPrice))
    );

  //handles sorting of the filtered products
  if (sortOption === "price-high-to-low") {
    filteredProducts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
  } else if (sortOption === "price-low-to-high") {
    filteredProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
  }

  //useEffect to fetch all the products from the database
  useEffect(() => {
    fetch("http://localhost:8080/productDetails/getAllProducts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product List fetched in Shop By Category");
        setProductList(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  //function to display only 2 products per row
  const groupProductsIntoRows = (products) => {
    const rows = [];
    for (let i = 0; i < products.length; i += 2) {
      rows.push(products.slice(i, i + 2));
    }
    return rows;
  };

  //handles pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="category">
      <div className="category-left">
        <div className="category-filter">
          <h2>Category</h2>
          <div className="categories-container">
            <button
              onClick={(e) => {
                setSelectedCategory("All");
                setCurrentPage(1);
              }}
            >
              All
            </button>
            <button
              onClick={(e) => {
                setSelectedCategory("mobile");
                setCurrentPage(1);
              }}
            >
              Mobile
            </button>
            <button
              onClick={(e) => {
                setSelectedCategory("laptop");
                setCurrentPage(1);
              }}
            >
              Laptop
            </button>
            <button
              onClick={(e) => {
                setSelectedCategory("tablet");
                setCurrentPage(1);
              }}
            >
              Tablet
            </button>
            <button
              onClick={(e) => {
                setSelectedCategory("monitor");
                setCurrentPage(1);
              }}
            >
              Monitor
            </button>
            <button
              onClick={(e) => {
                setSelectedCategory("smartwatch");
                setCurrentPage(1);
              }}
            >
              Smartwatch
            </button>
            <button
              onClick={(e) => {
                setSelectedCategory("accessories");
                setCurrentPage(1);
              }}
            >
              Accessories
            </button>
          </div>
        </div>
        <div className="category-price-filter">
          <h2>Price Range</h2>
          <p>Minimum Price</p>
          <input
            type="number"
            placeholder="Minimum Price"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <p>Maximum Price</p>
          <input
            type="number"
            placeholder="Maximum Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
        <div className="category-sort-filter">
          <h2>Sort By Price</h2>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Default</option>
            <option value="price-high-to-low">Price High to Low</option>
            <option value="price-low-to-high">Price Low to High</option>
          </select>
        </div>
      </div>
      <div className="category-right">
        {groupProductsIntoRows(currentItems).map((row, index) => (
          <div className="category-row" key={index}>
            {row.map((product) => (
              <Product
                key={product.productId}
                id={product.productId}
                title={product.productTitle}
                price={product.price}
                image={product.imageURL}
                rating={product.rating}
              />
            ))}
          </div>
        ))}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={indexOfLastItem >= filteredProducts.length}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default Category;
