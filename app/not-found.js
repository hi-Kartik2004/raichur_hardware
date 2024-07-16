import React from "react";

function Custom404() {
  return (
    <div className="min-h-screen flex justify-center items-center px-2">
      <div className="max-w-[720px]">
        <h1 className="text-5xl font-bold text-center">404 Page not Found</h1>
        <h3 className="text-center text-3xl font-semibold mt-10">
          You're{" "}
          <span className="underline underline-offset-8 text-red-500">
            Lost,
          </span>{" "}
          this page doesn't Exist!
        </h3>

        <p className="mt-4 text-center">
          The chances are that you're viewing a page without being logged in
          with the appropriate email address or this page has moved to another
          end point.
        </p>
      </div>
    </div>
  );
}

export default Custom404;
