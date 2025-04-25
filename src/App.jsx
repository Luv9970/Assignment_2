import React, { useEffect } from 'react'
import { simulateLiveUpdate } from './features/crypto/counterSlice';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {


  const  value  = useSelector((state) => state.counter.assets);
  const dispatch = useDispatch();

  function getColorClass(value) {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return 'text-gray-500'; 
  }

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(simulateLiveUpdate());
    }, 1500); // every 1.5 seconds
    return () => clearInterval(interval); // cleanup on unmount
  }, [dispatch]);


  return (
    <div className='bg-red-100 h-screen flex items-center justify-center'>      
      <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-right">Price</th>
            <th className="py-3 px-6 text-right">1h %</th>
            <th className="py-3 px-6 text-right">24h %</th>
            <th className="py-3 px-6 text-right">7d %</th>
            <th className="py-3 px-6 text-right">Market Cap</th>
            <th className="py-3 px-6 text-right">Volume(24h)</th>
            <th className="py-3 px-6 text-right">Circulating Supply</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {value.map((item) => (
            <tr key={item.rank} className="border-b border-gray-300 hover:bg-gray-200 cursor-pointer">
              <td className="py-3 px-6 text-left">{item.rank}</td>
              <td className="py-3 px-6 text-left font-medium flex items-center gap-4">
                <div><img className="h-8 w-8" src={item.image}alt="/"/></div>
                {item.name} <div className="text-gray-400">{item.symbol}</div>
              </td>
              <td className="py-3 px-6 text-right">${item.price}</td>
              <td className={`py-3 px-6 text-right ${getColorClass(item.change1h)}`}>{item.change1h}%</td>
              <td className={`py-3 px-6 text-right ${getColorClass(item.change24h)}`}>{item.change24h}%</td>
              <td className={`py-3 px-6 text-right ${getColorClass(item.change7d)}`}>{item.change7d}%</td>
              <td className="py-3 px-6 text-right">{item.marketCap}</td>
              <td className="py-3 px-6 text-right">${item.volume24h}</td>
              <td className="py-3 px-6 text-right">{item.circulatingSupply}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     </div>
  )
}

export default App