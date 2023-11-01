import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Utils from '../../Utils';
import Paging from '../../paging';
import { useParams } from 'react-router-dom';

const TransactionsPage = () => {
  
  let [transactions, resetTransactions] = useState<any>({total:0,records:[]});
  
  const { page } = useParams();
   
  var currentPage = 1;
  if(page != null) {
    currentPage = Number(page);
  }
  
  var limit = 30; 
  var start = (currentPage - 1) * limit;

  useEffect(() => {
    var url = "/aleo/transaction/list?start=" + start + "&limit=" + limit;
    axios.get(url).then(function(response){
      resetTransactions(response.data)
      console.log(response.data);
    }).catch(function(err){
      console.log(err);
    });
    
  },[])

  return (
    <> 
    <p>Transactions</p>
    <table className="table-auto">
      <thead>
        <tr>
          <th><span className="px-2">Transaction ID</span></th>
          <th><span className="px-2">Type</span></th> 
          <th><span className="px-2">Status</span></th>
          <th><span className="px-2">Fee</span></th>
          <th><span className="px-2">In Block</span></th> 
          <th><span className="px-2">Timestamp</span></th>
        </tr>
      </thead>
      <tbody>
      {transactions.records.map((record: any) => (
        <tr key={record.id}>
          <td><a href={`/transaction/${record.id}`}>{record.id}</a></td>
          <td><span className="px-2">{record.transaction_type}</span></td>
          <td><span className="px-2">{record.status}</span></td>
          <td><span className="px-2">{record.fee}</span></td>
          <td><span className="px-2">{record.height}</span></td>
          <td>{Utils.formatDate(record.timestamp)}</td>
        </tr>
      ))}
      </tbody>
    </table>
    <Paging currentPage={currentPage} pageSize={limit} total={transactions.total} url={'/transactions/'}  />
    </>
  );
};

export default TransactionsPage;