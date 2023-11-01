import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Utils from '../../Utils';
import Paging from '../../paging';
import { useParams } from 'react-router-dom';

const TransitionsPage = () => {
  
  let [transitions, resetTransitions] = useState<any>({total:0,records:[]});
  
  const { page } = useParams();
   
  var currentPage = 1;
  if(page != null) {
    currentPage = Number(page);
  }
  
  var limit = 30; 
  var start = (currentPage - 1) * limit;

  useEffect(() => {
    var url = "/aleo/transition/list?start=" + start + "&limit=" + limit;
    axios.get(url).then(function(response){
      resetTransitions(response.data)
      console.log(response.data);
    }).catch(function(err){
      console.log(err);
    });
    
  },[])

  return (
    <> 
    <p>Transitions</p>
    <table className="table-auto">
      <thead>
        <tr>
          <th><span className="px-2">Transition ID</span></th>
          <th><span className="px-2">Program</span></th> 
          <th><span className="px-2">Function</span></th>
          <th><span className="px-2">Height</span></th>
          <th><span className="px-2">Timestamp</span></th>
        </tr>
      </thead>
      <tbody>
      {transitions.records.map((record: any) => (
        <tr key={record.id}>
          <td><a href={`/transition/${record.id}`}>{record.id}</a></td>
          <td><span className="px-2">{record.program}</span></td>
          <td><span className="px-2">{record.transition_function}</span></td>
          <td><span className="px-2">{record.height}</span></td>
          <td>{Utils.formatDate(record.timestamp)}</td>
        </tr>
      ))}
      </tbody>
    </table>
    <Paging currentPage={currentPage} pageSize={limit} total={transitions.total} url={'/transitions/'}  />
    </>
  );
};

export default TransitionsPage;