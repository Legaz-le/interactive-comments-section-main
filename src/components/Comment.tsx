import data from "../context/data.json";

const Comment = () => {
  return (
    <div className="container mx-auto bg-White">
      <>
        {data.comments.map((comment) => (
          <div className="flex p-5 gap-3">
            <div className="bg-Grey-50 p-3 rounded-md gap-2 justify-between flex flex-col">
              <img src="/images/icon-plus.svg" alt="plus" />
              {comment.score}
              <img src="/images/icon-minus.svg" alt="minus" />
            </div>
            <div>
              <div
                key={comment.id}
                className="flex items-center justify-between my-"
              >
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-5">
                    <img
                      src={comment.user.image.png}
                      alt="avatar-img"
                      className="h-10 w-10"
                    />
                    <p className="font-semibold">{comment.user.username}</p>
                  </div>
                  <p>{comment.createdAt}</p>
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
              <div className="">
                <p>{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default Comment;
