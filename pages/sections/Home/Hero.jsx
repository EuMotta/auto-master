import Image from 'next/image';
import React from 'react';
import mockup from '@/public/images/home/mockup.png';

const Hero = () => (
  <div className="bg-base-300">
    <section className="hero-bg h-screen flex flex-col justify-center yPaddings">
      <div className="container grid lg:grid-cols-2 mx-auto">
        <div className="prose md:prose-xl flex flex-col justify-center items-center ">
          <h1 className="font-bold lg:!text-6xl text-base-100 uppercase !m-0">
            Faça a gestão de{' '}
            <span className="text-primary"> seus veículos!</span>
          </h1>
          <p className="text-base-100">
            Registre manutenções, trocas de peças e acompanhe o histórico
            completo do seu veículo com o AutoMaster.
          </p>
        </div>
        <div className="">
          <Image src={mockup} width={900} height={900} unoptimized />
        </div>
      </div>
    </section>
  </div>
);

export default Hero;
