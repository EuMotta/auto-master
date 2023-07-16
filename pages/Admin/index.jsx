/* eslint-disable no-unused-expressions */
import React from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/components/Layout';

const ViewCars = () => {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="">{session.user.isAdmin ? <div>aaaaa</div> : ''}</div>
    </Layout>
  );
};

ViewCars.auth = { adminOnly: true };
export default ViewCars;
