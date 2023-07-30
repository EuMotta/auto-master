import Link from 'next/link';
import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';

const ShowRefuel = ({ data, carId, deleteRefuelHandler, formatDate }) => (
  <div className="card prose h-96 overflow-scroll md:prose-xl flex-col bg-base-200 p-5">
    <div className="grid grid-cols-2">
      <h2 className=" text-center !m-0">Abastecimentos</h2>
      <div className="flex justify-center">
        <Link
          href={`${carId}/RegisterRefuel`}
          className="text-xl btn btn-primary hover:shadow-md transition-all font-mono !p-2"
        >
          Adicionar Abastecimento <BsPlus className="text-3xl" />
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
            {data && data.refuels ? (
              data.refuels.map((refuel, index) => {
                let previousDistance = 0;
                if (index > 0) {
                  previousDistance =
                      data.refuels[index - 1].distance /
                      data.refuels[index - 1].quantity;
                }
                const difference =
                    refuel.distance / refuel.quantity - previousDistance;

                const isHighConsumption =
                    difference < 0 && refuel.quantity > 0;
                return (
                  <div
                    key={index}
                    className="collapse collapse-arrow shadow-lg shadow-base-300 bg-base-100"
                  >
                    <input
                      type="radio"
                      name="my-accordion-2"
                      defaultChecked
                    />
                    <div className="collapse-title text-center items-center grid grid-cols-4 !p-0 font-medium">
                      <h4 className="!m-0">{refuel.title}</h4>
                      <p className="!m-0">{formatDate(refuel.date)}</p>
                      <p className="!m-0">R$ {refuel.price}</p>
                      <div className="flex gap-5">
                        <Link
                          href={`/User/car/${carId}/EditRefuel?refuelId=${refuel._id}`}
                          className="btn !p-2 z-10 "
                        >
                          <AiFillEdit className="md:text-2xl" />
                        </Link>
                        <button
                          type="button"
                          onClick={deleteRefuelHandler}
                          className="btn !p-2 z-10 btn-error"
                        >
                          <AiFillDelete className="md:text-2xl" />
                        </button>
                      </div>
                    </div>
                    <div className="collapse-content grid grid-cols-4 !p-0 gap-2">
                      <div className="col-span-2">
                        <p> Quantidade:{refuel.quantity}</p>
                        <p> Local:{refuel.local}</p>
                        <p> Tipo:{refuel.type}</p>
                        <p> Distância:{refuel.distance}km</p>
                        <p> {refuel.description}</p>
                      </div>
                      <div className="h-auto flex flex-col justify-center items-center">
                        <p>Consumo</p>
                        <h4>{difference.toFixed(2)}km</h4>

                        {isHighConsumption ? (
                          <div className="bg-red-200">
                            <p>Alto consumo</p>
                          </div>
                        ) : (
                          <div className="bg-green-200">
                            <span>Economia</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button type="button" onClick={deleteRefuelHandler}>
                      Deletar essa maçã
                    </button>
                  </div>
                );
              })
            ) : (
              <p>Carregando abastecimentos...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ShowRefuel;
