import React from 'react';

import { download } from '../assets';
import { downloadImage } from '../utils';
import { edit } from '../assets';

const Card = ({ _id, name, prompt, photo }) => {
  const handleEdit = () => {
    window.open('https://my.spline.design/clonercitycopy-80261a111f966117c979fe9d262ca0f0/', '_blank');
    
  };

  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        style={{ height: '100%', objectFit: 'cover' }}
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-md m-2 p-4 rounded-md">
        <p className="text-[#90ee90] text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-[#90ee90] flex justify-center items-center text-[#1a232e] text-xs font-bold">{name[0]}</div>
            <p className="text-[#90ee90] text-sm">{name}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex-auto">
              <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none" >
                <img src={download} alt="download" className="w-6 h-6 object-contain " />
              </button>
            </div>
            <div className="flex-auto ml-2">
              <button type="button" onClick={handleEdit} className="outline-none bg-transparent border-none">
                <img src={edit} alt="edit"  className="w-6 h-6 object-contain " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
