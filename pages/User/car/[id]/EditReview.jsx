/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { BsPlusLg } from 'react-icons/bs';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, part: action.payload, error: '' };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, successUpdate: true };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_RESET':
      return { ...state, loadingUpdate: false, successUpdate: false };
    default:
      state;
  }
}

const EditReview = () => {
  const router = useRouter();
  const { id: carId, reviewId } = router.query;
  const { data: session } = useSession();
  const [formData, setFormData] = useState(null);
  const [selectedPartIds, setSelectedPartIds] = useState([]); // Changed selectedPartId to selectedPartIds
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });
  const [reviewData, setReviewData] = useState({});
  const [carParts, setCarParts] = useState([]);
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm();
  console.log(errors);

  useEffect(() => {
    const fetchPartData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });

        const { data } = await axios.get(`/api/Review/${reviewId}`);
        setReviewData(data);
        setValue('title', data.title);
        setValue('subtitle', data.subtitle);
        setValue('description', data.description);
        setValue('date', data.date);
        setValue('price', data.price);

        const { data: carData } = await axios.get(`/api/car/${carId}`);
        const { data: carPartsData } = await axios.get(
          `/api/car/${carId}/parts`,
        );
        setCarParts(carPartsData);
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: getError(err) });
      }
    };
    fetchPartData();
  }, [reviewId, carId]);

  const submitHandler = async (formData) => {
    try {
      formData.carId = carId;
      console.log(formData);
      dispatch({ type: 'UPDATE_REQUEST' });
      const result = await axios.put(`/api/Review/${reviewId}`, formData);
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Parte atualizada com sucesso');
      console.log(result);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(`/User/car/${carId}`);
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      toast.error(getError(err));
    }
  };
  console.log(reviewData);

  return (
    <Layout title="Register Review">
      {session?.user ? (
        <form
          className="mx-auto max-w-screen-md bg-base-500"
          onSubmit={handleSubmit(submitHandler)}
        >
          {reviewId}
          <h1 className="mb-4 text-xl">Editar Revisão</h1>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="mb-4">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                {...register('title')}
                defaultValue={reviewData.title}
                className="w-full"
                id="title"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subtitle">Subtitulo</label>
              <input
                type="text"
                {...register('subtitle')}
                defaultValue={reviewData.subtitle}
                className="w-full"
                id="subtitle"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description">Descrição</label>
            <textarea
              {...register('description')}
              defaultValue={reviewData.description}
              className="w-full"
              id="description"
            />
          </div>
          {carParts.length > 0 && (
            <div className="mb-4">
              <label>Partes</label>
              {carParts.map((part) => (
                <div key={part._id} className="mb-2">
                  <input
                    type="checkbox"
                    value={part._id}
                    checked={selectedPartIds.includes(part._id)}
                    onChange={(e) => {
                      const partId = e.target.value;
                      setSelectedPartIds((prevIds) => {
                        if (prevIds.includes(partId)) {
                          return prevIds.filter((id) => id !== partId);
                        }
                        return [...prevIds, partId];
                      });
                    }}
                  />
                  <label>{part.title}</label>
                </div>
              ))}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="date">Data</label>
            <input
              type="Date"
              {...register('date')}
              defaultValue={reviewData.date}
              className="w-full"
              id="date"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price">Preço</label>
            <input
              type="Number"
              {...register('price')}
              defaultValue={reviewData.price}
              className="w-full"
              id="price"
            />
          </div>

          <div className="mb-4">
            <button type="submit" className="primary-button">
              Editar
            </button>
          </div>
        </form>
      ) : (
        ' '
      )}
    </Layout>
  );
};

EditReview.auth = true;
export default EditReview;
