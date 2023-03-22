import { CommentType } from '@/pages';
import styled from '@emotion/styled';
import SingleComment, { SingleCommentType } from './SingleComment';
import { ReactNode, useEffect, useState } from 'react';

interface ReplyCommentType {
  comment: CommentType;
  setCommentArr: (e: CommentType[]) => void;
  postId: number;
  comments: CommentType[];
}

const ReplyComment = ({
  comment,
  setCommentArr,
  postId,
  comments,
}: ReplyCommentType) => {
  const [childCommentNum, setChildCommentNum] = useState(0);
  const [openReply, setOpenReply] = useState(false);

  useEffect(() => {
    let commentNum = 0;
    comments.map((com) => {
      if (com.parent === comment.id) {
        commentNum++;
      }
    });
    setChildCommentNum(commentNum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  const renderReplyComment = (parentCommentId: number): ReactNode => {
    return comments.map((comment: CommentType) => {
      return (
        <div key={comment.id}>
          {comment.parent === parentCommentId && (
            <ReplyWrap>
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
            </ReplyWrap>
          )}
        </div>
      );
    });
  };

  const handleChange = () => {
    setOpenReply(!openReply);
  };

  return (
    <div>
      {childCommentNum > 0 && (
        <ReplyMoreBtn onClick={handleChange}>
          {!openReply ? `댓글 ${childCommentNum}개 더 보기` : '댓글 닫기'}
        </ReplyMoreBtn>
      )}
      {openReply && renderReplyComment(comment.id)}
    </div>
  );
};

const ReplyMoreBtn = styled.p`
  cursor: pointer;
  font-size: 1rem;
  margin: 0.5rem;
  color: #7f7f7f;
`;

const ReplyWrap = styled.div`
  margin: 0 0 0 2rem;
`;

export default ReplyComment;
