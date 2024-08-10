import React,{useState} from "react";


function AddTransactionForm() {

  //const [transaction, setTransaction] = useState({});

   const[date,setDate]=useState();
   const[description,setDescription]=useState();
   const[category,setCategory]=useState();
   const[amount,setAmount]=useState(0);

   const handleSubmit = (event) => {
    event.preventDefault();

    const newTransaction ={
      date,
      description,
      category,
      amount,
     };

     fetch('http://localhost:8001/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
     })
      .then(response => response.json())
      .then((data)=>{
          console.log(data);
          setDate("");
          setDescription("");
          setCategory("");
          setAmount(0);
      })
      .catch((error)=>{
        console.log(error);
      });
  
   };
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input type="date" name="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
          <input type="text" name="description" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
          <input type="text" name="category" placeholder="Category" value={category} onChange={(event)=>setCategory(event.target.value)} />
          <input type="number" name="amount" placeholder="Amount" step="0.01" value={amount} onChange={(e)=>setAmount(e.target.valueAsNumber)} />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
