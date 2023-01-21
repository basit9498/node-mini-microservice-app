import React from "react";
import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/posts", {
      title,
    });
    setTitle("");
  };
  return (
    <div>
      <h2>Post Create</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Titile</label>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
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

export default PostCreate;
