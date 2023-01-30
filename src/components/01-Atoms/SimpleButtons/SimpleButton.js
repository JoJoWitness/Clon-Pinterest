import React from 'react';
import './buttons.scss'

export const SimpleButton= (props) => {
  const {text, fn, fn_argument, className} = props;
  (fn) ? fn : {};
  const argument = (fn_argument) ? fn_argument : null;

  return (
    <button 
      className={className}
      onClick={ () => fn(argument)}
    >
      {text}
    </button>
  );
};