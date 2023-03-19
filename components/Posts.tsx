import Link from 'next/link';
import PostCard from './PostCard';
import { dataType } from '@/pages';
import { useState } from 'react';
import Pagination from './Pagenation';

const Posts = ({ posts, comments }: dataType) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const offset = (page - 1) * limit;
  const [pageNum, setPageNum] = useState<Number>(1);

  return (
    <>
      {posts &&
        posts.slice(offset, offset + limit).map((post) => {
          return <PostCard post={post} key={post.id} comments={comments} />;
        })}
      <label>
        페이지 당 표시할 게시물 수:&nbsp;
        <select
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
      <Pagination
        total={posts.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Posts;
