import React, { useState } from 'react';

export default function Photos(props) {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{ 
        backgroundImage: `url(${props.photos})`,
        width: '210px',
        height: '210px',
        backgroundSize: 'cover',
        cursor: 'pointer',
        borderRadius: '20px',
        filter: 'grayscale(80%)',
        ...(hover && { filter: 'grayscale(0%)', borderRadius: '10px' })
      }}
      src={props.photos}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(event) => props.clickPhoto(event.target.getAttribute('src'))}>
      {/* <img
        src={props.photos}
        onClick={(event) =>
          props.clickPhoto(event.target.getAttribute('src'))}
        alt='photos'
        className='bus-images' /> */}
    </div>
  );
}