import { Navigate } from "react-router-dom";
import { useState } from "react";

const Error404 = () => {
  const [doRedirect, setDoRedirect] = useState(false);

  setTimeout(() => {
    setDoRedirect(true);
  }, 2000);

  return (
    <>
      <h2>Error, page does not exist. Redirecting...</h2>
      {doRedirect && <Navigate replace to="/" />}
    </>
  );
};

export default Error404;
