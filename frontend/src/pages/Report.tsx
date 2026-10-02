import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Report = () => {
  const data = [
    { name: "a", value: 40 },
    { name: "b", value: 55 },
    { name: "c", value: 80 },
    { name: "a", value: 40 },
    { name: "b", value: 55 },
    { name: "c", value: 80 },
    { name: "a", value: 40 },
    { name: "b", value: 55 },
    { name: "c", value: 80 }
  ];

  return (
    <div className='h-[70%] w-[90%] fixed bottom-0 left-50'>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Report;
