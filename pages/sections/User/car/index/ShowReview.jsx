/* eslint-disable no-shadow */
import Link from 'next/link';
import React from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BsPlus, BsSearch } from 'react-icons/bs';

const ShowReview = ({ data, carId, deleteReviewHandler, formatDate }) => (
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
            href={`${carId}/RegisterReview`}
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
            {data && data.reviews ? (
              data.reviews.map((review, index) => (
                <div
                  key={index}
                  className="collapse collapse-arrow shadow-lg shadow-base-300 bg-base-100"
                >
                  <input type="radio" name="my-accordion-2" defaultChecked />
                  <div className="collapse-title text-center items-center grid grid-cols-4 !p-0 font-medium">
                    <p className="!m-0">{review.title}</p>

                    <p className="!m-0">{formatDate(review.date)}</p>
                    <p className="!m-0">R$ {review.price}</p>
                    <div className="flex gap-5">
                      <Link
                        href={`/User/car/${carId}/EditReview?reviewId=${review._id}`}
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

                  <div className="collapse-content mx-10  !p-0 flex flex-col gap-2">
                    <div className="table border w-full">
                      <div className="table-row-group">
                        <div className="table-row">
                          <div className="table-cell">Peça</div>
                          <div className="table-cell">Titulo</div>
                          <div className="table-cell">Preço</div>
                        </div>
                        {review.partId.map((partId, index) => {
                          const part = data.parts.find(
                            (part) => part._id === partId,
                          );
                          if (part) {
                            return (
                              <div key={part._id} className="table-row border">
                                <div className="table-cell">{index + 1}</div>
                                <div className="table-cell">{part.title}</div>
                                <div className="table-cell">{part.price}</div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Carregando revisões...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ShowReview;
