import React, { useState, useEffect } from "react";
import axios from "axios";
import CommonCreate from "./CommonCreate";
import ComentList from "./ComentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    // const res = await axios.get("http://localhost:5000/posts");
    const res = await axios.get("http://localhost:5002/posts");
    console.log(res.data);
    setPosts(res.data);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const renderPost = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          {/* <ComentList postId={post.id} /> */}
          <ComentList comments={post.comments} />
          <CommonCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div>
      <h6>Post List</h6>
      {renderPost}
    </div>
  );
};

export default PostList;
