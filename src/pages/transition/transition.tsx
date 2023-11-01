import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Utils from '../../Utils';
import { useParams } from 'react-router-dom';

const TransitionPage = () => {
  const { id } = useParams();
  var url = "/aleo/transition/list?page=1&start=0&limit=10&id=" + id;

  let [transition, resetTransition] = useState<any>({});
  let [inputs, resetInputs] = useState<any>([]);
  let [outputs, resetOutputs] = useState<any>([]);


  useEffect(() => {
    axios.get(url).then(function(response){
      resetTransition(response.data.records[0]);
      //console.log(response.data);
    }).catch(function(err){
      console.log(err);
    });

    var _url =  "/aleo/input/list?page=1&start=0&limit=100&transition_id=" + id; 
    axios.get(_url).then(function(response){
      resetInputs(response.data.records);
      console.log(response.data);
    }).catch(function(err){
      console.log(err);
    });

    var _url =  "/aleo/output/list?page=1&start=0&limit=100&transition_id=" + id;
    axios.get(_url).then(function(response){
      resetOutputs(response.data.records);
      //console.log(response.data);
    }).catch(function(err){
      console.log(err);
    });
  },[]);
  return (
    <> 
     <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Transition {transition.id}</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Transition ID</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transition.id}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Transaction ID</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><a href={`/transaction/${transition.transaction_id}`}>{transition.transaction_id}</a></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Block</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><a href={`/block/${transition.height}`}>{transition.height}</a></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Program ID</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transition.program}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Function name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transition.transition_function}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Transition public key</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transition.tpk}</dd>
          </div> 
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Transition commitment</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transition.tcm}</dd>
          </div>  
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Inputs</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            </dd>
          </div>
          <table className="table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th><span className="px-2">Type</span></th>
              <th><span className="px-2">Value</span></th> 
              <th><span className="px-2">Tag</span></th> 
            </tr>
          </thead>
          <tbody>
          {inputs.map((record: any) => ( 
            <tr key={record.id}>
              <td>{record.id}</td>
              <td><span className="px-2">{record.type}</span></td>
              <td><span className="px-2">{record.value}</span></td> 
              <td><span className="px-2">{record.tag}</span></td> 
            </tr>
          ))}
          </tbody>
        </table>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Outputs</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            </dd>
          </div>
          <table className="table-auto">
          <thead>
            <tr>
              <th>ID</th>
              <th><span className="px-2">Type</span></th>
              <th><span className="px-2">Value</span></th> 
              <th><span className="px-2">checksum</span></th> 
            </tr>
          </thead>
          <tbody>
          {outputs.map((record: any) => ( 
            <tr key={record.id}>
              <td>{record.id}</td>
              <td><span className="px-2">{record.type}</span></td>
              <td><span className="px-2">{record.value}</span></td> 
              <td><span className="px-2">{record.checksum}</span></td> 
            </tr>
          ))}
          </tbody>
        </table>
        </dl>
      </div>
    </>
  );
};

export default TransitionPage;