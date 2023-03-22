import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CommentType } from '@/pages';
import { v4 as uuid } from 'uuid';
import { fetchComment, postComment } from '@/pages/post/[id]';

export interface SingleCommentType {
  comment: CommentType;
  setCommentArr: (e: CommentType[]) => void;
  postId: number;
}

export const patchComment = async (comment: CommentType) => {
  const res = await fetch(`http://localhost:3000/comments/${comment.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  const result = await res
    .json()
    .then((res) => {
      console.log(res);
    })
    .catch((res) => console.log(res));
};

const SingleComment = ({
  comment,
  setCommentArr,
  postId,
}: SingleCommentType) => {
  const [openReply, setOpenReply] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [openPasswordCheck, setOpenPasswordCheck] = useState(false);
  const [deletePasswordCheck, setDeletePasswordCheck] = useState(false);
  const [isComment, setIsComment] = useState('');
  const [isWriter, setIsWriter] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const [modifyPassword, setModifyPassword] = useState('');

  useEffect(() => {
    if (openModify) {
      setIsComment(comment.content);
    } else {
      setIsComment('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModify]);

  const handleReplySubmit = async (e: any) => {
    e.preventDefault();
    const id = uuid();
    const guidBytes = `0${id.replace(/-/g, '')}`;
    const uuidToInt = parseInt(guidBytes, 16);
    await postComment({
      id: uuidToInt,
      postId: postId,
      parent: comment.id,
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
    setOpenReply(false);
  };

  const handlePasswordCheck = async (id: number) => {
    const res = await fetch(
      `http://localhost:3000/comments/${id}?_password=${isPassword}`,
    );
    const result = await res.json().then((res) => {
      if (res.password === isPassword) {
        setOpenPasswordCheck(false);
        setOpenModify(true);
      } else {
        alert('비밀번호를 확인해주세요.');
      }
    });
  };

  const handleModifyComment = async () => {
    if (comment.parent) {
      await patchComment({
        id: comment.id,
        postId: postId,
        parent: comment.parent,
        content: isComment,
        writer: isWriter,
        password: isPassword,
        created_at: comment.created_at,
        updated_at: new Date().toISOString(),
      });
    } else {
      await patchComment({
        id: comment.id,
        postId: postId,
        content: isComment,
        writer: isWriter,
        password: isPassword,
        created_at: comment.created_at,
        updated_at: new Date().toISOString(),
      });
    }
    alert('댓글 수정이 완료되었습니다.');
  };

  const handleDelete = async (commentId: number, postId: number) => {
    await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: modifyPassword,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const comment = await fetchComment(postId);
          setIsComment('');
          setIsWriter('');
          setIsPassword('');
          setCommentArr(comment);
        } else {
          alert('비밀번호를 확인해주세요.');
        }
      })
      .catch((res) => {
        console.log(res, 'fail');
      });
  };

  const handleCommentOpen = () => {
    setOpenReply((open) => !open);
  };

  const handleDeleteCheckyOpen = () => {
    setDeletePasswordCheck((open) => !open);
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

  const handleDeletPassword = (e: any) => {
    setModifyPassword(e.target.value);
  };

  const handlePassCheck = () => {
    setOpenPasswordCheck((open) => !open);
    setIsPassword('');
  };

  return (
    <>
      <PostCommentWrap key={comment.id}>
        <PostCommentReplyWrap>
          <PostCommentWriterWrap>
            <PostCommentWriter>{comment.writer}</PostCommentWriter>
            <PostCommentDate>
              {comment.created_at.split('T')[0]}&nbsp;{' '}
              {`${comment.created_at.split('T')[1].split(':')[0]}:${
                comment.created_at.split('T')[1].split(':')[1]
              }`}
            </PostCommentDate>
          </PostCommentWriterWrap>
          <PostCommentReplyBox>
            <PostCommentReply onClick={handlePassCheck}>수정</PostCommentReply>
            <PostCommentReply onClick={handleDeleteCheckyOpen}>
              삭제
            </PostCommentReply>
            <PostCommentReply onClick={handleCommentOpen}>
              댓글쓰기
            </PostCommentReply>
          </PostCommentReplyBox>
        </PostCommentReplyWrap>
        {/* 댓글수정 */}
        {openModify ? (
          <PostTextContainer onSubmit={handleModifyComment}>
            <PostTextTitle>댓글수정</PostTextTitle>
            <PostTextForm>
              <PostInputWrap>
                <PostInput
                  type="text"
                  placeholder="작성자"
                  value={isWriter}
                  onChange={handleWriter}
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
        ) : (
          <PostComment>{comment.content}</PostComment>
        )}
      </PostCommentWrap>
      {/* 대댓글 */}
      {openReply && (
        <PostTextContainer onSubmit={handleReplySubmit}>
          <PostTextTitle>↪ 댓글쓰기</PostTextTitle>
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
      )}
      {/* 댓글수정비밀번호체크 */}
      {openPasswordCheck && (
        <>
          <DeleteContainer>
            <DeleteTitle>수정하시겠습니까?</DeleteTitle>
            <DeleteInputWrap>
              <DeleteInput
                type="password"
                placeholder="비밀번호"
                value={isPassword}
                onChange={handlePassword}
                required
              />
            </DeleteInputWrap>
            <DeleteBtnWrap>
              <PostBtn onClick={() => handlePasswordCheck(comment.id)}>
                확인
              </PostBtn>
              <PostBtn onClick={handlePassCheck}>취소</PostBtn>
            </DeleteBtnWrap>
          </DeleteContainer>
          <DeleteBg onClick={handlePassCheck}></DeleteBg>
        </>
      )}

      {deletePasswordCheck && (
        <>
          <DeleteContainer>
            <DeleteTitle>삭제하시겠습니까?</DeleteTitle>
            <DeleteInputWrap>
              <DeleteInput
                type="password"
                placeholder="비밀번호"
                value={modifyPassword}
                onChange={handleDeletPassword}
                required
              />
            </DeleteInputWrap>
            <DeleteBtnWrap>
              <PostBtn onClick={() => handleDelete(comment.id, postId)}>
                확인
              </PostBtn>
              <PostBtn onClick={handleDeleteCheckyOpen}>취소</PostBtn>
            </DeleteBtnWrap>
          </DeleteContainer>
          <DeleteBg onClick={handleDeleteCheckyOpen}></DeleteBg>
        </>
      )}
    </>
  );
};

const PostCommentWrap = styled.div`
  border-bottom: 1px solid rgb(229, 229, 229);
  padding: 1.5rem 0.5rem;
  width: 100%;
`;

const PostCommentWriterWrap = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
`;

const PostCommentWriter = styled.div``;

const PostCommentDate = styled.div`
  font-size: 0.8rem;
  color: #838383;
`;

const PostCommentReplyBox = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PostCommentReply = styled.div`
  font-size: 0.8rem;
  color: #838383;
  cursor: pointer;
`;

const PostCommentReplyWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0 0 0.8rem;
`;

const PostComment = styled.div`
  width: 100%;
  word-break: keep-all;
  word-wrap: break-word;
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
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  background: linear-gradient(to bottom, #fff 0, #f3f3f3 100%);
  border: 1px solid;
  border-color: #ccc #c6c6c6 #c3c3c3 #ccc;
  border-radius: 3px;
`;

const DeleteBg = styled.div`
  background: #000;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

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

const DeleteInputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const DeleteInput = styled.input`
  padding: 0.2rem;

  &:focus {
    outline: none;
  }
`;

const DeleteBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  margin: 2rem 0 0;
`;

export default SingleComment;
