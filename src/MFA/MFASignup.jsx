import React, { useEffect, useState } from "react";
import baseURL from "../constants/constants";

const MFASignup = () => {
  const [image, setImage] = useState(null);

  const handleFetch = () => {
    const url = `${baseURL}/authentication`;
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
  }, [image]);

  return (
    <div>
      {image != null && (
        <div>
          <h1 className="text-center mb-5">Scan MFA Code</h1>
          <img src={image} />
        </div>
      )}
    </div>
  );
};

export default MFASignup;
