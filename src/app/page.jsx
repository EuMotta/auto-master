'use client';

import '../styles/globals.css';
import '../styles/Home.css';
import { BusinessUse, Hero, PersonalUse, Plans, Separator, Services } from './sections/Home';

const Page = () => (
    <main>
      <Hero />
      <Services />
      <PersonalUse />
      <Separator />
      <BusinessUse />
      <Plans />
    </main>
  
);

export default Page;
