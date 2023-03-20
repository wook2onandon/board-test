import { CommentType, PostType, dataType } from '@/pages';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import styled from '@emotion/styled';

export const postComment = async (comment: CommentType) => {
  await fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: comment.id,
      postId: comment.postId,
      parent: 'number',
      content: comment.content,
      writer: comment.writer,
      password: comment.password,
      created_at: new Date().toISOString(),
    }),
  }).then((response) => console.log(response));
};

export const fetchComment = async (id: number) => {
  const response = await fetch(`http://localhost:3000/comments?postId=${id}`);
  const data = await response.json();
  return data;
};

const Post = ({ posts, comments }: dataType) => {
  const [post, setPost] = useState<PostType>();
  const [commentArr, setCommentArr] = useState<CommentType[]>([]);
  const [isComment, setIsComment] = useState('');
  const [isWriter, setIsWriter] = useState('');
  const [isPassword, setIsPassword] = useState('');

  useEffect(() => {
    setPost({ ...posts[0] });
    setCommentArr(comments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const id = uuid();
    const guidBytes = `0${id.replace(/-/g, '')}`;
    const uuidToInt = parseInt(guidBytes, 16);
    await postComment({
      id: uuidToInt,
      postId: 1,
      // parent: null,
      content: isComment,
      writer: isWriter,
      password: isPassword,
      created_at: new Date().toISOString(),
    });
    const res = await fetchComment({ ...posts[0] }.id);
    setIsComment('');
    setIsWriter('');
    setIsPassword('');
    setCommentArr(res);
  };

  const handleChange = (e: any) => {
    setIsComment(e.target.value);
  };

  const handleWriter = (e: any) => {
    setIsWriter(e.target.value);
  };

  const handlePassword = (e: any) => {
    setIsPassword(e.target.value);
  };

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
      <PostCommentLength>댓글 {commentArr.length}개</PostCommentLength>
      {commentArr.map((comment) => {
        return (
          <PostCommentWrap key={comment.id}>
            <div>{comment.content}</div>
          </PostCommentWrap>
        );
      })}
      <PostTextContainer onSubmit={handleSubmit}>
        <PostTextTitle>댓글쓰기</PostTextTitle>
        <PostTextForm>
          <PostInputWrap>
            <PostInput
              type="text"
              placeholder="작성자"
              value={isWriter}
              onChange={handleWriter}
            />
            <PostInput
              type="password"
              placeholder="비밀번호"
              value={isPassword}
              onChange={handlePassword}
            />
          </PostInputWrap>
          {/* <input
            type="text"
            placeholder="댓글달기..."
            value={isComment}
            onChange={handleChange}
          /> */}
          <PostTextArea
            placeholder="댓글을 남겨주세요."
            value={isComment}
            rows={50}
            cols={4}
            onChange={handleChange}
          />
          <button>등록</button>
        </PostTextForm>
      </PostTextContainer>
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

const PostCommentLength = styled.div`
  width: 100%;
  background: linear-gradient(to bottom, #fff 0, #f9f9f9 100%);
  padding: 0.5rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PostCommentWrap = styled.div`
  border-bottom: 1px solid rgb(229, 229, 229);
  padding: 1.5rem 0.5rem;
`;

const PostTextContainer = styled.div`
  margin: 2rem 0;
  padding: 12px 16px 20px;
  background: #fcfcfc;
  border: 1px solid #ddd;
  border-bottom-color: #ccc;
  border-radius: 8px;
  box-shadow: 0 1px 3px -1px rgba(0, 0, 0, 0.1);
`;

const PostTextTitle = styled.span`
  /*  */
`;

const PostTextArea = styled.textarea`
  background: rgb(255, 255, 255);
  min-height: 4rem;
  height: 49px;
  width: 100%;
  padding: 0.5rem;
`;

const PostTextForm = styled.form`
  margin: 1rem 0;
`;

const PostInputWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin: 0 0 0.5rem;
`;

const PostInput = styled.input`
  padding: 0.2rem;

  &:focus {
    outline: none;
  }
`;

export default Post;
