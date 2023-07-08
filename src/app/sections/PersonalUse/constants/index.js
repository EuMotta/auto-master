import {
  BsCalendar,
  BsClipboardData,
  BsCreditCard,
  BsDropletHalf,
  BsExclamationCircle,
} from 'react-icons/bs';
import DamangeRegister from '../../../../../public/images/PersonalUse/DamangeRegister.svg';
import Expenses from '../../../../../public/images/PersonalUse/Expenses.svg';
import Fueling from '../../../../../public/images/PersonalUse/Fueling.svg';
import Sheduling from '../../../../../public/images/PersonalUse/Scheduling.svg';
import OtherCosts from '../../../../../public/images/PersonalUse/OtherCosts.svg';
import followUp from '../../../../../public/images/PersonalUse/followUp.svg';

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
