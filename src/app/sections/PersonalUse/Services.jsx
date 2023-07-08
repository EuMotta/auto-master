import React from 'react';
import Image from 'next/image';
import { services } from './constants';

const Services = () => (
  <div>
    <div className=" bg-base-200 flex justify-center items-center">
      <div className="prose text-center paddings md:prose-xl">
        <h2>Confira os serviços abaixo</h2>
        <h3>
          Veja um resumo das possibilidades que nosso sistema pode oferecer
        </h3>
        <button type="button" className="btn btn-outline px-10">Confira</button>
      </div>
    </div>
    <div className="container mx-auto yPaddings">
      {services.map((service, index) => (
        <div key={index}>
          {index % 2 === 0 ? (
            <div className="grid lg:h-[40rem] lg:grid-cols-2 gap-10">
              <div className="flex flex-col justify-center">
                <div className="card mx-10 prose md:prose-xl py-5">
                  <div className="mt-5">
                    <h2 className="!m-0">{service.title}</h2>
                    <h3 className="!m-0">{service.subtitle}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              </div>
              <div className="hidden md:hidden lg:flex justify-center items-center">
                <Image
                  src={service.image}
                  width={500}
                  height={500}
                  unoptimized
                />
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-10">
              <div className="hidden md:hidden lg:flex justify-center items-center">
                <Image
                  src={service.image}
                  width={500}
                  height={500}
                  unoptimized
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="card mx-10 prose md:prose-xl py-5">
                  <div className="mt-5">
                    <h2 className="!m-0">{service.title}</h2>
                    <h3 className="!m-0">{service.subtitle}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Services;
