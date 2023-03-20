import Posts from '@/components/Posts';
export interface PostType {
  id: number; // 글번호
  title: string; // 제목
  content: string; // 내용
  writer: string; // 작성자
  password: string; // 비밀번호: 응답 값에서는 보이지 않음
  created_at: string; // 작성일자: ISO 8601
  updated_at?: string; // 수정일자: ISO 8601
}

export interface CommentType {
  // /comments
  id: number; // 댓글번호
  postId: number; // 글번호(FK): 댓글이 달린 게시글의 `index`
  parent?: number; // 부모댓글번호: is답글 ? (부모 댓글의 `index`) : undefined
  content: string; // 내용
  writer: string; // 작성자
  password: string; // 비밀번호: 응답 값에서는 보이지 않음
  created_at: string; // 작성일자: ISO 8601
  updated_at?: string; // 수정일자: ISO 8601
}

export interface dataType {
  posts: PostType[];
  comments: CommentType[];
}

function Home({ posts, comments }: dataType) {
  return (
    <>
      <Posts posts={posts} comments={comments} />
    </>
  );
}

export const getServerSideProps = async () => {
  const [postsRes, commentslRes] = await Promise.all([
    fetch('http://localhost:3000/posts'),
    fetch('http://localhost:3000/comments'),
  ]);
  const [posts, comments] = await Promise.all([
    postsRes.json(),
    commentslRes.json(),
  ]);
  return { props: { posts, comments } };
};
// export const getServerSideProps = async () => {
//   const res = await fetch('http://localhost:3000/posts');
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// };

export default Home;
