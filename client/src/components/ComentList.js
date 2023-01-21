import React, { useState, useEffect } from "react";
import axios from "axios";

const ComentList = ({ comments }) => {
  // const [commentsList, setCommentsList] = useState({});

  // const fetchComments = async () => {
  //   const res = await axios.get(
  //     `http://localhost:5001/post/${postId}/comments`
  //   );
  //   setCommentsList(res.data);
  // };
  // useEffect(() => {
  //   fetchComments();
  // }, []);
  return (
    <div>
      <div>
        <ul>
          {Object.values(comments).map((comments) => {
            let content;
            if (comments.status === "approved") {
              content = comments.content;
            }
            if (comments.status === "pending") {
              content = "Pending";
            }
            if (comments.status === "rejected") {
              content = "Rejected";
            }
            return <li key={comments.id}>{content}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ComentList;
