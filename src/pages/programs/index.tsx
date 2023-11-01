import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Paging from '../../paging';
import { useParams } from 'react-router-dom';
import Utils from '../../Utils';

const ProgramPage = () => {
  
  let [programs, resetPrograms] = useState<any>({total:0,records:[]});

  const { page } = useParams();
   
  var currentPage = 1;
  if(page != null) {
    currentPage = Number(page);
  }
  
  var limit = 30; 
  var start = (currentPage - 1) * limit;
  
  useEffect(() => {
    var url = "/aleo/program/list?start=" + start + "&limit=" + limit;
    axios.get(url).
    then(function(response){
      resetPrograms(response.data)
      console.log(response.data);
    }).
    catch(function(err){
      console.log(err);
    });
  },[])

  return (
    <> 
    <p>Programs</p>
    <table className="table-auto">
      <thead>
        <tr>
          <th>Program ID</th>
          <th><span className="px-2">Owner</span></th>
          <th><span className="px-2">In Block</span></th> 
          <th><span className="px-2">Deployed Timestamp</span></th>
        </tr>
      </thead>
      <tbody>
      {programs.records.map((record: any) => (
        <tr key={record.program_id}>
          <td><a href={`/program/${record.program_id}`}>{record.program_id}</a></td>
          <td><span className="px-2">{record.owner}</span></td>
          <td><span className="px-2">{record.height}</span></td>
          <td><span className="px-2">{Utils.formatDate(record.timestamp)}</span></td>
        </tr>
      ))}
      </tbody>
    </table>
    <Paging currentPage={currentPage} pageSize={limit} total={programs.total} url={'/programs/'}  />
    </>
  );
};

export default ProgramPage;