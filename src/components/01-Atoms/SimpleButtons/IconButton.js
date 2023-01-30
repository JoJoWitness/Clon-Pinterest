import React from 'react';

export const IconButton = (props) => {
  const {src, alt,fn,fn_argument, className} = props;
  (fn) ? fn : {};
  const argument = (fn_argument) ? fn_argument : null;



  return (
    <button 
      className={className}
      onClick={ () => fn(argument) }
    >
      <img src={src} alt={alt}></img>
    </button>
  );
};