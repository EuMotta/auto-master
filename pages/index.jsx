import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Hero from './sections/Home/Hero';
import Services from './sections/Home/Services';
import PersonalUse from './sections/Home/PersonalUse';
import Separator from './sections/Home/Separator';
import BusinessUse from './sections/Home/BusinessUse';
import Plans from './sections/Home/Plans';

const index = () => (
  <Layout title="inicio">

    <Hero />
    <Link className="btn mt-10" href="http://localhost:3000/car/64ac103a999acfe45185e219">Ir ver carro</Link>
    <Services />
    <PersonalUse />
    <Separator />
    <BusinessUse />
    <Plans />
  </Layout>
);

export default index;
