/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import NoImage from '@/public/images/NoImage.png';

const RegisterCar = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1024 * 1024) {
      toast.error(
        'O arquivo selecionado é muito grande. Por favor, selecione um arquivo menor que 1 MB.',
      );
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const submitHandler = async (formData) => {
    try {
      formData.owner = session?.user?._id;
      formData.image = image;
      const response = await axios.post('/api/car', formData);
      const result = response.data;
      console.log(formData);
      console.log(result);
      toast.success('Carro registrado com Sucesso!');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Register Car">
      <form
        className="mx-auto max-w-screen-md bg-base-500"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Register Car</h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex justify-center items-center">
            <input
              type="file"
              accept="image/*"
              className="p-2"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <Image src={image || NoImage} width={300} height={113} />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            {...register('brand')}
            className="w-full"
            id="brand"
            value="Toyota"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model">Model</label>
          <input
            type="text"
            {...register('model')}
            className="w-full"
            id="model"
            value="Corolla"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fueltype">Fuel Type</label>
          <input
            type="text"
            {...register('fueltype')}
            className="w-full"
            id="fueltype"
            value="Gasolina"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hodometro">Hodometro</label>
          <input
            type="number"
            {...register('hodometro')}
            className="w-full"
            id="hodometro"
            value={50000}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            {...register('color')}
            className="w-full"
            id="color"
            value="Prata"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year">Year</label>
          <input
            type="text"
            {...register('year')}
            className="w-full"
            id="year"
            value="2020"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="licensePlate">License Plate</label>
          <input
            type="text"
            {...register('licensePlate')}
            className="w-full"
            id="licensePlate"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="chassis">Chassis</label>
          <input
            type="text"
            {...register('chassis')}
            className="w-full"
            id="chassis"
            value="ABCD1234EFG567890"
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="headlights.model">Headlights Model</label>
          <input
            type="text"
            {...register('headlights.model')}
            className="w-full"
            id="headlights.model"
            value="LED"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="headlights.buyDate">Headlights Buy Date</label>
          <input
            type="text"
            {...register('headlights.buyDate')}
            className="w-full"
            id="headlights.buyDate"
            value="2022-01-01"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tires.brand">Tires Brand</label>
          <input
            type="text"
            {...register('tires.brand')}
            className="w-full"
            id="tires.brand"
            value="Michelin"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tires.frontSize">Tires Front Size</label>
          <input
            type="number"
            {...register('tires.frontSize')}
            className="w-full"
            id="tires.frontSize"
            value={205}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tires.rearSize">Tires Rear Size</label>
          <input
            type="number"
            {...register('tires.rearSize')}
            className="w-full"
            id="tires.rearSize"
            value={205}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="test[0].title">Test Title</label>
          <input
            type="text"
            {...register('test[0].title')}
            className="w-full"
            id="test[0].title"
            value="Teste de desempenho"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="test[0].options[0].title">Option Title</label>
          <input
            type="text"
            {...register('test[0].options[0].title')}
            className="w-full"
            id="test[0].options[0].title"
            value="Aceleração"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="test[0].options[0].value">Option Value</label>
          <input
            type="text"
            {...register('test[0].options[0].value')}
            className="w-full"
            id="test[0].options[0].value"
            value="0-100 km/h em 6 segundos"
          />
        </div> */}
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
