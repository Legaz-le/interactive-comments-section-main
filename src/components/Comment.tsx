import data from "../context/data.json";

const Comment = () => {
  return (
    <div className="min-h-screen bg-Grey-50 py-8 px-4 md:px-20">
      {data.comments.map((comment) => (
        <>
          <div key={comment.id} className="bg-White rounded-md p-5 mb-4 ">
            {/* Score & Comment Body */}
            <div className="flex gap-4">
              {/* Score Box */}
              <div className="bg-Grey-50 flex  flex-col items-center gap-3 rounded-lg px-2 py-3 w-10">
                <img src="/images/icon-plus.svg" alt="plus" className="cursor-pointer" />
                <p className="font-bold text-Purple-600">{comment.score}</p>
                <img src="/images/icon-minus.svg" alt="minus" className="cursor-pointer"/>
              </div>

              {/* Comment Content */}
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <img
                      src={comment.user.image.png}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="font-bold">{comment.user.username}</p>
                    <p className="text-gray-400 text-sm">{comment.createdAt}</p>
                  </div>
                  <button className="group text-Purple-600 group-hover:text-Purple-200 font-bold flex items-center gap-1 text-sm cursor-pointer">
                    <img src="/images/icon-reply.svg" className="w-3 h-3  group-hover:opacity-40 transition " />
                    <span className="transition-colors duration-200 group-hover:text-Purple-200">Reply</span>
                  </button>
                </div>
                <p className="text-gray-700 mt-3">{comment.content}</p>
              </div>
            </div>
          </div>
          {/* Replies */}

          <div className="ml-10 pl-10 mt-4 border-l-1  border-gray-200 space-y-4 bg-Grey-50">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="bg-White rounded-md p-4 shadow">
                <div className="flex gap-4">
                  <div className="bg-Grey-50 flex  flex-col items-center gap-3 rounded-lg px-2 py-3 w-10">
                    <img src="/images/icon-plus.svg" alt="plus" className="cursor-pointer"/>
                    <p className="font-bold text-Purple-600">{reply.score}</p>
                    <img src="/images/icon-minus.svg" alt="minus" className="cursor-pointer"/>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <img
                          src={reply.user.image.png}
                          alt="avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="font-bold">{reply.user.username}</p>
                        {reply.user.username === data.currentUser.username && (
                          <span className="bg-Purple-600 text-white text-xs px-2 rounded">
                            you
                          </span>
                        )}
                        <p className="text-gray-400 text-sm">
                          {reply.createdAt}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {reply.user.username === data.currentUser.username ? (
                          <div className="flex gap-5">
                            <button className="group text-Pink-400 text-sm font-bold flex items-center gap-1 cursor-pointer group-hover:text-Pink-200">
                              <img src="/images/icon-delete.svg" alt="delete"  className="group-hover:opacity-40 transition"/>
                              <span className="transition-colors duration-200 group-hover:text-Pink-200">Delete</span>
                            </button>
                            <button className="group text-Purple-600 group-hover:text-Purple-200 text-sm font-bold flex items-center gap-1 cursor-pointer">
                              <img src="/images/icon-edit.svg" alt="delete"  className="group-hover:opacity-40 transition"/>
                              <span className="transition-colors duration-200 group-hover:text-Purple-200">Edit</span>
                            </button>
                          </div>
                        ) : (
                          <button className="group text-Purple-600 group-hover:text-Purple-200 font-bold flex items-center gap-1 text-sm cursor-pointer">
                            <img
                              src="/images/icon-reply.svg"
                              className="w-3 h-3 group-hover:opacity-40 transition"
                            />
                            <span className="transition-colors duration-200 group-hover:text-Purple-200">Reply</span>
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 mt-3">
                      <span className="text-Purple-600 font-bold">
                        @{reply.replyingTo}
                      </span>{" "}
                      {reply.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ))}

      {/* Add Comment Box */}
      <div className="bg-white mt-8 p-5 rounded-md shadow flex gap-4">
        <img
          src={data.currentUser.image.png}
          alt="your avatar"
          className="w-10 h-10 rounded-full"
        />
        <textarea
          placeholder="Add a comment..."
          className="flex-1 resize-none border-Purple-200 rounded-md p-2 "
        />
        <button className="bg-Purple-600 transition hover:bg-Purple-200 text-white px-4 py-2 rounded-md cursor-pointer">
          SEND
        </button>
      </div>
    </div>
  );
};

export default Comment;
