import React from 'react';

const Hero = () => (
  <div className="bg-base-300">
    <section className="hero-bg h-screen flex flex-col justify-center yPaddings">
      <div className="container grid grid-cols-2 mx-auto">
        <div className="prose md:prose-xl ">
          <h1>AutoMaster</h1>
          <h2 className="font-bold">
            Acompanhe as manutenções e gastos de seu veículo!
          </h2>
          <h3>
            Registre manutenções, trocas de peças e acompanhe o histórico
            completo do seu veículo com o AutoMaster.
          </h3>
          <button type="button" className="btn btn-outline">
            Crie sua conta
          </button>
        </div>
      </div>
    </section>
  </div>
);

export default Hero;
