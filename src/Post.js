import { Avatar, Fab, Input } from "@material-ui/core";
import { NearMeOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import firebase from "firebase";
import "./Post.css";

function Post({ postId, user, username, caption, imageUrl }) {
  //state vars
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  //useEffect listeners
  useEffect(() => {
    //unsubscribe from the current comment/post
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  //func handlers
  const postComment = (event) => {
    event.preventDefault();

    //submitting post to the database
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      {/* header -> avatar + username */}
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src="/static/images/avatar/1.jpg"
          alt={username}
        />
        <h3>{username}</h3>
      </div>
      {/* image */}
      <img className="post__image" src={imageUrl} alt="" />
      {/* username + caption */}
      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <Input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Fab
            color="secondary"
            aria-label="edit"
            disabled={!comment}
            className="post__button"
            type="submit"
            variant="outlined"
            onClick={postComment}
          >
            <NearMeOutlined />
          </Fab>
        </form>
      )}
    </div>
  );
}

export default Post;
