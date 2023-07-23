import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { services } from '@/constants';
import ServicesImg from '@/public/images/home/Services.svg';
import ServicesImg2 from '@/public/images/home/Services.jpg';

const Services = () => {
  const [modalOpen, setModalOpen] = useState(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalOpen && !event.target.closest('.modal-box')) {
        setModalOpen(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [modalOpen]);

  const openModal = (index) => {
    setModalOpen(index);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  return (
    <div className="container mx-auto yPaddings">
      <div className="grid md:grid-cols-2 md:gap-60 my-10">
        <div className="prose md:prose-2xl">
          <h5 className="font-bold">Serviços</h5>
          <h1 className="font-bold">Confira o que podemos oferecer</h1>
        </div>
        <div className="prose md:prose-2xl">
          <p>
            Com nosso aplicativo, você terá todas as ferramentas necessárias
            para gerenciar seu veículo de forma inteligente e conveniente,
            garantindo sua segurança, economia e tranquilidade.
          </p>
          <button
            type="button"
            className="underline md:text-xl"
            onClick={() => openModal(-1)}
          >
            Saiba mais
          </button>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2">
        <div className="flex flex-col justify-center items-center">
          {services.slice(0, 3).map((service, index) => (
            <div key={index} className="card prose md:prose-lg py-5">
              <figure className="!m-0 text-orange-500">
                <service.icon className="lg:text-5xl text-4xl" />
              </figure>
              <div className="mx-10 mt-5 text-center">
                <h3 className="!m-0">{service.title}</h3>
                <p className="!m-0">{service.subtitle}</p>
              </div>
              <div className="flex mt-5 justify-center">
                <button
                  type="button"
                  className="underline md:text-xl"
                  onClick={() => openModal(index)}
                >
                  Ver mais
                </button>
              </div>
              {modalOpen === index && (
                <div className="modal modal-open">
                  <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <p className="py-4">{service.description}</p>
                    <button type="button" className="btn" onClick={closeModal}>
                      Fechar
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden md:hidden lg:flex lg:h-[40rem] justify-center items-center">
          <Image
            src={ServicesImg}
            width={500}
            height={500}
            unoptimized
            alt="Services"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          {services.slice(3, 6).map((service, index) => (
            <div key={index} className="card prose md:prose-lg py-5">
              <figure className="!m-0 text-orange-500">
                <service.icon className="lg:text-5xl text-4xl" />
              </figure>
              <div className="mx-10 mt-5 text-center">
                <h3 className="!m-0">{service.title}</h3>
                <p className="!m-0">{service.subtitle}</p>
              </div>
              <div className="flex mt-5 justify-center">
                <button
                  type="button"
                  className="underline md:text-xl"
                  onClick={() => openModal(index)}
                >
                  Ver mais
                </button>
              </div>
              {modalOpen === index && (
                <div className="modal modal-open">
                  <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <p className="py-4">{service.description}</p>
                    <button type="button" className="btn" onClick={closeModal}>
                      Fechar
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Image
          src={ServicesImg2}
          className="rounded-[3rem] shadow-lg shadow-base-300"
          alt="Services"
        />
      </div>
    </div>
  );
};

export default Services;
