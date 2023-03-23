import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { PostType } from '@/pages';

export const patchContent = async (post: PostType) => {
  const res = await fetch(`http://localhost:3000/posts/${post.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  const result = await res
    .json()
    .then((res) => {
      // console.log(res);
    })
    .catch((res) => {
      // console.log(res)
    });
};

const Write = ({ post }: { post: PostType }) => {
  const [isContent, setIsContent] = useState('');
  const [isTitle, setIsTitle] = useState('');
  const [isWriter, setIsWriter] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const { push, query } = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await patchContent({
      id: Number(query.id),
      title: isTitle,
      content: isContent,
      writer: isWriter,
      password: isPassword,
      created_at: post.created_at,
      updated_at: new Date().toISOString(),
    });
    alert('게시글 수정이 완료되었습니다.');
    push('/');
  };

  const handleChange = (e: any) => {
    setIsContent(e.target.value);
  };

  const handleTitle = (e: any) => {
    setIsTitle(e.target.value);
  };

  useEffect(() => {
    setIsTitle(post.title);
    setIsContent(post.content);
    //@ts-ignore
    setIsWriter(window.localStorage.getItem('writer'));
    //@ts-ignore
    setIsPassword(window.localStorage.getItem('password'));
  }, [post]);

  return (
    <PostTextContainer onSubmit={handleSubmit}>
      <PostTextTitle>게시글 작성</PostTextTitle>
      <PostTextForm>
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

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
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
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  background: linear-gradient(to bottom, #fff 0, #f3f3f3 100%);
  border: 1px solid;
  border-color: #ccc #c6c6c6 #c3c3c3 #ccc;
  border-radius: 3px;
`;

export default Write;
