import React from "react";

const page = (props:any) => {
  return (
    <>
      <div className="container">
        {props.children}
      </div>
    </>
  );
};

export default page;
