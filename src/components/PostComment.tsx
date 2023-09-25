import { FC } from "react";
import CommentForm from "@/components/CommentForm";
import NavAccountAvatar from "@/components/NavAccountAvatar";

interface PostCommentProps {
  pinId: string;
}

const PostComment: FC<PostCommentProps> = async ({ pinId }) => {
  return (
    <div className="mt-8 flex w-10/12 gap-3">
      <div className="mt-1">
        <NavAccountAvatar />
      </div>
      <CommentForm pinId={pinId} />
    </div>
  );
};

export default PostComment;
