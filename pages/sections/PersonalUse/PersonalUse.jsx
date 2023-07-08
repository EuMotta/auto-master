import Image from 'next/image';
import React from 'react';
import PersonalUseImg from '@/public/images/home/PersonalUse.svg';

const PersonalUse = () => (
  <section className="glass3 flex flex-col justify-center">
    <div className="container mx-auto">
      <div className="paddings grid lg:grid-cols-2">
        <div className="prose md:prose-xl mx-10 flex flex-col justify-center h-full">
          <h1>Uso pessoal</h1>
          <h3>
            Saiba os gastos do seu veículo, acompanhe na palma da mão tudo que
            ocorre pelo seu aplicativo.
          </h3>
          <p>
            O AutoMaster é uma ferramenta que oferece a você um controle
            completo sobre os gastos relacionados ao seu veículo. Com ele, você
            pode acompanhar os custos de abastecimento, manutenções, trocas de
            óleo e outros serviços realizados em seu carro, moto ou caminhão.
          </p>
        </div>
        <div className=" hidden md:hidden lg:flex justify-center items-center mx-10">
          <Image src={PersonalUseImg} width={400} height={400} unoptimized />
        </div>
      </div>
    </div>
  </section>
);

export default PersonalUse;
