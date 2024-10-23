import React from "react";

const CommentList = ({ comments }) => {
  console.log(comments);

  return (
    <div className="comments-section mt-4">
      <h6>Comments</h6>
      <ul className="list-group">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <li key={index} className="list-group-item">
              {comment.comment}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CommentList;
