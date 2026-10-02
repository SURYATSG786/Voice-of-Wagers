import React from 'react';
const illustrations={Chennai:'chennai.png',Mumbai:'mumbai.jpg',Delhi:'delhi.png',Noida:'noida.png',Gurgaon:'gurgaon.png',Patna:'patna.png'};
export default function CityIllustration({city='Noida',label=city,className=''}){
 return <figure className={`city-illustration ${className}`} data-city={city}><img src={`/assets/illustrations/${illustrations[city]||'noida.png'}`} alt={label} width="220" height="150"/><figcaption>{label}</figcaption></figure>;
}
