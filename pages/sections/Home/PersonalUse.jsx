import Image from 'next/image';
import React from 'react';
import { FaDashcube, FaMoneyBillWave } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { BsFuelPump } from 'react-icons/bs';
import frame1 from '@/public/images/home/frame1.png';
import frame2 from '@/public/images/home/frame2.png';

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
                  <h2 className="text-base-100">Otimize seu veículo</h2>
                  <div className="bg-primary text-white p-5 rounded-full">
                    <AiFillSetting className="text-4xl" />
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-center md:justify-end">
                  <h2 className="text-base-100">Economize seus gastos</h2>
                  <div className="bg-primary text-white p-5 rounded-full">
                    <FaMoneyBillWave className="text-4xl" />
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-center md:justify-end">
                  <h2 className="text-base-100">Controle as mudanças</h2>
                  <div className="bg-primary text-white p-5 rounded-full">
                    <FaDashcube className="text-4xl" />
                  </div>
                </div>
                <div className="flex gap-5 items-center justify-center md:justify-end">
                  <h2 className="text-base-100">Monitore o consumo</h2>
                  <div className="bg-primary text-white p-5 rounded-full">
                    <BsFuelPump className="text-4xl" />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                  <Image src={frame1} className="w-full" />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">
                      ❮
                    </a>
                    <a href="#slide2" className="btn btn-circle">
                      ❯
                    </a>
                  </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                  <Image src={frame2} className="w-full" />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">
                      ❮
                    </a>
                    <a href="#slide1" className="btn btn-circle">
                      ❯
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PersonalUse;
