import React from 'react';
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
    <Services />
    <PersonalUse />
    <Separator />
    <BusinessUse />
    <Plans />
  </Layout>
);

export default index;
