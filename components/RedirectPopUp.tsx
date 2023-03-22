import styled from '@emotion/styled';
import Link from 'next/link';

const RedirectPopUp = ({
  address,
  text,
}: {
  address: string;
  text: string;
}) => {
  return (
    <DeleteContainer>
      <DeleteTitle>{text}</DeleteTitle>
      <PostBtnWrap>
        <PostBtn>
          <Link href={address}>확인</Link>
        </PostBtn>
      </PostBtnWrap>
    </DeleteContainer>
  );
};

const DeleteContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 2rem;
  background: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  z-index: 1001;
`;

const DeleteTitle = styled.h4`
  text-align: center;
  margin: 0 0 0.8rem;
`;

const PostBtn = styled.button`
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #535353;
`;

const PostBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin: 2rem 0 0;
`;

export default RedirectPopUp;
