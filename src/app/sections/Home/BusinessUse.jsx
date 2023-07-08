import Image from 'next/image';
import React from 'react';
import BusinessUseImg from '../../../../public/images/home/BusinessUse.svg';

const BusinessUse = () => (
  <section className="bg-base-200  flex flex-col justify-center">
    <div className="container mx-auto">
      <div className="paddings grid lg:grid-cols-2">
        <div className="hidden md:hidden lg:flex justify-center items-center mx-10">
          <Image src={BusinessUseImg} width={600} height={600} unoptimized />
        </div>
        <div className="prose md:prose-xl mx-10 flex flex-col justify-center h-full">
          <h2>Gerêncie sua frota</h2>
          <h4>
            Simplifique a gestão da frota de veículos da sua empresa e acompanhe
            todas as manutenções realizadas!
          </h4>
          <p>
            Aumente a eficiência e reduza os custos ao administrar sua frota de
            veículos com o AutoMaster. Nossa ferramenta intuitiva simplifica a
            gestão, permitindo que você monitore e controle todas as atividades
            de manutenção em um só lugar.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default BusinessUse;
