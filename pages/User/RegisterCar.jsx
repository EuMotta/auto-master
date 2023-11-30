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
      await axios.post('/api/car', formData);
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
          <label htmlFor="type">Selecione o tipo de veículo<span className="text-red-500"> *</span></label>
          <select id="type" {...register('type', { required: 'Selecione um tipo' })}
            className={`w-full ${errors.type ? 'border-red-500' : ''}`}
          >
            <option value="">Selecionar</option>
            <option value={1}>Carro</option>
            <option value={2}>Moto</option>
            <option value={3}>Caminhão</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="brand">Marca <span className="text-red-500"> *</span></label>
          <input
            type="text"
            {...register('brand', { required: 'Preencha o campo' })}
            className={`w-full ${errors.brand ? 'border-red-500' : ''}`}
            id="brand"
          />
          {errors.brand && (
            <p className="text-red-500">{errors.brand.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="model">Modelo<span className="text-red-500"> *</span></label>
          <input
            type="text"
            {...register('model', { required: 'Preencha o campo' })}
            className={`w-full ${errors.model ? 'border-red-500' : ''}`}
            id="model"
          />
          {errors.model && (
            <p className="text-red-500">{errors.model.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="fueltype">Tipo de Combustível<span className="text-red-500"> *</span></label>
          <input
            type="text"
            {...register('fueltype', { required: 'Preencha o campo' })}
            className={`w-full ${errors.fueltype ? 'border-red-500' : ''}`}
            id="fueltype"
          />
          {errors.fueltype && (
            <p className="text-red-500">{errors.fueltype.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="hodometro">Hodômetro<span className="text-red-500"> *</span></label>
          <input
            type="number"
            {...register('hodometro', { required: 'Preencha o campo' })}
            className={`w-full ${errors.hodometro ? 'border-red-500' : ''}`}
            id="hodometro"
          />
          {errors.hodometro && (
            <p className="text-red-500">{errors.hodometro.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="color">Cor<span className="text-red-500"> *</span></label>
          <input
            type="text"
            {...register('color', { required: 'Preencha o campo' })}
            className={`w-full ${errors.color ? 'border-red-500' : ''}`}
            id="color"
          />
          {errors.color && (
            <p className="text-red-500">{errors.color.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="year">Ano<span className="text-red-500"> *</span></label>
          <input
            type="text"
            {...register('year', { required: 'Preencha o campo' })}
            className={`w-full ${errors.year ? 'border-red-500' : ''}`}
            id="year"
          />
          {errors.year && (
            <p className="text-red-500">{errors.year.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="licensePlate">License Plate<span className="text-red-500"> *</span></label>
          <input
            type="text"
            {...register('licensePlate', { required: 'Preencha o campo' })}
            className={`w-full ${errors.licensePlate ? 'border-red-500' : ''}`}
            id="licensePlate"
          />
          {errors.licensePlate && (
            <p className="text-red-500">{errors.licensePlate.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="chassis">Chassis<span className="text-red-500"> *</span></label>
          <input
            type="text"
            {...register('chassis', { required: 'Preencha o campo' })}
            className={`w-full ${errors.chassis ? 'border-red-500' : ''}`}
            id="chassis"
          />
          {errors.chassis && (
            <p className="text-red-500">{errors.chassis.message}</p>
          )}
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
