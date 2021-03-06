import { Button, Input } from "@material-ui/core";
import React, { useState } from "react";
import "./ImageUpload.css";
import { db, storage } from "./firebase";
import firebase from "firebase";

function ImageUpload({ username }) {
  //state vars
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  //useEffect listeners

  //function handlers
  const handleChange = (event) => {
    //handling image selection:...files[0]===first image selected
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    //storing image into db
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        //Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //on upload complete
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image inside db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  //Main function: ImageUpload return
  return (
    <div className="imageupload">
      {/* caption input */}
      {/* <form action="" onSubmit={(e) => e.preventDefault()}> */}
      <progress className="imageupload__progress" value={progress} max="100" />
      <Input
        type="text"
        placeholder="Enter a caption..."
        value={caption}
        onChange={(event) => setCaption(event.target.value)}
      />
      <Input type="file" onChange={handleChange} />
      <Button variant="outlined" color="secondary" onClick={handleUpload}>
        Upload
      </Button>
      {/* </form> */}
      {/* file picker */}
      {/* post button */}
    </div>
  );
}

export default ImageUpload;
