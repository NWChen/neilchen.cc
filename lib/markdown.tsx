import React from "react";

export const renderers = {
  image: ({ ...props })  => 
    <img style={{ 
      maxWidth: '75%',
      display: 'block',
      margin: '0 auto'
    }} {...props}/>
}
