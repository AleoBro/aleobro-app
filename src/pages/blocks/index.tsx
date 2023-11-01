import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Utils from '../../Utils';
import Paging from '../../paging';
import { useParams } from 'react-router-dom';


const BlocksPage = () => {
  const { page } = useParams();
   
  var currentPage = 1;
  if(page != null) {
    currentPage = Number(page);
  }
  
  var limit = 30; 
  var start = (currentPage - 1) * limit;

  var url = "/aleo/block/list?start=" + start + "&limit=" + limit;

  let [blocks, resetBlocks] = useState<any>({total:0,records:[]});
  
  useEffect(() => {
    axios.get(url).then(function(response){
      resetBlocks(response.data)
    }).catch(function(err){
      console.log(err);
    });
  },[])


  return (
    <>
    <p>Blocks</p>
    <table className="table-flex">
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
    <Paging currentPage={currentPage} pageSize={limit} total={blocks.total} url={'/blocks/'}  />
    </>
  );
};

export default BlocksPage;