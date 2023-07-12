/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import NoImage from '@/public/images/NoImage.png';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';

const RegisterCar = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { redirect } = router.query;
  const { query } = useRouter();

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
      formData.carId = query.id;
      console.log(formData);
      const result = await axios.post(`/api/Part`, formData)
      toast.success("Parte criada com sucesso");
      router.push(`/User/car/${query.id}`);

    } catch (err) {
      toast.error(getError(err));
    }
  };


  const [optionQuant, setOptionQuant] = useState([[]])

  return (
    <Layout title="Register Car">
      <form
        className="mx-auto max-w-screen-md bg-base-500"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Registrar Parte</h1>
        <div className="mb-4">
          <label htmlFor="brand">Title</label>
          <input
            type="text"
            {...register('title')}
            className="w-full"
            id="title"
            
          />
        </div>

        {
          optionQuant.map((_, key) => {
            return (
              <>
                <div className="mb-4">
                  <label htmlFor={`optionTitle[${key}].value`}>Titulo da Opção</label>
                  <input
                    type="text"
                    {...register(`optionTitle[${key}].value`)}
                    id={`optionTitle[${key}].value`}
                    className="w-full"
                  
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor={`optionValue[${key}].value`}>Valor da Opção</label>
                  <input
                    type="text"
                    {...register(`optionValue[${key}].value`)}
                    className="w-full"
                    
                  />
                </div>
              </>

            )
          })
        }


        <button className='btn' type='button' onClick={() => setOptionQuant(optionQuant.concat([[]]))}><BsPlusLg /></button>

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
