import React, { useEffect, useState } from "react";

function Search() {
  const[searchQuery,setSearchQuery] = useState("");
  const[filteredTransactions,setFilteredTransactions] = useState([]);
  const[recentTransactions,setRecentTransactions] =useState([]);

  useEffect(()=>{
    fetch('http://localhost:8001/transactions') 
    .then(response=>response.json())
    .then(data=>setRecentTransactions(data.recentTransactions));
  },[]);

  const handleSearch = (e)=>{
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (recentTransactions && recentTransactions.length > 0) { // Add this check
      const filtered = recentTransactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query)
      );
      setFilteredTransactions(filtered);
    }
  };
  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={handleSearch}
        value={searchQuery}
      />
      <i className="circular search link icon"></i>
      <div className="ui list" >
        {filteredTransactions.map((transaction)=>(
          <div key={transaction.id} className="item" >
            {transaction.description}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
