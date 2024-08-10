//import React from "react";
import React,{useState,useEffect} from "react";



function Transaction() {

  const[transactions,setTransactions]=useState([]);

  useEffect(()=>{
    fetch("http://localhost:8001/transactions")
     .then(response=>response.json())
     .then(data=>setTransactions(data))
  },[])
  return (
    <>
    {transactions.map(transaction=>(
      <tr key={transaction.id} >
        <td>{transaction.date}</td>
        <td>{transaction.description}</td>
        <td>{transaction.category}</td>
        <td>{transaction.amount}</td>
      </tr>
    ))}
     
    </>
    
  );
}

export default Transaction;
