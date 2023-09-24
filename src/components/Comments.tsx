import { db } from "@/lib/db";

interface CommentsProps {
  pinId: string;
}

const Comments = async ({ pinId }: CommentsProps) => {
  const comments = await db.comment.findMany({
    where: {
      pinId,
    },
    include: {
      user: true,
    },
  });

  return (
    <div>
      <h2 className="mt-6 font-semibold">Comments</h2>
      {comments
        ? comments.map((comment) => {
            return (
              <div className="mt-4 flex items-center gap-3" key={comment.id}>
                <img
                  src={comment.user.image!}
                  alt="userImage"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div>
                  <h2 className="text-sm">{comment.user.name}</h2>
                  <h2 className="text-sm">{comment.text}</h2>
                </div>
              </div>
            );
          })
        : null}
      {comments.length === 0 ? (
        <h2 className="mt-4 text-sm">No comments yet</h2>
      ) : null}
    </div>
  );
};

export default Comments;
