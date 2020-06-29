import React, { useState } from "react";
import axios from "axios";

export default function PostCreate() {
  const [title, setTitle] = useState("");

  const submitHandler = async () => {
    const { data } = await axios.post("http://localhost:4000/posts", {
      title,
    });
    setTitle("");
    console.log(data);
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input
            type="form-control"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={submitHandler}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
