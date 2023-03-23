import { CommentType, PostType, dataType } from '@/pages';
import { useEffect, useState } from 'react';
import Comment from '@/components/Comment';
import styled from '@emotion/styled';
import RedirectPopUp from '@/components/RedirectPopUp';
import { useRouter } from 'next/router';

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

const Post = ({
  posts,
  comments,
}: {
  posts: PostType;
  comments: CommentType[];
}) => {
  const [post, setPost] = useState<PostType>();
  const [commentArr, setCommentArr] = useState<CommentType[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openRedirect, setOpenRedirect] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [isPassword, setIsPassword] = useState('');
  const { push } = useRouter();

  useEffect(() => {
    setPost(posts);
    setCommentArr(comments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePassword = (e: any) => {
    setIsPassword(e.target.value);
  };

  const openDeleteCheck = () => {
    setOpenDelete(!openDelete);
  };

  const openModifyCheck = () => {
    setOpenModify(!openModify);
  };

  const handleDelete = async (postId: number) => {
    await fetch(`http://localhost:3000/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: isPassword,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setOpenDelete(false);
          setOpenRedirect(true);
        } else {
          alert('비밀번호를 확인해주세요.');
        }
      })
      .catch((res) => {
        // console.log(res, 'fail');
      });
  };

  const handlePasswordCheck = async (postId: number) => {
    const res = await fetch(
      `http://localhost:3000/posts/${postId}?_password=${isPassword}`,
    );
    const result = await res.json().then((res) => {
      if (res.password === isPassword) {
        //
        window.localStorage.setItem('password', isPassword);
        window.localStorage.setItem('writer', posts.writer);
        push(`/modify/${postId}`);
      } else {
        alert('비밀번호를 확인해주세요.');
      }
    });
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
            <PostBtn onClick={openModifyCheck}>수정</PostBtn>
            <PostBtn onClick={openDeleteCheck}>삭제</PostBtn>
          </DivWriterWrap>
          <PostContent>{post.content}</PostContent>
        </>
      )}
      <Comment
        comments={commentArr}
        setCommentArr={setCommentArr}
        postId={posts.id}
      />
      {openDelete && post && (
        <>
          <DeleteContainer>
            <DeleteTitle>삭제하기</DeleteTitle>
            <PostInputWrap>
              <PostInput
                type="password"
                placeholder="비밀번호"
                value={isPassword}
                onChange={handlePassword}
                required
              />
            </PostInputWrap>
            <PostBtnWrap>
              <PostBtn onClick={() => handleDelete(post.id)}>삭제</PostBtn>
              <PostBtn onClick={openDeleteCheck}>취소</PostBtn>
            </PostBtnWrap>
          </DeleteContainer>
          <DeleteBg onClick={openDeleteCheck}></DeleteBg>
        </>
      )}
      {openModify && post && (
        <>
          <DeleteContainer>
            <DeleteTitle>수정하시겠습니까?</DeleteTitle>
            <PostInputWrap>
              <PostInput
                type="password"
                placeholder="비밀번호"
                value={isPassword}
                onChange={handlePassword}
                required
              />
            </PostInputWrap>
            <PostBtnWrap>
              <PostBtn onClick={() => handlePasswordCheck(post.id)}>
                확인
              </PostBtn>
              <PostBtn onClick={openModifyCheck}>취소</PostBtn>
            </PostBtnWrap>
          </DeleteContainer>
          <DeleteBg onClick={openModifyCheck}></DeleteBg>
        </>
      )}
      {openRedirect && <RedirectPopUp address={'/'} text={'삭제되었습니다.'} />}
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const [postsRes, commentslRes] = await Promise.all([
    fetch(`http://localhost:3000/posts/${id}`),
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
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 1rem;
  border-bottom: 1px solid rgb(229, 229, 229);
  padding: 0.8rem 0;
`;

const PostBtn = styled.button`
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  background: #fff;
  border: 1px solid #535353;
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

const PostInputWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
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
  justify-content: center;
  gap: 0.8rem;
  margin: 2rem 0 0;
`;

export default Post;
