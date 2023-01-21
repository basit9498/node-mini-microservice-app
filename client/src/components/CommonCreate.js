import React, { useState, useEffect } from "react";
import axios from "axios";

const CommonCreate = ({ postId }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5001/post/${postId}/comments`, {
      content,
    });
    setContent("");
  };
  const [content, setContent] = useState("");
  return (
    <div>
      <h6>CommonCreate</h6>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Titile</label>
          <input
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="form-control"
          />
        </div>
        <div className="mt-2">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CommonCreate;
