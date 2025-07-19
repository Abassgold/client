'use client';

import Image from 'next/image';
import React from 'react';

type Testimonial = {
  content: string;
  author: string;
  role: string;
  image: string;
};

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      content:
        "I use FloZap’s virtual numbers to receive OTPs for my crypto exchanges. I don’t need to use my SIM card again for verifications. It’s very convenient.",
      author: 'Adebola Ibrahim',
      role: 'Crypto Trader',

      image:
        '/Adebola_Ibrahim.jpg',
    },
    {
     content:
      "As an online vendor, FloZap's virtual numbers help me create multiple accounts for advertising without exposing my real number to strangers.",
    author: 'Ngozi Nwosu',
    role: 'Online Vendor',
      image:
        '/Ngozi_Nwosu.jpg',
    },
    {
      content:
      "FloZap's virtual numbers help me verify multiple social media accounts for my clients without using my personal line. Fast and reliable service.",
    author: 'Chinedu Okafor',
    role: 'Social Media Manager',
      image:
        '/Chinedu_Okafor.jpg',
    },
  ];



  return (
    <div id="testimonials" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-teal-800 font-semibold tracking-wide uppercase">
            Testimonials
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by users worldwide
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            See what our customers are saying about their experience with FloZap.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg shadow-sm p-6">
              <div className="text-gray-600 italic mb-4">
                &ldquo;{testimonial.content}&rdquo;
              </div>
              <div className="flex items-center">
                <Image
                  className="rounded-2xl p-1 border-[1px]"
                  src={testimonial.image}
                  alt={testimonial.author}
                  width={70}
                  height={50}
                />
                <div className="ml-4">
                  <div className="font-medium text-gray-900">
                    {testimonial.author}
                  </div>
                  <div className="text-gray-500 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
