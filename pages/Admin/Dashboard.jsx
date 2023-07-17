/* eslint-disable no-unused-expressions */
import React from 'react';
import { useSession } from 'next-auth/react';
import AdminLayout from './components/AdminLayout';

const ViewCars = () => {
  const { data: session } = useSession();
  return (
    <AdminLayout>
      <div className="">
        {session.user.isAdmin ? (
          <section className="container mx-auto">
            aaa
          </section>
        ) : (
          ''
        )}
      </div>
    </AdminLayout>
  );
};

ViewCars.auth = { adminOnly: true };
export default ViewCars;
