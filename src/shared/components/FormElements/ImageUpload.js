import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  //get access to a dom element
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return; //if not file, don't continue
    }
    const fileReader = new FileReader(); //API baked into browser-side JSON
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    }; //executes once file reading is done
    fileReader.readAsDataURL(file);
  }, [file]);

  //generate preview and forward the file to the surrounding component
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    //.files is default JS on file pickers
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true); //doesn't update immediately, just schedules and forwards
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  //function to open file picker
  const pickImageHandler = () => {
    filePickerRef.current.click(); //this method exists on the input dom node
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
