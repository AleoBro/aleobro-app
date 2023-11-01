import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Utils from '../Utils';

const HomePage: React.FC = () => {
  
  let [blocks, resetBlocks] = useState<any>({total:0,records:[]});
  let [transactions, resetTransactions] = useState<any>({total:0,records:[]});

  useEffect(() => {
    axios.get('/aleo/block/list?page=1&start=0&limit=10').
    then(function(response){
      resetBlocks(response.data)
      console.log(response.data);
      
    }).
    catch(function(err){
      console.log(err);
    });
    
    axios.get('/aleo/transaction/list?page=1&start=0&limit=10').
    then(function(response){
      resetTransactions(response.data)
      console.log(response.data);
    }).
    catch(function(err){
      console.log(err);
    });
    
  },[])
   
  return (
    
    <>
    <p>Latest Blocks</p>
    <div >
      
    <table className="table-auto">
      <thead>
        <tr>
          <th>Height</th>
          <th><span className="px-2">Proof target</span></th>
          <th><span className="px-2">Coinbase target</span></th> 
          <th><span className="px-2">Block reward</span></th>
          <th><span className="px-2">Puzzle reward</span></th>
          <th><span className="px-2">Solutions</span></th> 
          <th><span className="px-2">Transactions</span></th>
          <th><span className="px-2">Timestamp</span></th>
        </tr>
      </thead>
      <tbody>
      {blocks.records.map((record: any) => (
        <tr key={record.height}>
          <td><a href={`/block/${record.height}`}>{record.height}</a></td>
          <td><span className="px-2">{record.proof_target}</span></td>
          <td><span className="px-2">{record.coinbase_target}</span></td> 
          <td><span className="px-2">{record.block_reward}</span></td>
          <td><span className="px-2">{record.puzzle_reward}</span></td>
          <td><span className="px-2">{record.solutions}</span></td>
          <td><span className="px-2">{record.transactions}</span></td>
          <td><span className="px-2">{Utils.formatDate(record.timestamp)}</span></td>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
    <p>Latest Transactions</p>
    <div >
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
    </div>
    </>
  );
}; 

export default HomePage;