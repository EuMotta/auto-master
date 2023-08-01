/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import NoImage from '@/public/images/NoImage.png';

const RegisterCar = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { redirect } = router.query;

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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push(redirect || '/User/ViewCars');
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
        <h1 className="mb-4 text-xl">Registrar Veículo</h1>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex justify-center items-center">
            <input
              type="file"
              accept="image/*"
              className="p-2"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex justify-center items-center">
            <Image src={image || NoImage} width={300} height={113} />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="type">Selecione o tipo de veículo</label>
          <select id="type" {...register('type')}>
            <option value="">Selecionar</option>
            <option value={1}>Carro</option>
            <option value={2}>Moto</option>
            <option value={3}>Caminhão</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="brand">Marca</label>
          <input
            type="text"
            {...register('brand')}
            className="w-full"
            id="brand"
            value="Toyota"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="model">Modelo</label>
          <input
            type="text"
            {...register('model')}
            className="w-full"
            id="model"
            value="Corolla"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fueltype">Tipo de Combustível</label>
          <input
            type="text"
            {...register('fueltype')}
            className="w-full"
            id="fueltype"
            value="Gasolina"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hodometro">Hodômetro</label>
          <input
            type="number"
            {...register('hodometro')}
            className="w-full"
            id="hodometro"
            value={50000}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="color">Cor</label>
          <input
            type="text"
            {...register('color')}
            className="w-full"
            id="color"
            value="Prata"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year">Ano</label>
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
        <div className="mb-4">
          <button type="submit" className="primary-button">
            Registrar
          </button>
        </div>
      </form>
    </Layout>
  );
};

RegisterCar.auth = true;
export default RegisterCar;
