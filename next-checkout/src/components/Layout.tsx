import React from "react";

const page = (props: any) => {
  return (
    <>
      <head>
        <script src="https://js.stripe.com/v3/"></script>
      </head>
      <div className="container">{props.children}</div>
    </>
  );
};

export default page;
