"use client";
import { Spice } from '@/types/interfaces';
import React from 'react'

interface ItemInfoProps {
    item: Spice;
}

function SpiceInfo({ item }: ItemInfoProps) {
    const backgroundColor = `#${item.color}`;

  return (
    <section className='py-12 md:py-24 lg:py-32'>
        <div className='container px-4 mx-auto'>
          <div className='mx-auto max-w-[1000px]'>
            <div className='flex flex-wrap mb-8 -mx-4'>
              <div className='w-full lg:w-1/2 p-4'>
                <div className='lg:max-w-md'>
                  <div className='w-96 h-96 bg-gray-100 rounded-md' style={{ backgroundColor }}></div>
                </div>
              </div>
              <div className='w-full lg:w-1/2 p-4'>
                <div className='max-w-lg lg:ml-auto'>
                  <h1 className='font-bold text-5xl mb-5 font-heading'>
                    {item.name}
                  </h1>
                  <p className='mb-10 text-xl'>
                    Pretend description. Pariatur ex aliqua elit ut enim consequat amet non do ut. Ad
                    aute deserunt fugiat qui Lorem in quis velit labore
                    voluptate.
                  </p>
                  <ul className='text-lg'>
                    <li key={item.price}>
                        <span className='font-semibold'>Price:</span> {item.price}
                    </li>
                    <li key={item.heat}>
                        <span className='font-semibold'>Heat Level:</span> {item.heat}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* some other pretend info could go here
            or even have a back and forth button to go to the next or previous spice
            also one to go to blends that it's found in could be cool too. */}
          </div>
        </div>
      </section>
  )
}

export default SpiceInfo;