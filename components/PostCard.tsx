import { PostType, CommentType } from "@/pages";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  }, []);

  return (
    <>
      <br />
      <Link href={`/post/${post.id}`}>
        <div>{post.title}</div>
        <div>
          {post.content.length > 20
            ? `${post.content.substring(0, 20)}...`
            : post.content}
        </div>
        <div>{comment.length}</div>
      </Link>
    </>
  );
};

export default PostCard;
