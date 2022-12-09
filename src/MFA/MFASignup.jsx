import React, { useEffect, useState } from "react";
import baseURL from "../constants/constants";

const MFASignup = ({ username }) => {
  const [image, setImage] = useState(null);

  const handleFetch = () => {
    const url = `${baseURL}/authentication`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username }),
    };

    fetch(url, requestOptions)
      .then((res) => {
        // return res.json();
        // console.log(res.body);
        // if (res.status == "OK") {
        //   setImage(res.body);
        // }
        return res;
        // return URL.createObjectURL(image);
      })
      .then((res) => {
        return res.blob();
        // setImage(res);
      })
      .then((res) => {
        console.log(res);
        return URL.createObjectURL(res);
      })
      .then((res) => setImage(res));
  };

  useEffect(() => {
    if (image == null) {
      handleFetch();
    }
  }, []);

  return (
    <div>
      {image != null && (
        <div>
          <h1 className="text-center mb-5">Scan MFA Code</h1>
          {console.log(username)}
          <img src={image} />
        </div>
      )}
    </div>
  );
};

export default MFASignup;
