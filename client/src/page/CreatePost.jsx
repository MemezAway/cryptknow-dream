import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { generate, preview, editandmint } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if(form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
      })
    

      const data = await response.json();

      setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
     } catch (error) {
        alert(error);
     } finally {
       setGeneratingImg(false);
     }
    } else {
      alert('Please enter a prompt');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })
        await response.json();
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image');
    }
  };

  const handleChange = (e) => {setForm({ ...form, [e.target.name]: e.target.value })};
  

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };


  

 

  

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#90ee90] text-[32px]">Dream</h1>
        <p className="mt-2 text-[#90ee90] text-[14px]">Join Robo, your friendly image-generating robot, on an exciting journey of creativity and fun, and bring your wildest dreams to life with stunning and imaginative images!</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            style={{
              boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
              borderRadius: '5px',
            }}
            
            labelName="Who summons me?"
            type="text"
            name="name"
            placeholder="Ex., john doe"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Dream"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div>
        <button
  type="button"
  onClick={generateImage}
  className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-[#90ee90]"
  style={{
    marginTop: '10px',
    paddingInline: '20px',
    backgroundImage: 'linear-gradient(180deg, #31326f 0%, #292c5b 100%)',
    borderRadius: '50px',
    boxShadow: '0px 2px 6px rgba(41, 44, 91, 0.5)',
    fontWeight: 'bold',
    fontSize: '1rem',
    position: 'relative',
    overflow: 'hidden'
  }}
>
  {generatingImg ? (
    <span>Generating...</span>
  ) : (
    <span>Generate</span>
  )}
  <span
    style={{
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'rotate(45deg)',
      zIndex: '-1',
    }}
  ></span>
</button>

<button
  type="button"
  className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-[#90ee90]"
  style={{
    marginTop: '15px',
    marginLeft: '20px',
    paddingInline: '20px',
    backgroundImage: 'linear-gradient(180deg, #31326f 0%, #292c5b 100%)',
    borderRadius: '50px',
    boxShadow: '0px 2px 6px rgba(41, 44, 91, 0.5)',
    fontWeight: 'bold',
    fontSize: '1rem',
    position: 'relative',
    overflow: 'hidden'
  }}
>
  <a href='https://my.spline.design/clonercitycopy-80261a111f966117c979fe9d262ca0f0/' frameborder='0' width='100%' height='100%' target="_blank" rel="noreferrer">
    <span>Edit & Mint NFT</span>
  </a>
  <span
    style={{
      
      position: 'absolute',
      top: '-50%',
      left: '-50%',
      width: '200%',
      height: '200%',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'rotate(45deg)',
      zIndex: '-1',
    }}
  ></span>
</button>





</div>

<div className="mt-10">
  <p className="mt-2 text-[#6d946d] text-[14px]">
    ** Once I have crafted your desired image, I'll be delighted to help you share it with the rest of the community, granting your wish with joy and excitement! **
  </p>
  <button
    type="submit"
    className="mt-3 text-[#90ee90] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    style={{
      background: 'linear-gradient(180deg, #31326f 0%, #292c5b 100%)',
      borderRadius: '50px',
      fontWeight: 'bold',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0px 2px 6px rgba(41, 44, 91, 0.5)',
    }}
  >
    {loading ? 'Sharing...' : 'Share your creation with the Community'}
    <span
      style={{
        background: 'linear-gradient(180deg, #31326f 0%, #292c5b 100%)',
        borderRadius: '50px',
        fontWeight: 'bold',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0px 2px 6px rgba(41, 44, 91, 0.5)',
      }}
    ></span>
  </button>

  <button
    type="button"
    onClick={() => window.open('https://cryptknow.io', '_blank')}
    className="mt-3 ml-10 text-[#90ee90] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    style={{
      
      background: 'linear-gradient(180deg, #31326f 0%, #292c5b 100%)',
      borderRadius: '50px',
      fontWeight: 'bold',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0px 2px 6px rgba(41, 44, 91, 0.5)',
    }}
  >
    <span
      style={{
        borderRadius: '50px',
        fontWeight: 'bold',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0px 2px 6px rgba(41, 44, 91, 0.5)',
      }}
    >
      CRYPTKNOW.IO
    </span>
  </button>
</div>

         
      </form>
    </section>
  );
};

export default CreatePost;
