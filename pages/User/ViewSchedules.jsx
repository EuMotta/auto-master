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
		time: "16:54",
		desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae delectus voluptatibus.",
		reocurrence: true,
		status: "Agendado",
		vehicleModel: "Fiat",
		vehiclePlaque: "ABC-1234"
  },
  {
    name: "Agend2",
    cost: 40,
    date: "31/07/2021",
		time: "16:54",
		desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae delectus voluptatibus.",
		reocurrent: false,
		status: "Cancelado",
		vehicleModel: "Fiat",
		vehiclePlaque: "ABC-1234"
  },
  {
    name: "Agend3",
    cost: 50,
    date: "08/09/2019",
		time: "16:54",
		desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae delectus voluptatibus.",
		reocurrence: false,
		status: "Completo",
		vehicleModel: "Fiat",
		vehiclePlaque: "ABC-1234"
  },
  ]

  return(
    <Layout>
			<div className="mt-5 mx-5 px-5 border-x border-t border-white">
				{schedules.map((sch) => (
					<div className="m-5 rounded bg-cyan-100 container mx-auto">
						<div className='m-5 p-5 flex'>
							<div className='w-1/12'>
								<p><b>{sch.vehicleModel}</b></p>
								<p>{sch.vehiclePlaque}</p>
								<input className='w-3 inline-block' type="checkbox" id="reocurrent" name="reocurrent" checked />
								<p className="inline"> Reocurrent</p>
							</div>
							<div className='w-4/12'>
								<h4 className='text-xl font-semibold'>{sch.name}</h4>
								<p className='text-sm'>{sch.desc}</p>
							</div>
							<div className='w-3/12 pt-3 text-center'>
								<p className='text-lg'><b>{sch.date}</b></p>
								<p className='text-lg'>{sch.time}</p>
							</div>
							<div className='w-2/12 pt-5'>
								<p className='text-center text-lg'>R${sch.cost},00</p>
							</div>
							<div className='w-2/12 pt-5 text-center'>
								<button className='btn btn-info' type="button">Editar</button>
							</div>
						</div>
					</div>
				))}
			</div>



    </Layout>
  );

}
export default ViewSchedules;