import React from 'react';
import Layout from '@/components/Layout';
import { BusinessUse, Hero, PersonalUse, Plans, Separator, Services } from './sections/Home';

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
