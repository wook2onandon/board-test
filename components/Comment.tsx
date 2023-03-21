import { CommentType } from '@/pages';
import { fetchComment, postComment } from '@/pages/post/[id]';
import styled from '@emotion/styled';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

interface Comment {
  comments: CommentType[];
  postId: number;
  setCommentArr: (e: CommentType[]) => void;
}

const Comment = ({ comments, postId, setCommentArr }: Comment) => {
  const [isComment, setIsComment] = useState('');
  const [isWriter, setIsWriter] = useState('');
  const [isPassword, setIsPassword] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const id = uuid();
    const guidBytes = `0${id.replace(/-/g, '')}`;
    const uuidToInt = parseInt(guidBytes, 16);
    await postComment({
      id: uuidToInt,
      postId: postId,
      content: isComment,
      writer: isWriter,
      password: isPassword,
      created_at: new Date().toISOString(),
    });
    const res = await fetchComment(postId);
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
      <PostCommentLength>댓글 {comments.length}개</PostCommentLength>
      {comments &&
        comments.map((comment) => {
          return (
            !comment.parent && (
              <div key={comment.id}>
                <SingleComment
                  comment={comment}
                  setCommentArr={setCommentArr}
                  postId={postId}
                />
                <ReplyComment
                  comments={comments}
                  comment={comment}
                  setCommentArr={setCommentArr}
                  postId={postId}
                />
              </div>
            )
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
              required
            />
            <PostInput
              type="password"
              placeholder="비밀번호"
              value={isPassword}
              onChange={handlePassword}
              required
            />
          </PostInputWrap>
          <PostTextArea
            placeholder="댓글을 남겨주세요."
            value={isComment}
            rows={50}
            cols={4}
            onChange={handleChange}
            required
          />
          <PostBtnWrap>
            <PostBtn>등록</PostBtn>
          </PostBtnWrap>
        </PostTextForm>
      </PostTextContainer>
    </>
  );
};

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
  margin: 1rem 0 0;
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

const PostBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0 0;
`;

const PostBtn = styled.button`
  padding: 0.5rem 0.8rem;
  background: linear-gradient(to bottom, #fff 0, #f3f3f3 100%);
  border: 1px solid;
  border-color: #ccc #c6c6c6 #c3c3c3 #ccc;
  border-radius: 3px;
`;

export default Comment;
