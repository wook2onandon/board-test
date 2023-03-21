import styled from '@emotion/styled';
import { PostType } from '..';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';

export const postContent = async (post: PostType) => {
  await fetch('http://localhost:3000/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
};

const Write = () => {
  const [isContent, setIsContent] = useState('');
  const [isTitle, setIsTitle] = useState('');
  const [isWriter, setIsWriter] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const { push } = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const id = uuid();
    const guidBytes = `0${id.replace(/-/g, '')}`;
    const uuidToInt = parseInt(guidBytes, 16);
    await postContent({
      id: uuidToInt,
      title: isTitle,
      content: isContent,
      writer: isWriter,
      password: isPassword,
      created_at: new Date().toISOString(),
    });
    setIsContent('');
    setIsTitle('');
    setIsWriter('');
    setIsPassword('');
    alert('게시글 작성이 완료되었습니다.');
    push('/');
  };

  const handleChange = (e: any) => {
    setIsContent(e.target.value);
  };

  const handleTitle = (e: any) => {
    setIsTitle(e.target.value);
  };

  const handleWriter = (e: any) => {
    setIsWriter(e.target.value);
  };

  const handlePassword = (e: any) => {
    setIsPassword(e.target.value);
  };

  return (
    <PostTextContainer onSubmit={handleSubmit}>
      <PostTextTitle>게시글 작성</PostTextTitle>
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
        <TitleInput
          type="text"
          placeholder="제목을 입력해주세요."
          value={isTitle}
          onChange={handleTitle}
          required
        />
        <PostTextArea
          placeholder="내용을 입력해주세요."
          value={isContent}
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
  );
};

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
  height: 300px;
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

const TitleInput = styled.input`
  padding: 0.2rem;
  margin: 0 0 1rem;
  width: 100%;
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

export default Write;
