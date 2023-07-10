import React from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';

const RegisterCar = () => {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  console.log(errors);

  const submitHandler = async (formData) => {
    console.log(formData);
    try {
      const response = await axios.post('/api/car', formData);
      const result = response.data;
      console.log(formData);
      console.log(result);
      toast.success('Carro registrado com Sucesso!');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const ownerId = session?.user?._id;
  return (
    <Layout title="Register Car">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Register Car</h1>
        <div className="mb-4">
          <label htmlFor="owner">Owner</label>
          <input
            type="text"
            {...register('owner')}
            className="w-full"
            id="owner"
            value={ownerId}
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            {...register('brand')}
            className="w-full"
            id="brand"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            {...register('model')}
            className="w-full"
            id="model"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fueltype">Fuel Type</label>
          <input
            type="text"
            {...register('fueltype')}
            className="w-full"
            id="fueltype"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hodometro">Hodometro</label>
          <input
            type="number"
            {...register('hodometro')}
            className="w-full"
            id="hodometro"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            {...register('color')}
            className="w-full"
            id="color"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year">Year</label>
          <input
            type="text"
            {...register('year')}
            className="w-full"
            id="year"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="licensePlate">License Plate</label>
          <input
            type="text"
            {...register('licensePlate')}
            className="w-full"
            id="licensePlate"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="chassis">Chassis</label>
          <input
            type="text"
            {...register('chassis')}
            className="w-full"
            id="chassis"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="headlights.model">Headlights Model</label>
          <input
            type="text"
            {...register('headlights.model')}
            className="w-full"
            id="headlights.model"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="headlights.buyDate">Headlights Buy Date</label>
          <input
            type="text"
            {...register('headlights.buyDate')}
            className="w-full"
            id="headlights.buyDate"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tires.brand">Tires Brand</label>
          <input
            type="text"
            {...register('tires.brand')}
            className="w-full"
            id="tires.brand"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tires.frontSize">Tires Front Size</label>
          <input
            type="number"
            {...register('tires.frontSize')}
            className="w-full"
            id="tires.frontSize"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tires.rearSize">Tires Rear Size</label>
          <input
            type="number"
            {...register('tires.rearSize')}
            className="w-full"
            id="tires.rearSize"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="test[0].title">Test Title</label>
          <input
            type="text"
            {...register('test[0].title')}
            className="w-full"
            id="test[0].title"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="test[0].options[0].title">Option Title</label>
          <input
            type="text"
            {...register('test[0].options[0].title')}
            className="w-full"
            id="test[0].options[0].title"
            value="22"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="test[0].options[0].value">Option Value</label>
          <input
            type="text"
            {...register('test[0].options[0].value')}
            className="w-full"
            id="test[0].options[0].value"
            value="22"
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="primary-button">
            Register Car
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default RegisterCar;
