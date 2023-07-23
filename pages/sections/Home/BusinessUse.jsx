import Image from 'next/image';
import React from 'react';
import { FaDashcube, FaMoneyBillWave } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { BsFuelPump } from 'react-icons/bs';
import fleet from '@/public/images/home/fleet.jpeg';

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
          <div className="grid md:grid-cols-2 gap-40">
            <div className="texto">
              <div className="yPaddings flex flex-col gap-10 uppercase">
                <div className="flex gap-5 items-center justify-center md:justify-end">
                  <h2 className="text-base-100">Controle total</h2>
                  <div className="bg-primary text-white p-5 rounded-full">
                    <AiFillSetting className="text-4xl" />
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-center md:justify-end">
                  <h2 className="text-base-100">Aumente a eficiência</h2>
                  <div className="bg-primary text-white p-5 rounded-full">
                    <FaMoneyBillWave className="text-4xl" />
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-center md:justify-end">
                  <h2 className="text-base-100">Economize tempo</h2>
                  <div className="bg-primary text-white p-5 rounded-full">
                    <FaDashcube className="text-4xl" />
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-center md:justify-end">
                  <h2 className="text-base-100">Frota organizada e lucrativa</h2>
                  <div className="bg-primary text-white p-5 rounded-full">
                    <BsFuelPump className="text-4xl" />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <Image src={fleet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PersonalUse;
