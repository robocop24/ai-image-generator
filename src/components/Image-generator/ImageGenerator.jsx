import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import defualt_img from '../../assets/react.svg'

const ImageGenerator = () => {

  const api_key = process.env.REACT_API_IMG_KEY;
  const url = process.env.url;
  const [imgUrl, setimgUrl] = useState(null)
  const [loader, setloader] = useState(false)
  const input_ref = useRef('/')
  const handleGen = async () => {
    setloader(true)
    if(input_ref.current.value === ""){
      setloader(false)
      return 0;
    }
    const resp = await fetch(url,
      {
        method:'POST',
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${api_key}`,
          "User-Agent":"Chrome",
        },
        body:JSON.stringify({
          prompt:input_ref.current.value,
          n:1,
          size:"512x512"
        }),
      }
    );
    let data = await resp.json()
    console.log(data)
    setloader(false)
  }

  return (
    <div className='ai-image-generator'>
      <div className="header">AI Image <span>Generator</span></div>
      <div className="img-loading">
        <div className="image"><img src={imgUrl? imgUrl:defualt_img} alt="Defualt Image" /></div>
        <div className={loader? "loader-bar-full":'loader-bar'}></div>
        <span className={loader? "active":'displayNone'}>Loading...</span>
      </div>
      <div className="search-box">
        <input ref={input_ref} type="text" className='search-input' placeholder='Enter Text'/>
        <div className="generate-btn" onClick={handleGen}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator
