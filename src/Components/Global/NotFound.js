import React from "react";

const NotFound = () => {
   return (
      <section className="p-0 bg-img notfound-content">
         <div className="row align-items-center justify-content-center min-vh-100">
            <div className="col-md-9 col-lg-6 my-5">
               <div className="text-center error-page">
                  <h1 className="mb-0 error-header fst-italic">Page Not Found</h1>
                  <h2 className="mb-4 text-white fst-italic">Sorry, something went wrong!</h2>
                  <div>
                     <a href="/" class="btn btn-outline-secondary btn-lg me-sm-2 mb-2 mb-sm-0 error-home-btn">
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
