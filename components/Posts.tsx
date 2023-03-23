import PostCard from './PostCard';
import { dataType } from '@/pages';
import { useState } from 'react';
import Pagination from './Pagenation';
import styled from '@emotion/styled';
import Link from 'next/link';

const Posts = ({ posts, comments }: dataType) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const offset = (page - 1) * limit;

  return (
    <>
      <LabelArticleNum>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </LabelArticleNum>
      <DivContainer>
        <UlTitleTab>
          <LiTitle>
            <DivTitle>게시글</DivTitle>
          </LiTitle>
          <LiWriter>
            <DivTitle>글쓴이</DivTitle>
          </LiWriter>
          <LiDate>
            <DivTitle>날짜</DivTitle>
          </LiDate>
        </UlTitleTab>
        {posts &&
          posts.slice(offset, offset + limit).map((post) => {
            return <PostCard post={post} key={post.id} comments={comments} />;
          })}
      </DivContainer>
      <PostBtnWrap>
        <Link href={'/write'}>
          <PostBtn>글쓰기</PostBtn>
        </Link>
      </PostBtnWrap>
      <Pagination
        total={posts.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelArticleNum = styled.label`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const UlTitleTab = styled.ul`
  display: flex;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 1px solid rgb(229, 229, 229);
  @media (max-width: 800px) {
    padding: 1rem 0 0.5rem;
  }
`;

const LiTitle = styled.li`
  flex: 2 0 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LiWriter = styled.li`
  flex: 1 0 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    display: none;
  }
`;
const LiDate = styled.li`
  flex: 1 0 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    display: none;
  }
`;

const DivTitle = styled.div`
  font-size: 1rem;
`;

const PostBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0 0;
`;

const PostBtn = styled.button`
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  background: linear-gradient(to bottom, #fff 0, #f3f3f3 100%);
  border: 1px solid;
  border-color: #ccc #c6c6c6 #c3c3c3 #ccc;
  border-radius: 3px;
`;

export default Posts;
