import React from 'react';
import Header from '../header';
import Footer from '../footer';

interface IProps {
  children?: React.ReactNode;
}

const Layout: React.FC<IProps> = (props) => {
  const { children } = props;
  return (
    <>
    <Header />
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
           {children}
        </div>
      </div>
    </main>
    <Footer /> 
    </>
  );
};

export default Layout;
