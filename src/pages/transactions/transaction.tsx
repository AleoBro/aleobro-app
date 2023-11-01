import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Utils from '../../Utils';
import { useParams } from 'react-router-dom';

const TransactionPage = () => {
  const { id } = useParams();
  var url = "/aleo/transaction/list?start=0&limit=10&id=" + id;

  let [transaction, resetTransaction] = useState<any>({});

  let [transitions, resetTransitions] = useState<any>({total:0,records:[]});

  let [finalizes, resetFinalizes] = useState<any>([]);

  useEffect(() => {
    axios.get(url).then(function(response){
      resetTransaction(response.data.records[0]);
      console.log(response.data);
    }).catch(function(err){
      console.log(err);
    });

    var _url = "/aleo/transition/list?start=0&limit=100&transaction_id="+ id;
    axios.get(_url).then(function(response){
      resetTransitions(response.data);
      console.log(response.data);
    }).catch(function(err){
      console.log(err);
    });
    var _url =  "/aleo/finalize/list?page=1&start=0&limit=100&transaction_id=" + id;
      axios.get(_url).then(function(res){
        resetFinalizes(res.data.records);
        console.log(res.data);
      }).catch(function(err){
        console.log(err);
      });
  },[]);
  return (
    <> 
     <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Transaction {transaction.id}</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Transaction ID</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction.id}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Block</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><a href={`/block/${transaction.height}`}>{transaction.height}</a></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Type</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction.transaction_type}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">State</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction.status}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Total fee</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{transaction.fee}</dd>
          </div> 
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Transitions</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              
            </dd>
          </div>
          <table className="table-auto">
      <thead>
        <tr>
          <th>Transition ID</th>
          <th><span className="px-2">Program ID</span></th>
          <th><span className="px-2">Function name</span></th> 
        </tr>
      </thead>
      <tbody>
      {transitions.records.map((record: any) => (
    
        <tr key={record.id}>
          <td><a href={`/transition/${record.id}`}>{record.id}</a></td>
          <td><span className="px-2">{record.program}</span></td>
          <td><span className="px-2">{record.transition_function}</span></td> 
        </tr>
      ))}
      </tbody>
    </table>
    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Finalizes</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            </dd>
          </div>
          <table className="table-auto">
          <thead>
            <tr>
              <th><span className="px-2">Type</span></th>
              <th><span className="px-2">Mapping ID</span></th> 
              <th><span className="px-2">Idx</span></th>  
              <th><span className="px-2">Key ID</span></th> 
              <th><span className="px-2">Value ID</span></th> 
            </tr>
          </thead>
          <tbody>
          {finalizes.map((record: any) => ( 
            <tr key={record.id}>
              <td><span className="px-2">{record.finalize_type}</span></td>
              <td><span className="px-2">{record.mapping_id}</span></td> 
              <td><span className="px-2">{record.finalize_index}</span></td>     
              <td><span className="px-2">{record.key_id}</span></td> 
              <td><span className="px-2">{record.value_id}</span></td> 
            </tr>
          ))}
          </tbody>
        </table>
        </dl>
      </div>
    </>
  );
};

export default TransactionPage;