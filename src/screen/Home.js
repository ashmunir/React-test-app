import React, { useState, useEffect } from "react";
import "../App.css";

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  //API Integration
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://mock-api.mortgagebasket.co.uk/v1/users?pageSize=100"
      );
      const result = await response.json();
      console.log(result.data, "Data");

      setData(result.data);
    } catch (err) {
      console.log(err, "error while displaying data");
    }
  };

  //filter search data
  const filterData = () => {
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.email.toLowerCase().includes(searchInput.toLowerCase())
    );
    return filteredData;
  };

  //input handling
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };

  //move to previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //move to next page
  const nextPage = () => {
    const totalPages = Math.ceil(filterData().length / 5);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const paginatedData = filterData().slice(startIndex, endIndex);

  const tabularContent = () => {
    if (paginatedData.length > 0) {
      return (
        <table width="100%" className="userTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.date_of_birth}</td>
                <td>{item.email}</td>
                <td>
                  <img
                    src={item.imageUrl}
                    alt="Profile picture"
                    width="50"
                    height="50"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (searchInput === "") {
      return <h4>No data</h4>;
    } else {
      return <h4>Please try some other name </h4>;
    }
  };

  return (
    <div className="App">
      <h2>Home Page</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        onChange={handleSearchInputChange}
        value={searchInput}
      />
      {tabularContent()}
      <div className="pagination">
        <button onClick={previousPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
}

export default Home;
