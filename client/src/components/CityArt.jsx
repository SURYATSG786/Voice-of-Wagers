import React from 'react';
export const cityPictures={Chennai:'chennai',Mumbai:'mumbai',Delhi:'delhi',Noida:'noida',Gurgaon:'gurgaon',Patna:'delhi'};
export default function CityArt({city='Noida',label=city,className=''}){
 return <figure className={`city-art ${city==='Patna'?'worker-art':''} ${className}`} data-city={city}><img src={`/assets/cities/${cityPictures[city]||'noida'}.webp`} alt="" width="1983" height="793"/><figcaption>{label}</figcaption></figure>;
}
