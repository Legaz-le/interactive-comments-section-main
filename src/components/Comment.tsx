import data from "../context/data.json";

const Comment = () => {
  return (
    <div className="container mx-auto bg-White">
      <div>
        {data.comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center justify-between my-4"
          >
            <div className="flex items-center gap-5">
              <img
                src={comment.user.image.png}
                alt="avatar-img"
                className="h-10 w-10"
              />
              <p className="font-semibold">{comment.user.username}</p>
            </div>
            <button className="flex items-center cursor-pointer gap-2 text-Blue">
              <img
                src="/images/icon-reply.svg"
                alt="reply-icon"
                className="object-contain"
              />
              Reply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comment;
