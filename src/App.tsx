import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css"
import BlocksPage from "./pages/blocks";
import PageNotFound from "./pages/notfound";
import HomePage from "./pages/index";
import Layout from "./layouts";
import ProgramsPage from "./pages/programs";
import TransactionsPage from "./pages/transactions";
import BlockPage from "./pages/blocks/block";
import ProgramPage from "./pages/programs/program";
import TransactionPage from "./pages/transactions/transaction";
import TransitionPage from "./pages/transition/transition";
import TransitionsPage from "./pages/transition";
 

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={ 
            <Layout>
              <HomePage /> 
            </Layout>
          } />
          <Route path="/blocks" element={ 
            <Layout>
              <BlocksPage /> 
            </Layout>
          } />
          <Route path="/blocks/:page" element={ 
            <Layout>
              <BlocksPage /> 
            </Layout>
          } />
          <Route path="/block/:height" element={ 
            <Layout>
              <BlockPage/> 
            </Layout>
          } />
          <Route path="/programs" element={ 
            <Layout>
              <ProgramsPage /> 
            </Layout>
          } />
          <Route path="/programs/:page" element={ 
            <Layout>
              <ProgramsPage /> 
            </Layout>
          } />
          <Route path="/program/:id" element={ 
            <Layout>
              <ProgramPage/> 
            </Layout>
          } />
          <Route path="/transactions" element={ 
            <Layout>
              <TransactionsPage /> 
            </Layout>
          } />
          <Route path="/transactions/:page" element={ 
            <Layout>
              <TransactionsPage /> 
            </Layout>
          } />
          <Route path="/transaction/:id" element={ 
            <Layout>
              <TransactionPage/> 
            </Layout>
          } />
          <Route path="/transitions" element={ 
            <Layout>
              <TransitionsPage /> 
            </Layout>
          } />
          <Route path="/transitions/:page" element={ 
            <Layout>
              <TransitionsPage /> 
            </Layout>
          } />
          <Route path="/transition/:id" element={ 
            <Layout>
              <TransitionPage/> 
            </Layout>
          } />
          <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
