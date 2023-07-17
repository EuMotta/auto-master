import { AiFillHome } from 'react-icons/ai';
import { BsCarFront } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { LuLayoutDashboard } from 'react-icons/lu';
import { GoChecklist } from 'react-icons/go';
import { PiHeadlightsBold } from 'react-icons/pi';

export const navLinks = [
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
