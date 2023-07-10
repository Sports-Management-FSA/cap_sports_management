import React from "react";

const NotFound = () => {
   return (
      <section className="p-0 fluid">
         <div className="row align-items-center justify-content-center min-vh-100">
            <div className="col-md-9 col-lg-6 my-5">
               <div className="text-center error-page">
                  <span className="mb-0 fst-italic fw-bold" style={{ fontSize: "11.5rem" }}>
                     404
                  </span>
                  <h1 className="mb-0 display-1 fst-italic fw-bold">Page Not Found</h1>
                  <h2 className="mb-4 text-white fst-italic">Sorry, something went wrong!</h2>
                  <div>
                     <a href="/" className="btn btn-outline-dark btn-lg me-sm-2 mb-2 mb-sm-0 error-home-btn">
                        Return Home
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default NotFound;
