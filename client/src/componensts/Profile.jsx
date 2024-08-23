import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

//firbase storage
// allow read;
//       allow write :if
//       request.resource<2*1024*1024 &&
//       request.resource.contentType.matches('image/.*')
const Profile = () => {
  const fileref = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileper, setFileper] = useState(0);
  const [fileuploadererror, setFileuploadererror] = useState(false);
  const [formdata, setFormdata] = useState({});

  console.log(fileper + " " + fileuploadererror);
  useEffect(() => {
    if (file) {
      handlefile(file);
    }
  }, [file]);
  const handlefile = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadtask = uploadBytesResumable(storageRef, file);
    uploadtask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFileper(Math.round(progress));
    },
    (error) => {
      setFileuploadererror(true);
    },
    () => {
      getDownloadURL(uploadtask.snapshot.ref).then((downloadUrl) => 
        setFormdata({ ...formdata, avatar: downloadUrl }));
    }
    );
  };
  console.log(formdata);
  return (
    <div className=" p-3 m-auto max-w-lg">
      <h1 className=" text-5xl text-center font-semibold  m-7 text-slate-700">
        Profile
      </h1>
      <form className=" flex flex-col gap-4  ">
        <input
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileref}
          accept="image/*"
        />
        <img
          onClick={() => fileref.current.click()}
          src={formdata.avatar || currentUser.avatar}
          alt="profile"
          className="h-32 w-32 cursor-pointer  m-auto object-cover rounded-full"
        />
        <p className="text-center">
          {fileuploadererror ? (
            <span className="text-red-700">
              Error:image not updated(image should be less than 2mb)
            </span>
          ) : fileper < 100 && fileper > 0 ? (
            <span className="text-slate-500"> {`uploading ${fileper}%`}</span>
          ) : fileper == 100 ? (
            <span className="text-green-700">Image Successfully uploaded </span>
          ) : (
            ''
          )}
        </p>
        <input
          className="border p-3 rounded-lg "
          id="username"
          type="text"
          placeholder="username"
        />
        <input
          className="border p-3 rounded-lg  "
          id="email"
          type="Email"
          placeholder="email"
        />
        <input
          className="border p-3 rounded-lg "
          id="password"
          type="text"
          placeholder="Password"
        />
        <button className=" bg-slate-700 rounded-lg text-xl text-white p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className=" text-red-700 flex justify-between mt-5 ">
        <span className=" cursor-pointer">Delete account</span>
        <span className=" cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
