import Image from 'next/image';
import React from 'react';
import { AiOutlineControl, AiOutlineFieldTime, AiOutlineUnorderedList } from 'react-icons/ai';
import { BsSpeedometer } from 'react-icons/bs';
import fleet from '@/public/images/home/fleet.jpeg';

const businessList = [
  {
    title: 'Controle total',
    icon: AiOutlineControl,
  },
  {
    title: 'Aumente a eficiência',
    icon: BsSpeedometer,
  },
  {
    title: 'Economize tempo',
    icon: AiOutlineFieldTime,
  },
  {
    title: 'Frota organizada',
    icon: AiOutlineUnorderedList,
  },
];
const PersonalUse = () => (
  <section className="bg-secondary flex flex-col justify-center">
    <div className="container mx-auto">
      <div className="yPaddings prose md:prose-xl !max-w-full text-center">
        <div className="">
          <div className="flex flex-col justify-center items-center h-full">
            <h2 className="text-base-100 uppercase">
              Saiba os gastos do seu veículo, acompanhe na palma da mão tudo que
              ocorre pelo seu aplicativo.
            </h2>
          </div>
          <hr />
          <div className="grid md:grid-cols-2 gap-20">
            <div className="flex justify-center items-center">
              <Image src={fleet} />
            </div>
            <div className="texto">
              <div className="yPaddings flex flex-col gap-10 uppercase">
                {businessList.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-5 items-center justify-center md:justify-start"
                  >
                    <div className="bg-primary text-white p-5 rounded-full">
                      <item.icon className="text-4xl" />
                    </div>
                    <h2 className="text-base-100">{item.title}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PersonalUse;
