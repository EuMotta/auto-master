import Link from 'next/link';
import React from 'react';
import { BsPlus, BsSearch } from 'react-icons/bs';

const ShowSchedule = ({ data, carId, deleteScheduleHandler, formatDate }) => (
  <div className="card  h-96 overflow-scroll md:prose-xl flex-col gap-5 w-full p-5">
    <div className=" w-30 top-0  p-3 grid grid-cols-5 gap-5 items-center rounded">
      <div className="flex w-full justify-center col-span-4 ">
        <input type="text" className="w-full" />
        <button type="button" className="btn-secondary rounded-l-none btn">
          {' '}
          <BsSearch className="text-4xl" />
        </button>
      </div>
      <div className="flex justify-end gap-3 items-center">
        <div className="flex justify-center">
          <Link
            href={`${carId}/RegisterSchedule`}
            className=" btn btn-primary hover:shadow-md transition-all font-mono !p-2"
          >
            <BsPlus className="text-3xl" />
          </Link>
        </div>
      </div>
    </div>
    <div className="items-end" />
    <div className="overflow-x-auto">
      <div className="">
        <div>
          <div className="flex flex-col gap-5 ">
            {data && data.schedules ? (
              data.schedules.map((schedule, index) => (
                <div
                  key={index}
                  className="collapse collapse-arrow shadow-lg shadow-base-300 bg-base-100"
                >
                  <input type="radio" name="my-accordion-2" defaultChecked />
                  <div className="collapse-title !p-0 bg-red-200 grid grid-cols-4 text-center justify-center items-center font-medium">
                    <p className="!m-0">{schedule.title}</p>
                    <p className="!m-0">{formatDate(schedule.date)}</p>
                    <p className="!m-0">R$ {schedule.price}</p>
                    <div className="flex gap-5">
                      <Link
                        href={`/User/car/${carId}/EditSchedule?scheduleId=${schedule._id}`}
                        className="btn !p-2 z-10 "
                      >
                        {/* <AiFillEdit className="md:text-2xl" /> */}
                      </Link>
                      <button
                        type="button"
                        onClick={deleteScheduleHandler}
                        className="btn !p-2 z-10 btn-error"
                      >
                        {/* <AiFillDelete className="md:text-2xl" /> */}
                      </button>
                    </div>
                  </div>
                  <div className="collapse-content !p-0 flex flex-col gap-2">
                    <h4 className="text-center !m-0">{schedule.subtitle}</h4>
                    <p className="!m-0">{schedule.description}</p>
                    <p className="!m-0">
                      {' '}
                      Parte agendada: {schedule.partTitle}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p />
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ShowSchedule;
