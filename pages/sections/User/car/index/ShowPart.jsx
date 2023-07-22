import React from 'react';
import { BsPlus } from 'react-icons/bs';
import Link from 'next/link';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

const ShowPart = ({ data, carId, deletePartHandler }) => (
  <div className="card prose h-96 overflow-scroll md:prose-xl flex-col bg-base-200 p-5">
    <div className="grid grid-cols-2">
      <h2 className="text-center !m-0">Peças</h2>
      <div className="flex justify-center">
        <Link
          href={`${carId}/RegisterPart`}
          className="text-xl btn btn-primary hover:shadow-md transition-all font-mono !p-2"
        >
          Adicionar Peça <BsPlus className="text-3xl" />
        </Link>
      </div>
    </div>
    <div className="items-end" />
    <div className="overflow-x-auto">
      <div className="table prose  md:prose-lg">
        <div>
          <div className="flex flex-col gap-5 ">
            {data.parts.map((part, index) => (
              <div
                key={index}
                className="collapse  collapse-arrow shadow-lg shadow-base-300 rounded-lg bg-base-100"
              >
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title !p-0 bg-red-200 grid grid-cols-3 text-center justify-center items-center font-medium">
                  <p className="!m-0">{part.title}</p>
                  <p className="!m-0">R$ {part.price}</p>
                  <div className="flex gap-5">
                    <Link
                      href={`/User/car/${carId}/EditPart?partId=${part._id}`}
                      className="btn !p-2 z-10 "
                    >
                      <AiFillEdit className="md:text-2xl" />
                    </Link>
                    <button
                      type="button"
                      onClick={deletePartHandler}
                      className="btn !p-2 z-10 btn-error"
                    >
                      <AiFillDelete className="md:text-2xl" />
                    </button>
                  </div>
                </div>

                <div className="collapse-content !p-0 flex flex-col gap-2">
                  {part.options.map((option) => (
                    <div
                      key={option.value}
                      className="text-center items-center grid grid-cols-3 !p-0 border-b"
                    >
                      <p className="!m-0">{option.title}</p>
                      <p className="!m-0">{option.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ShowPart;
