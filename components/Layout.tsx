import { ReactNode } from 'react';
import Header from './Header';

type ComponentProps = {
  children: ReactNode;
};

//기본적인 layout component
const Layout = ({ children }: ComponentProps) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default Layout;
