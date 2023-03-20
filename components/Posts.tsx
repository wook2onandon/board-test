import PostCard from './PostCard';
import { dataType } from '@/pages';
import { useState } from 'react';
import Pagination from './Pagenation';
import styled from '@emotion/styled';

const Posts = ({ posts, comments }: dataType) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const offset = (page - 1) * limit;
  const [pageNum, setPageNum] = useState<Number>(1);

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
`;
const LiDate = styled.li`
  flex: 1 0 12%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DivTitle = styled.div`
  font-size: 1rem;
`;

export default Posts;
