import React, { useState } from 'react';
import { services } from '@/constants';

const Services = () => {
  const [modalOpen, setModalOpen] = useState(-1);

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
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="card bg-white shadow-lg !rounded-sm border border-base-300 prose md:prose-lg py-5"
          >
            <figure className="!m-0 p-5">
              <div className="bg-base-100 rounded-full p-5 text-primary hover:text-white hover:bg-primary">
                <service.icon className="lg:text-5xl text-4xl " />
              </div>
            </figure>
            <div className="mx-5 mt-5 text-center flex flex-col justify-between h-full">
              <div>
                <h3 className="!m-0">{service.title}</h3>
                <p className="!m-0">{service.subtitle}</p>
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
              <div className="flex mt-5 justify-center">
                <button
                  type="button"
                  className="underline md:text-xl"
                  onClick={() => openModal(index)}
                >
                  Ver mais
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
