import React, { useState } from 'react';

const SocialBar = () => {
  const [upDootCount, setCount] = useState(0);

  return (
    <div className='social-bar'>
      <p className='social-bar__liked is-size-4 has-text-grey-dark'>
        &#x21d1;
        <span className='is-size-6 has-text-grey-dark'>{upDootCount} </span>
        <span className="is-size-4 has-text-grey-dark">&#x2709;</span>
      </p>
    </div>
  )
}

export default SocialBar;