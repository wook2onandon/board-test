import { CommentType, PostType, dataType } from '@/pages';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { v4 as uuid } from '@types/uuid';

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

  const router = useRouter();

  useEffect(() => {
    setPost({ ...posts[0] });
    setCommentArr(comments);
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
        <div>
          <h1>Post: {post.content}</h1>
          <div>작성자: {post.writer}</div>
          <div>
            작성일: {post.created_at.split('T')[0]}&nbsp;{' '}
            {`${post.created_at.split('T')[1].split(':')[0]}:${
              post.created_at.split('T')[1].split(':')[1]
            }`}
          </div>
        </div>
      )}
      {commentArr.map((comment) => {
        return (
          <div key={comment.id}>
            <div>{comment.content}</div> <br />
          </div>
        );
      })}
      <div onSubmit={handleSubmit}>
        <form>
          <input
            type="text"
            placeholder="작성자"
            value={isWriter}
            onChange={handleWriter}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={isPassword}
            onChange={handlePassword}
          />
          <input
            type="text"
            placeholder="댓글달기..."
            value={isComment}
            onChange={handleChange}
          />
          <button>게시</button>
        </form>
      </div>
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

export default Post;
