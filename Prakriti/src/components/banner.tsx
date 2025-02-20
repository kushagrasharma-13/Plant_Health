import React from 'react';
import Marquee from 'react-fast-marquee';

import first from "../assets/first.png";
import two from '../assets/marque/2.png';
import three from '../assets/marque/3.png';
import four from '../assets/marque/4.png';
import five from '../assets/marque/5.png';
import six from '../assets/marque/6.png';
import one from '../assets/marque/1.png';
import seventh from '../assets/marque/7.png';
import eight from '../assets/marque/8.png';
import nine from '../assets/marque/9.png';
import Image from 'next/image';

export const partners = [
    {
        url: first,
    },
    {
        url: four,
    },
    {
        url: two,
    },
    {
        url: three,
    },
    {
        url: nine,
    },
    {
        url: five,
    },
    {
        url: six,
    },
    {
        url: seventh,
    },
    {
        url: eight,
    },
    {
        url: one,
    },
];

const Banner = () => {
    return (
        <div className='border-t border-b border-[#000] py-10'>
            <h3 className='uppercase text-xl md:text-2xl text-center max-w-3xl mx-auto font-[400] z-20 relative'>
                CREATED FOR THE NEEDS
            </h3>
            <div className="w-full text-center pt-1">
                <h3 className="uppercase bg-[#72CA1A] rounded p-2 text-xl md:text-2xl text-center inline-block font-medium z-20 relative">
                    POWERING FARMERS WITH THE TOP ADVICES
                </h3>
            </div>
            <Marquee className="w-full flex justify-around">
                {partners.map((i, index) => (
                    <Image
                        src={i.url}
                        key={index}
                        width={200}
                        height={200}
                        alt="partner"
                        className={`md:mx-8 w-[150px] md:w-[180px] mx-3`}
                    />
                ))}
            </Marquee>
        </div>
    )
}

export default Banner;
