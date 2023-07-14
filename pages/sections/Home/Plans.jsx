import React from 'react';
import { BsCheck } from 'react-icons/bs';
import { plans } from '@/constants';

const Plans = () => (
  <section className="container yPaddings mx-auto">
    <div className=" yPaddings text-xl md:text-6xl">
      <h1 className="font-bold text-center">Nossos planos</h1>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className=" glass prose sm:prose-sm md:prose-lg lg:prose-lg bg-base-200  card shadow-lg shadow-base-300"
        >
          <div className={`card-body ${plan.color} flex h-full `}>
            <div className="text-center h-40 justify-center items-center flex flex-col gap-5">
              <h2 className="sm:m-0">{plan.name}</h2>
              {plan.price === 'free' ? (
                <h2 className="!p-0 !m-0">Sem custo</h2>
              ) : (
                <>
                  <h2 className="!p-0 !m-0">R${plan.priceMonth},00/mês</h2>
                  <p>R${plan.priceMonth * 12}/ano</p>
                </>
              )}
            </div>
            <button
              type="button"
              className={`card-actions bg-bronze-button ${plan.color} flex justify-center`}
            >
              <a
                href={plan.link}
                className={`btn ${plan.color}-button !rounded-none w-full`}
              >
                {plan.button}
              </a>
            </button>
            <hr className="!m-0 !p-0" />
            <div className="flex flex-col py-5 md:gap-5 flex-grow">
              <h3 className="text-center !m-0">O que posso utilizar?</h3>
              {plan.description.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center gap-2 items-center"
                >
                  <BsCheck className="md:text-3xl text-green-500" />
                  <p className="!m-0">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Plans;
