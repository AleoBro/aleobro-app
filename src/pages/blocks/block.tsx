import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import Utils from '../../Utils';

const BlockPage: React.FC = () => {
  const { height } = useParams();

  let [block, resetBlock] = useState<any>({});
  let [transactions, resetTransactions] = useState<any>([]);
  let [certificates, resetCertificates] = useState<any>([]);

  useEffect(() => {
    var url = '/aleo/block/list?page=1&start=0&limit=10&block_hash=' + height;
    
    if (height != undefined && height.match(/^\d+$/)) {
      url = '/aleo/block/list?page=1&start=0&limit=10&height=' + height;
    }
    axios.get(url).then(function(response){
      var tmp = response.data.records[0];
      resetBlock(tmp);

      var url = '/aleo/transaction/list?page=1&start=0&limit=10&height=' + tmp.height;
      axios.get(url).then(function(response){
        resetTransactions(response.data.records);
        console.log(response.data.records);
      }).catch(function(err) {
        console.log(err);
      });

      var url = '/aleo/certificate/list?page=1&start=0&limit=10&height=' + tmp.height;
      axios.get(url).then(function(response){
        resetCertificates(response.data.records);
        console.log(response.data.records);
      }).catch(function(err) {
        console.log(err);
      });
    }).catch(function(err) {
      console.log(err);
    });

  },[])


  return (
    <>
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Block {block.height}</h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Height</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.height}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Block hash</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.block_hash}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Timestamp</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{Utils.formatDate(block.timestamp)}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Proof target</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.proof_target}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Coinbase target</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.coinbase_target}</dd>
          </div> 
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Cumulative proof target</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.cumulative_proof_target}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Coinbase reward</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.block_reward}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Puzzle reward</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.puzzle_reward}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Cumulative weight</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.cumulative_weight}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Previous block hash</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"><a href={`/block/${block.previous_hash}`}>{block.previous_hash}</a></dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Previous state root</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.previous_state_root}</dd>
          </div> 
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Transactions root</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.transactions_root}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Finalize root</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.finalize_root}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Ratifications root</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.ratifications_root}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Solutions root</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{block.solutions_root}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Transactions</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              
            </dd>
          </div>

          <div className="divide-y divide-gray-100 rounded-md border border-gray-200">
            <table className="table-auto ">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th><span className="px-2">Type</span></th>
                <th><span className="px-2">State</span></th> 
              </tr>
            </thead>
            <tbody>
            {transactions.map((record: any) => ( 
              <tr key={record.id}>
                <td><a href={`/transaction/${record.id}`}>{record.id}</a></td>
                <td><span className="px-2">{record.transaction_type}</span></td>
                <td><span className="px-2">{record.status}</span></td> 
              </tr> 
            ))}
            </tbody>
            </table>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Subdag Details</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              
            </dd>
          </div>

          <div className="divide-y divide-gray-100 rounded-md border border-gray-200">
            <table className="table-auto ">
            <thead>
              <tr>
                <th><span className="px-2">Round</span></th>
                <th><span className="px-2">Idx</span></th>
                <th><span className="px-2">Certificate ID</span></th> 
              </tr>
            </thead>
            <tbody>
            {certificates.map((record: any) => ( 
              <tr key={record.certificate_id}>
                <td><span className="px-2">{record.round}</span></td>
                <td><span className="px-2">{record.round}</span></td>
                <td><span className="px-2">{record.certificate_id}</span></td> 
              </tr> 
            ))}
            </tbody>
            </table>
          </div>

        </dl>
      </div>
    </div>
    </>
  );
};

export default BlockPage;