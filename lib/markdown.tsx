import React from "react";

export const renderers = {
  image: ({ style, ...props }: any) => 
    <img style={{ 
      maxWidth: '75%',
      display: 'block',
      margin: '0 auto',
      ...style,
    }} {...props}/>
}
