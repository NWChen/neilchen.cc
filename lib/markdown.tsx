import React from "react";

export const renderers = {
  image: ({ ...props })  => 
    <img style={{ 
      maxWidth: '100%',
      display: 'block',
      margin: '0 auto'
    }} {...props}/>
}
  // ({ node, ...props }) => <img style={{ maxWidth: '100%' }}{...props} />
