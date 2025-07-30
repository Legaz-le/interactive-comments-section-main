import "../context/data.json";

const Comment = () => {
  return (
    <div className="container mx-auto bg-White">
        <div>
            <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                  <img src="/images/avatars/image-amyrobson.png" alt="avatar-img"  className="h-10 w-10"/> 
                  <p></p>
                  </div>
                  <button className="flex  items-center cursor-pointer gap-5"><img src="/images/icon-reply.svg" alt="reply-icon"  className="object-contain"/> Reply</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comment
