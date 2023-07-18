import {
  BsCalendar,
  BsClipboardData,
  BsCreditCard,
  BsDropletHalf,
  BsExclamationCircle,
  BsCarFront } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import { GoChecklist } from 'react-icons/go';
import { PiHeadlightsBold } from 'react-icons/pi';
import DamangeRegister from '@/public/images/PersonalUse/DamangeRegister.svg';
import Expenses from '@/public/images/PersonalUse/Expenses.svg';
import Fueling from '@/public/images/PersonalUse/Fueling.svg';
import Sheduling from '@/public/images/PersonalUse/Scheduling.svg';
import OtherCosts from '@/public/images/PersonalUse/OtherCosts.svg';
import followUp from '@/public/images/PersonalUse/followUp.svg';

export const adminNavLinks = [
  {
    name: 'Navbar',
    icon: AiFillHome,
    parent: [
      {
        name: 'Home',
        url: '/',
      },
      {
        name: 'Serviços',
        url: '/',
        parent: [
          {
            name: 'Uso pessoal',
            url: '/PersonalUse',
          },
          {
            name: 'sub2',
            url: '/',
          },
        ],
      },
      {
        name: 'Sobre',
        url: '/',
      },
    ],
  },
  {
    name: 'Dashboard',
    url: '/Admin/Dashboard',
    icon: LuLayoutDashboard,
  },
  {
    name: 'Usuários',
    url: '/Admin/Users',
    icon: FaUser,
  },
  {
    name: 'Veículos',
    url: '/Admin/Vehicles',
    icon: BsCarFront,
  },
  {
    name: 'Peças',
    url: '/Admin/Parts',
    icon: PiHeadlightsBold,
  },
  {
    name: 'Manutenções',
    url: '/Admin/Maintenances',
    icon: GoChecklist,
  },
];

export const themeList = ['acid', 'dark', 'synthwave'];
export const navLinks = [
  {
    name: 'Home',
    url: '/',
  },
  {
    name: 'Serviços',
    url: '/',
    parent: [
      {
        name: 'Uso pessoal',
        url: '/PersonalUse',
      },
      {
        name: 'sub2',
        url: '/',
      },
    ],
  },
  {
    name: 'Sobre',
    url: '/',
  },
];
export const footerLinks = {
  services: [
    {
      name: 'Branding',
      url: '/',
    },
    {
      name: 'Branding',
      url: '/',
    },
    {
      name: 'Branding',
      url: '/',
    },
  ],
  company: [
    {
      name: 'About us',
      url: '/',
    },
    {
      name: 'About us',
      url: '/',
    },
    {
      name: 'About us',
      url: '/',
    },
  ],
  legal: [
    {
      name: 'About us',
      url: '/',
    },
    {
      name: 'About us',
      url: '/',
    },
    {
      name: 'About us',
      url: '/',
    },
  ],
};
export const plans = [
  {
    name: 'Gratuito',
    description: [
      'Registro de Abastecimentos',
      'Lembrete de Manutenções',
      'Todas as Funcionalidades Gratuitas',
    ],
    link: 'Link para o plano bronze',
    button: 'Acessar',
    color: 'bg-free',
    price: 'free',
  },
  {
    name: 'Bronze',
    description: [
      'Registro de Abastecimentos',
      'Lembrete de Manutenções',
      'Todas as Funcionalidades Gratuitas',
    ],
    link: 'Link para o plano bronze',
    button: 'Comprar',
    color: 'bg-bronze',
    priceMonth: 5,
  },
  {
    name: 'Silver',
    description: [
      'Registro de Custos com Manutenções',
      'Lembrete de Danos ao Veículo',
      'Todas as Funcionalidades do Bronze',
    ],
    link: 'Link para o plano silver',
    button: 'Comprar',
    color: 'bg-silver',
    priceMonth: 7,
  },
  {
    name: 'Gold',
    description: [
      'Controle de Renovação de CNH',
      'Controle de Renovação de CRLV',
      'Todas as Funcionalidades do Silver',
    ],
    link: 'Link para o plano gold',
    button: 'Comprar',
    color: 'bg-gold',
    priceMonth: 9,
  },
];
export const services = [
  {
    title: 'Registro de danos',
    subtitle:
      'Registre quaisquer danos ou incidentes ocorridos no seu veículo.',
    description:
      'Este serviço permite que você registre todos os danos ou incidentes que ocorreram no seu veículo, fornecendo uma documentação detalhada para referência futura. Dessa forma, você pode acompanhar e controlar melhor o estado do seu veículo.',
    icon: BsExclamationCircle,
    image: DamangeRegister,
  },
  {
    title: 'Registro de abastecimento',
    subtitle: 'Registre todos os abastecimentos realizados no seu veículo.',
    description:
      'Com esse serviço, você pode registrar todas as informações relevantes sobre os abastecimentos realizados no seu veículo, como a quantidade de combustível, o valor gasto e a data da ocorrência.',
    icon: BsDropletHalf,
    image: Fueling,
  },
  {
    title: 'Agendamento',
    subtitle:
      'Agende serviços para o seu veículo, como manutenção, revisões, entre outros.',
    description:
      'Com esse recurso, você pode agendar diferentes tipos de serviços para o seu veículo, como manutenção periódica, revisões ou qualquer outro serviço necessário. O agendamento permite que você planeje e acompanhe os serviços a serem realizados.',
    icon: BsCalendar,
    image: Sheduling,
  },
  {
    title: 'Registro de despesas',
    subtitle: 'Registre todas as despesas relacionadas ao seu veículo.',
    description:
      'Este serviço possibilita o registro de todas as despesas relacionadas ao seu veículo, como seguro, impostos, taxas de licenciamento, reparos, entre outros. Ao manter um registro detalhado das despesas, você pode ter um controle financeiro mais eficiente e uma visão clara dos custos associados ao seu veículo.',
    icon: BsCreditCard,
    image: Expenses,
  },
  {
    title: 'Outros custos relacionados',
    subtitle: 'Registre quaisquer outros custos relacionados ao seu veículo.',
    description:
      'Com esse serviço, você pode registrar todos os custos adicionais relacionados ao seu veículo que não se enquadram nas categorias anteriores. Isso pode incluir despesas com estacionamento, pedágios, multas, entre outros.',
    icon: BsClipboardData,
    image: OtherCosts,
  },
  {
    title: 'Acompanhamento de frotas',
    subtitle: 'Acompanhe as manutenções e custos de sua frota de veículos.',
    description:
      'Esse serviço é especialmente útil para empresas ou indivíduos que possuem uma frota de veículos. Ele permite o acompanhamento e registro das manutenções realizadas em cada veículo, bem como dos custos associados. Com o acompanhamento de frotas, você pode garantir a manutenção adequada dos seus veículos e controlar os gastos com mais eficiência.',
    icon: BsClipboardData,
    image: followUp,
  },
];
