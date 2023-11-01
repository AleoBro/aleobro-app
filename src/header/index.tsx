import { WalletMultiButton } from '@demox-labs/aleo-wallet-adapter-reactui';
import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  let navigate = useNavigate();
  const refSearch = useRef<HTMLInputElement>(null);
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    let value = refSearch.current?.value;

    if(value == null || value.trim() == "") {
      return;
    }
    var url = '/aleo/block/search?input=' + value;
    axios.get(url).then(function(response){ 
      console.log(response.data);
      
      if(response.data.message == 'block') {
        navigate("/block/"+value);
      } else if(response.data.message == 'transaction') {
        navigate("/transaction/"+value);
      } else if(response.data.message == 'program') {
        navigate("/program/"+value);
      }
    }).catch(function(err){
      console.log(err);
    });
  };
  return (
  <header className="py-10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <nav className="relative z-50 flex justify-between">
        <div className="flex items-center md:gap-x-12">
          <a aria-label="Home" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="150" height="30" viewBox="9 4.19 130.7 22.66">
              <g fill="#0F172A">
                <path d="M28.493 4.587h-2.885v2.024h1.873v15.838h2.023V4.587h-1.011ZM43.916 16.229c0-4.272-2.373-6.82-6.02-6.82-3.646 0-6.044 2.423-6.044 6.695 0 4.271 2.373 6.595 6.045 6.595 2.897 0 5.07-1.674 5.67-3.997h-2.249c-.5 1.074-1.523 2.024-3.421 2.024-2.448 0-3.697-1.55-3.946-3.773h9.965v-.724Zm-9.94-1.2c.3-2.147 1.598-3.672 3.92-3.672 2.323 0 3.547 1.5 3.847 3.673h-7.767ZM51.882 9.409c-3.671 0-6.044 2.423-6.044 6.695 0 4.271 2.373 6.595 6.044 6.595 3.672 0 6.019-2.248 6.019-6.595 0-4.347-2.373-6.695-6.019-6.695Zm0 11.367c-2.622 0-4.046-2.049-4.046-4.697s1.424-4.771 4.046-4.771c2.622 0 4.021 2.073 4.021 4.771s-1.373 4.697-4.021 4.697ZM19.515 4.587h-4.121L11.817 15.03h2.179l2.897-8.52h1.049l2.897 8.52h-6.844l-.673 1.923h8.166l1.873 5.496h2.248L19.515 4.587ZM9.275 22.45h2.173l1.873-5.497h-2.163L9.275 22.45Z"></path>
                <path d="M9.658 15.03 9 16.953h2.159l.66-1.923h-2.16Z"></path>
              </g>
               
  <text x="60" y="15" fill="#2563eb">Bro</text>
 
            </svg>
          </a>
          <div className="hidden md:flex md:gap-x-6">
            <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/blocks">Blocks</a>
            <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/programs">Programs</a>
            <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/transactions">Transactions</a>
          </div>
        </div>
        <div className="flex items-center gap-x-5 md:gap-x-8">
          <div className="hidden md:block">
           
          </div>
          <WalletMultiButton style={{backgroundColor: '#0c359c'}} />
          <div className="-mr-1 md:hidden">
            <div data-headlessui-state="">
              <button className="relative z-10 flex h-8 w-8 items-center justify-center ui-not-focus-visible:outline-none" aria-label="Toggle Navigation" type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:r0:">
                <svg aria-hidden="true" className="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none">
                  <path d="M0 1H14M0 7H14M0 13H14" className="origin-center transition"></path>
                  <path d="M2 2L12 12M12 2L2 12" className="origin-center transition scale-90 opacity-0"></path>
                </svg>
              </button>
            </div>

            {
            //<div style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px; display: none;"></div>
            }
          </div>
        </div>
      </nav>
    
    </div>
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
        <div className="max-w-xl lg:max-w-lg">
          <div className="mt-6 flex max-w-md gap-x-4">
            <input ref={refSearch} required 
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6" 
            placeholder="Search by Program ID / Block Height / Transaction ID" />
            <button onClick={handleSubmit} type="submit" className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                    Search
                  </button>
          </div>
        </div>
      </div>
    </div>
    {/*
    <div className="relative w-full max-w-lg transform px-4 transition-all opacity-100 scale-100">
	<div className="overflow-hidden rounded-lg bg-white shadow-md" id="headlessui-dialog-panel-24" data-headlessui-state="open">
		<div className="relative">
			<input className="block w-full appearance-none bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:text-sm sm:leading-6" placeholder="Find anything..." aria-label="Search components" id="headlessui-combobox-input-25" role="combobox" type="text" aria-expanded="false" aria-autocomplete="list" data-headlessui-state="" value=""   />
				<svg className="pointer-events-none absolute right-4 top-4 h-6 w-6 fill-slate-400" xmlns="http://www.w3.org/2000/svg">
					<path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
				</svg>
		</div>
	</div>
</div>
          */}
  </header>
  );
};

export default Header;
