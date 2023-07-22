import Link from 'next/link';
import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';

const ShowRefuel = ({ data, carId, deleteReviewHandler, formatDate }) => (
  <div className="card prose h-96 overflow-scroll md:prose-xl flex-col bg-base-200 p-5">
    <div className="grid grid-cols-2">
      <h2 className=" text-center !m-0">Abastecimentos</h2>
      <div className="flex justify-center">
        <Link
          href={`${carId}/RegisterRefuel`}
          className="text-xl btn btn-primary hover:shadow-md transition-all font-mono !p-2"
        >
          Adicionar Revisão <BsPlus className="text-3xl" />
        </Link>
      </div>
    </div>
    <div className="items-end" />
    <div className="overflow-x-auto">
      <div className="table prose  md:prose-lg">
        <div>
          <div className="grid text-center grid-cols-4">
            <div>Nome</div>
            <div>Data</div>
            <div>Preço</div>
            <div>Opções</div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-5 ">
            {data.refuels.map((refuel, index) => (
              <div
                key={index}
                className="collapse collapse-arrow shadow-lg shadow-base-300 bg-base-100"
              >
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-center items-center grid grid-cols-4 !p-0 font-medium">
                  <p className="!m-0">{refuel.title}</p>

                  <p className="!m-0">{formatDate(refuel.date)}</p>
                  <p className="!m-0">R$ {refuel.price}</p>
                  <div className="flex gap-5">
                    <Link
                      href={`/User/car/${carId}/EditMaintenance?refuelId=${refuel._id}`}
                      className="btn !p-2 z-10 "
                    >
                      <AiFillEdit className="md:text-2xl" />
                    </Link>
                    <button
                      type="button"
                      onClick={deleteReviewHandler}
                      className="btn !p-2 z-10 btn-error"
                    >
                      <AiFillDelete className="md:text-2xl" />
                    </button>
                  </div>
                </div>
                <div className="collapse-content !p-0 flex flex-col gap-2">
                  <p> Quantidade:{refuel.quantity}</p>
                  <p> Local:{refuel.local}</p>
                  <p> Tipo:{refuel.quantity}</p>
                  <p> {refuel.description}</p>
                </div>
                <button type="button" onClick={deleteReviewHandler}>
                  Deletar essa maçã
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ShowRefuel;
