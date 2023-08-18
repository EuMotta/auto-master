import { useSession } from 'next-auth/react';
import React, { useEffect, useReducer, useState } from 'react';
import Layout from '@/components/Layout';
import db from '@/utils/db';
import Car from '@/models/Car';
import { useRouter } from 'next/router';

const ViewSchedules = () => {

  const { data: session } = useSession();
  const schedules = [{
    name: "Agend1",
    cost: 30,
    date: "30/07/2022",
  },
  {
    name: "Agend2",
    cost: 40,
    date: "31/07/2021",
  },
  {
    name: "Agend3",
    cost: 50,
    date: "08/09/2019"
  },
  ]






  return(
    <Layout>
			
      <h1 className="mb-5 text-xl">Lista de Agendamentos</h1>
      {schedules.map((sch) => (
        <div className="container mx-auto">
          <h2>{sch.name}</h2>
          <p>{sch.cost}</p>
          <p>{sch.date}</p>
        </div>
      ))}



    </Layout>
  );

}
export default ViewSchedules;