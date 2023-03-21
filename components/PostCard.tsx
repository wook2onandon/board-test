import { PostType, CommentType } from '@/pages';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const PostCard = ({
  post,
  comments,
}: {
  post: PostType;
  comments: CommentType[];
}) => {
  const [comment, setComment] = useState<CommentType[]>([]);

  useEffect(() => {
    setComment(comments.filter((item) => item.postId === post.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DivContainer>
      <Link href={`/post/${post.id}`}>
        <DivWrap>
          <DivContentWrap>
            <DivTitleWrap>
              <DivTitle>
                {post.title.length > 20
                  ? `${post.title.substring(0, 20)}...`
                  : post.title}
              </DivTitle>
              {comment.length !== 0 && (
                <SpanComment>[{comment.length}]</SpanComment>
              )}
            </DivTitleWrap>
            <DivContent>
              {post.content.length > 40
                ? `${post.content.substring(0, 40)}...`
                : post.content}
            </DivContent>
          </DivContentWrap>
          <DivWriter>{post.writer}</DivWriter>
          <DivDate>{post.created_at.split('T')[0]}</DivDate>
        </DivWrap>
      </Link>
    </DivContainer>
  );
};

const DivContainer = styled.div`
  padding: 1.2rem 0;
  border-bottom: 1px solid rgb(229, 229, 229);
  /* display: flex; */
  /* align-items: center; */
`;

const DivWrap = styled.div`
  display: flex;
  align-items: center;
`;

const DivContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 2 0 70%;
`;

const DivTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0 0 0.5rem;
`;

const DivTitle = styled.div`
  font-size: 1.2rem;
`;

const SpanComment = styled.span`
  font-size: 1rem;
  color: #646464;
`;

const DivContent = styled.div`
  /* flex: 2 0 70%; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const DivWriter = styled.div`
  flex: 1 0 18%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DivDate = styled.div`
  flex: 1 0 12%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default PostCard;
