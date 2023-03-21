import { CommentType, PostType, dataType } from '@/pages';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import styled from '@emotion/styled';
import Comment from '@/components/Comment';

export const postComment = async (comment: CommentType) => {
  await fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
};

export const fetchComment = async (id: number) => {
  const response = await fetch(`http://localhost:3000/comments?postId=${id}`);
  const data = await response.json();
  return data;
};

const Post = ({ posts, comments }: dataType) => {
  const [post, setPost] = useState<PostType>();
  const [commentArr, setCommentArr] = useState<CommentType[]>([]);

  useEffect(() => {
    setPost({ ...posts[0] });
    setCommentArr(comments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {post && (
        <>
          <DivContainer>
            <PostTitle>
              {post.title.length > 30
                ? `${post.title.substring(0, 30)}...`
                : post.title}
            </PostTitle>
            <PostDate>
              {post.created_at.split('T')[0]}&nbsp;{' '}
              {`${post.created_at.split('T')[1].split(':')[0]}:${
                post.created_at.split('T')[1].split(':')[1]
              }`}
            </PostDate>
          </DivContainer>
          <DivWriterWrap>
            <div>작성자: {post.writer}</div>
            <div>댓글수: {commentArr.length}</div>
          </DivWriterWrap>
          <PostContent>{post.content}</PostContent>
        </>
      )}
      <Comment
        comments={commentArr}
        setCommentArr={setCommentArr}
        postId={{ ...posts[0] }.id}
      />
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const [postsRes, commentslRes] = await Promise.all([
    fetch(`http://localhost:3000/posts?id=${id}`),
    fetch(`http://localhost:3000/comments?postId=${id}`),
  ]);
  const [posts, comments] = await Promise.all([
    postsRes.json(),
    commentslRes.json(),
  ]);
  return { props: { posts, comments } };
};

const DivContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;

const DivWriterWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 1rem;
  border-bottom: 1px solid rgb(229, 229, 229);
  padding: 0.8rem 0;
`;

const PostTitle = styled.h2`
  font-size: 1.4rem;
`;

const PostDate = styled.span`
  color: #6b6b6b;
`;

const PostContent = styled.h3`
  padding: 2rem 0;
  min-height: ;
  font-size: 1.1rem;
  font-weight: 400;
  border-bottom: 1px solid rgb(229, 229, 229);
`;

export default Post;
