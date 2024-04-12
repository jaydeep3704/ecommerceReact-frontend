import React from "react";
import "./loader.scss"
import { ColorRing } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="loader">
       <ColorRing
      
      visible={true}
      height="75"
      width="75"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={[""]}
      
    />
    </div>
     
    
  );
};

export default Loader;
