const {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  BarChart,
  Bar,
} = require('recharts');

const formatDate = (createdAt) => {
  const date = new Date(createdAt);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Graph1 = ({ cars }) => {
  const groupedCars = cars.reduce((acc, car) => {
    const formattedDate = formatDate(car.createdAt);
    acc[formattedDate] = (acc[formattedDate] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(groupedCars).map(([createdAt, count]) => ({
    createdAt,
    value: count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
        backgroundColor="#0086ea"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#2B71C5" />
        <XAxis dataKey="createdAt" tick={{ fill: '#0086ea' }} />
        <YAxis tick={{ fill: '#0086ea' }} />
        <Tooltip />
        <Bar dataKey="value" fill="#0086ea" />
        <Brush />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Graph1;
