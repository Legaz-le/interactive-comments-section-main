import data from "../context/data.json";
import { useState } from "react";

const Comment = () => {
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  const handleReplyClick = (id: number) => {
    setActiveReplyId(id);
    setReplyContent("");
  };
  const handleEditClick = (id: number, currentContent: string) => {
    setEditId(id);
    setEditContent(currentContent);
  };
  const handleSaveEdit = (id: number) => {
    console.log("Save Edit ID:", id, "New content:", editContent);
    setEditId(null);
    setEditContent("");
  };

  const handleSendReply = (parentId: number) => {
    if (!replyContent.trim()) return;
    console.log("Reply to ID:", parentId, "Content:", replyContent);
    // Here you'd update your data structure or send to API.
    setReplyContent("");
    setActiveReplyId(null);
  };

  return (
    <div className="min-h-screen bg-Grey-50 py-8 px-4 md:px-20">
      {data.comments.map((comment) => (
        <div key={comment.id}>
          <div className="bg-White rounded-md p-5 mb-4 shadow">
            {/* Score & Comment Body */}
            <div className="flex gap-4">
              {/* Score Box */}
              <div className="hidden bg-Grey-50 md:flex  flex-col items-center gap-3 rounded-lg px-2 py-3 w-10">
                <img
                  src="/images/icon-plus.svg"
                  alt="plus"
                  className="cursor-pointer"
                />
                <p className="font-bold text-Purple-600">{comment.score}</p>
                <img
                  src="/images/icon-minus.svg"
                  alt="minus"
                  className="cursor-pointer"
                />
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
                  <button
                    onClick={() => handleReplyClick(comment.id)}
                    className="hidden md:flex group text-Purple-600 group-hover:text-Purple-200 font-bold  items-center gap-1 text-sm cursor-pointer"
                  >
                    <img
                      src="/images/icon-reply.svg"
                      className="w-3 h-3  group-hover:opacity-40 transition "
                    />
                    <span className="transition-colors duration-200 group-hover:text-Purple-200">
                      Reply
                    </span>
                  </button>
                </div>
                <p className="text-gray-700 mt-3">{comment.content}</p>
                <div className="md:hidden flex justify-between mt-2">
                  <div className="bg-Grey-50 flex items-center gap-3 rounded-lg px-5 py-3 w-25">
                    <img
                      src="/images/icon-plus.svg"
                      alt="plus"
                      className="cursor-pointer"
                    />
                    <p className="font-bold text-Purple-600">{comment.score}</p>
                    <img
                      src="/images/icon-minus.svg"
                      alt="minus"
                      className="cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={() => handleReplyClick(comment.id)}
                    className=" group text-Purple-600 group-hover:text-Purple-200 font-bold flex items-center gap-1 text-sm cursor-pointer"
                  >
                    <img
                      src="/images/icon-reply.svg"
                      className="w-3 h-3  group-hover:opacity-40 transition "
                    />
                    <span className="transition-colors duration-200 group-hover:text-Purple-200">
                      Reply
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {activeReplyId === comment.id && (
            <div className="mt-4 flex gap-4 rounded-md shadow items-start bg-White p-5">
              <img
                src={data.currentUser.image.png}
                alt="your avatar"
                className="w-10 h-10 rounded-full"
              />
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="flex-1 resize-none border rounded-md p-2"
              />
              <button
                onClick={() => handleSendReply(comment.id)}
                className="bg-Purple-600 hover:bg-Purple-200 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Reply
              </button>
            </div>
          )}
          {/* Replies */}

          <div className="md:ml-10 md:pl-10 pl-3 mt-4 border-l-1  border-gray-200 space-y-4 bg-Grey-50">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="bg-White rounded-md p-4 shadow">
                <div className="flex gap-4">
                  <div className="hidden bg-Grey-50 md:flex  flex-col items-center gap-3 rounded-lg px-2 py-3 w-10">
                    <img
                      src="/images/icon-plus.svg"
                      alt="plus"
                      className="cursor-pointer"
                    />
                    <p className="font-bold text-Purple-600">{reply.score}</p>
                    <img
                      src="/images/icon-minus.svg"
                      alt="minus"
                      className="cursor-pointer"
                    />
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
                            <button
                              onClick={() => {
                                setShowDeleteModal(true);
                                setDeleteTargetId(reply.id);
                              }}
                              className="hidden group text-Pink-400 text-sm font-bold md:flex items-center gap-1 cursor-pointer group-hover:text-Pink-200"
                            >
                              <img
                                src="/images/icon-delete.svg"
                                alt="delete"
                                className="group-hover:opacity-40 transition"
                              />
                              <span className="transition-colors duration-200 group-hover:text-Pink-200">
                                Delete
                              </span>
                            </button>
                            <button
                              onClick={() =>
                                handleEditClick(reply.id, reply.content)
                              }
                              className="hidden group text-Purple-600 group-hover:text-Purple-200 text-sm font-bold md:flex items-center gap-1 cursor-pointer"
                            >
                              <img
                                src="/images/icon-edit.svg"
                                alt="delete"
                                className="group-hover:opacity-40 transition"
                              />
                              <span className="transition-colors duration-200 group-hover:text-Purple-200">
                                Edit
                              </span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleReplyClick(reply.id)}
                            className="hidden  group text-Purple-600 group-hover:text-Purple-200 font-bold md:flex items-center gap-1 text-sm cursor-pointer"
                          >
                            <img
                              src="/images/icon-reply.svg"
                              className="w-3 h-3 group-hover:opacity-40 transition"
                            />
                            <span className="transition-colors duration-200 group-hover:text-Purple-200 ">
                              Reply
                            </span>
                          </button>
                        )}
                      </div>
                      {showDeleteModal && (
                        <div className="fixed inset-0 bg-Grey-500/20 flex items-center justify-center z-50">
                          <div className="bg-white p-6 rounded-lg w-80 shadow-lg text-center">
                            <h2 className="text-lg font-bold mb-4">
                              Delete Comment
                            </h2>
                            <p className="text-gray-600 mb-6">
                              Are you sure you want to delete this comment? This
                              action cannot be undone.
                            </p>
                            <div className="flex justify-between">
                              <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer"
                              >
                                NO, CANCEL
                              </button>
                              <button
                                onClick={() => {
                                  // 🔥 delete logic here
                                  console.log("Deleting ID:", deleteTargetId);
                                  setShowDeleteModal(false);
                                  setDeleteTargetId(null);
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
                              >
                                DELETE
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {editId === reply.id ? (
                      <div className="mt-3">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full border rounded-md p-2"
                        />
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => handleSaveEdit(reply.id)}
                            className="bg-Purple-600 text-white px-3 py-1 rounded cursor-pointer"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 mt-3">
                          <span className="text-Purple-600 font-bold">
                            @{reply.replyingTo}
                          </span>{" "}
                          {reply.content}
                        </p>
                        <div className="md:hidden flex justify-between mt-3">
                          <div className="bg-Grey-50 flex items-center gap-3 rounded-lg px-5 py-3 w-25">
                            <img
                              src="/images/icon-plus.svg"
                              alt="plus"
                              className="cursor-pointer"
                            />
                            <p className="font-bold text-Purple-600">
                              {reply.score}
                            </p>
                            <img
                              src="/images/icon-minus.svg"
                              alt="minus"
                              className="cursor-pointer"
                            />
                          </div>

                          {reply.user.username === data.currentUser.username ? (
                            <div className="flex gap-4">
                              <button
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setDeleteTargetId(reply.id);
                                }}
                                className="text-Pink-400 font-bold text-sm flex items-center gap-1"
                              >
                                <img
                                  src="/images/icon-delete.svg"
                                  className="w-3 h-3"
                                />
                                Delete
                              </button>
                              <button
                                onClick={() =>
                                  handleEditClick(reply.id, reply.content)
                                }
                                className="text-Purple-600 font-bold text-sm flex items-center gap-1"
                              >
                                <img
                                  src="/images/icon-edit.svg"
                                  className="w-3 h-3"
                                />
                                Edit
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleReplyClick(reply.id)}
                              className="text-Purple-600 font-bold text-sm flex items-center gap-1"
                            >
                              <img
                                src="/images/icon-reply.svg"
                                className="w-3 h-3"
                              />
                              Reply
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {activeReplyId === reply.id && (
                  <div className="mt-4 flex gap-4 items-start">
                    <img
                      src={data.currentUser.image.png}
                      alt="your avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write your reply..."
                      className="flex-1 resize-none border rounded-md p-2"
                    />
                    <button
                      onClick={() => handleSendReply(reply.id)}
                      className="bg-Purple-600 hover:bg-Purple-200 text-white px-4 py-2 rounded-md cursor-pointer"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
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
