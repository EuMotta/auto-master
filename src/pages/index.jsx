/* eslint-disable import/no-unresolved */
'use client';

import '../styles/globals.css';
import '../styles/Home.css';
import {
  BusinessUse,
  Hero,
  PersonalUse,
  Plans,
  Separator,
  Services,
} from '../app/sections/Home';
import RootLayout from '@/app/layout';

const Page = () => (
  <main>
    <RootLayout>
      <Hero />
      <Services />
      <PersonalUse />
      <Separator />
      <BusinessUse />
      <Plans />
    </RootLayout>
  </main>
);

export default Page;
