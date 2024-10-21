import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div className="comments-section mt-4">
      <h6>Comments</h6>
      <ul className="list-group">
        {comments.map((comment, index) => (
          <li key={index} className="list-group-item">
            {comment.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
