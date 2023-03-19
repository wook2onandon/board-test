import { CommentType, PostType, dataType } from '@/pages';
import { useEffect, useState } from 'react';

const Post = ({ posts, comments }: dataType) => {
  const [post, setPost] = useState<PostType>();
  const [commentArr, setCommentArr] = useState<CommentType[]>([]);
  const [isComment, setIsComment] = useState('');

  useEffect(() => {
    setPost({ ...posts[0] });
    setCommentArr(comments);
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsComment('');
  };

  const handleChange = (e: any) => {
    setIsComment(e.target.value);
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
