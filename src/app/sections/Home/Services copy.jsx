import React from 'react';
import { services } from './constants';

const Services = () => (
  <div className="container mx-auto yPaddings">
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
      {services.map((service, index) => (
        <div
          key={index}
          className="card prose md:prose-xl py-5 bg-base-200 shadow-lg "
        >
          <figure className="!m-0">
            <service.icon className="lg:text-6xl text-4xl" />
          </figure>
          <div className="card-body !m-0 !p-2 text-center">
            <h3 className="!m-3">{service.name}</h3>
            <h4>{service.description}</h4>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Services;
