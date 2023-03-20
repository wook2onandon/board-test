import Link from 'next/link';
import styled from '@emotion/styled';

const Header = () => {
  return (
    <HeaderContainer>
      <Link href="/">
        <HomeLink>Home</HomeLink>
      </Link>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  padding: 2rem 2rem 0;
  height: 100px;
  width: 100%;
  background: #fff;
  box-shadow: 1px 1px 1px 1px rgb(209, 208, 208);
`;

const HomeLink = styled.div`
  font-size: 2rem;
`;

export default Header;
