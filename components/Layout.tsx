import { ReactNode } from 'react';
import Header from './Header';
import styled from '@emotion/styled';

type ComponentProps = {
  children: ReactNode;
};

//기본적인 layout component
const Layout = ({ children }: ComponentProps) => {
  return (
    <DivContainer>
      <Header />
      <DivContent>{children}</DivContent>
    </DivContainer>
  );
};

const DivContainer = styled.div`
  background-color: rgb(229, 229, 229);
  padding: 6.5rem 2rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const DivContent = styled.div`
  margin: 2rem 0 0;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 2px 2px rgb(209, 208, 208);
`;

export default Layout;
