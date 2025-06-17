import React, { useEffect, useState } from 'react';
const Dashboard = () => {
  const [ipoData, setIpoData] = useState([]);
  const [gainCount, setGainCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [noCmpOrIpoPrice, setNoCmpOrIpoPrice] = useState(0);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [newListedCount, setNewListedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [hoveredSegment, setHoveredSegment] = useState(null);

  const handleMouseEnter = (e, label) => {
    const { clientX, clientY } = e;
    setHoveredSegment({ label, x: clientX, y: clientY });
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
  };

  useEffect(() => {
    const fetchIPOData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api');
        const data = await response.json();
        setIpoData(data);
        setTotalCount(data.length);
      } catch (error) {
        console.error('Error fetching IPO data:', error);
      }
    };

    fetchIPOData();
  }, []);

  useEffect(() => {
    let gains = 0;
    let losses = 0;
    let noData = 0;
    let upcoming = 0;
    let ongoing = 0;
    let listed = 0;

    ipoData.forEach((ipo) => {
      if (ipo.status === 'Coming') {
        upcoming++;
      } else if (ipo.status === 'Ongoing') {
        ongoing++;
      } else if (ipo.status === 'Listed' || ipo.status === 'New Listed') {
        listed++;
      }
    });

    setUpcomingCount(upcoming);
    setOngoingCount(ongoing);
    setNewListedCount(listed);

    ipoData.forEach((ipo) => {
      const cmp = parseFloat(ipo.cmp);
      const ipoPrice = parseFloat(ipo.ipoPrice);

      if (isNaN(cmp) || isNaN(ipoPrice)) {
        noData++;
        return;
      }

      if (cmp > ipoPrice) {
        gains++;
      } else if (cmp < ipoPrice) {
        losses++;
      }
    });

    setGainCount(gains);
    setLossCount(losses);
    setNoCmpOrIpoPrice(noData);
  }, [ipoData]);
  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className='semibold text-[18px] '>Dashboard</h1>
      <div className="flex h-[400px]">
        <div className="w-1/3 text-xl relative border-r border-gray-300 ">
          <h1 className='pt-5'>IPO Dashboard India</h1>
          <div className="flex items-center space-x-1">
            <span className='font-extralight'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-[12px] w-[12px] text-[#149D52]" fill="currentColor" viewBox="0 0 384 512">
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
            </span>
            <span className='text-[#149D52] text-[12px]'>{gainCount}</span>
            <p className=" text-[12px] leading-[12px] text-gray-500 font-extralight font-[Poppins]">IPO in gain</p>
          </div>
          <div className='absolute right-5 top-30'>
            <div className="relative w-[220px] h-[220px]">
              <svg className="absolute top-0 left-0" width="220" height="220">
                <circle
                  cx="110"
                  cy="110"
                  r="105"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1"
                  strokeDasharray="507 121"
                  transform="rotate(-90 110 110)"
                />
              </svg>
              <div className="absolute inset-0 m-auto w-[200px] h-[200px] bg-[#F99C30] rounded-full flex items-center justify-center text-white font-bold">
                <div className="flex flex-col items-center text-white font-bold">
                  <span className="text-3xl">{totalCount}</span>
                  <span className="text-[18px] leading-[12px] font-extralight font-[Poppins]">Total IPO</span>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute left-[60px] top-[80px]'>
            <div className="relative w-[120px] h-[120px]">
              <svg className="absolute top-0 left-0" width="120" height="120">
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="none"
                  stroke="#6463D6"
                  strokeWidth="2"
                  strokeDasharray="237 107"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="absolute inset-0 m-auto w-[100px] h-[100px] bg-[#6463D6] rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center text-white font-bold">
                  <span className="text-[25px]">{lossCount}</span>
                  <span className="text-[14px] leading-[12px] font-extralight font-[Poppins]">IPO in loss</span>
                </div>
              </div>
            </div>
          </div>

          <div className='absolute left-[-10px] top-[250px]'>
            <div className="relative w-[150px] h-[150px]">
              <svg className="absolute top-0 left-0" width="150" height="150">
                <circle
                  cx="75"
                  cy="75"
                  r="70"
                  fill="none"
                  stroke="#2FBFDE"
                  strokeWidth="2"
                  strokeDasharray="294 146"
                  transform="rotate(-90 75 75)"
                />
              </svg>
              <div className="absolute inset-0 m-auto w-[130px] h-[130px] bg-[#2FBFDE] rounded-full flex items-center justify-center">
                <div className="flex flex-col items-center text-white font-bold text-center">
                  <span className="text-[25px]">{gainCount}</span>
                  <span className="text-[18px] leading-[12px] font-extralight font-[Poppins]">IPO in gain</span>
                </div>
              </div>
            </div>
          </div>





        </div>
        <div className="w-1/3 border-r border-gray-300 pl-5">
          <p className='pt-5 text-xl '>Quick links</p>
          <p className=' text-[12px] text-gray-500 font-extralight font-[Poppins]'>Adipiscing elit, sed do eiusmod tempor</p>
          <div>
            <ul className='pt-8 '>
              <li className='flex items-center justify-between border-b border-gray-500/12 w-[95%] h-15'><div className='flex font-extralight font-[Poppins] items-center space-x-2'><div className="w-8 h-8 overflow-hidden rounded-full"><img src="https://www.nseindia.com/_next/image?url=%2Fnext-assets%2Fimages%2FGroup-5414.png&w=96&q=75" alt="NSE Logo" className=""/></div><span><p className='pl-2'>NSE India</p></span></div><div className='pr-5'><a href='https://www.nseindia.com/' className='text-gray-500 '>Visit Now</a></div></li>
              <li className='flex items-center justify-between border-b border-gray-500/12 w-[95%] h-15'><div className='flex font-extralight font-[Poppins] items-center space-x-2'><div className="w-8 h-8 overflow-hidden rounded-full"><img src="https://www.bseindia.com/include/images/spbse.png" alt="BSE Logo" className=""/></div><span><p className='pl-2'>BSE India</p></span></div><div className='pr-5'><a href='https://www.bseindia.com/' className='text-gray-500 '>Visit Now</a></div></li>
              <li className='flex items-center justify-between border-b border-gray-500/12 w-[95%] h-15'><div className='flex font-extralight font-[Poppins] items-center space-x-2'><div className="w-8 h-8 overflow-hidden rounded-full"><img src="qxoQAAAAASUVORK5CYII=data:image/png;base64,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" alt="SEBI Logo" className=""/></div><span><p className='pl-2'>SEBI</p></span></div><div className='pr-5'><a href='https://www.sebi.gov.in/' className='text-gray-500 '>Visit Now</a></div></li>
              <li className='flex items-center justify-between border-b border-gray-500/12 w-[95%] h-15'><div className='flex font-extralight font-[Poppins] items-center space-x-2'><div className="w-8 h-8 overflow-hidden rounded-full"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAQlBMVEVHcEwAZqAAZqAAZqAAZqAAZqAAYqQWcJMxhnRTpzBWqidInUlNpSdirkaEvXJDoRT////f7dq52LCZx4qx1Kat0aF+H9L2AAAABnRSTlMACZHj/zPhGhG8AAAApUlEQVR4Ab2ThQ0DMRAEz8wU6L/V7DNbnJGMYwYiYlzIC4IzAko+oIiYfIQRf5acxLMUJDvMUmtpjNFgKW7SWOcHQrAGxlirV6mDdwveD+EgJxHHAC4yOZdTSRn6ImNttdYXQo43sr4/CN/ayl3PUobwR+lyjkOICFcZ4xaO0i84cJY4b4ADD2MLuE3qqSA1GK9ObvIAxEL/mXQfWPdpdh917zv8AO19E4Kxa2UlAAAAAElFTkSuQmCC" alt="Money Control Logo" className=""/></div><span><p className='pl-2'>Money Control</p></span></div><div className='pr-5'><a href='https://www.moneycontrol.com/' className='text-gray-500 '>Visit Now</a></div></li>
            </ul>
          </div>
        </div>
        <div className="w-1/3 text-white text-xl">
          {/* Main Board IPO Section */}
<div className="w-full px-6">
  {/* Header */}
  <div className="flex justify-between items-start">
    <div>
      <p className="text-xl font-semibold text-gray-800">Main Board IPO</p>
      <p className="text-[12px] text-gray-500 font-light">From 01 Jan 2024</p>
    </div>
    <button className="text-sm text-blue-500 border border-blue-500 rounded px-3 py-1 hover:bg-blue-50">
      View Report
    </button>
  </div>
<div className="relative flex justify-center">
      <svg width="200" height="200" viewBox="0 0 36 36" className="rotate-[-90deg]">
  {/* Background Circle */}
  <circle
    cx="18"
    cy="18"
    r="10"
    fill="none"
    stroke="#E5E7EB"
    strokeWidth="3"
  />

  {/* Segment 1 */}
  <circle
    cx="18"
    cy="18"
    r="10"
    fill="none"
    stroke="#5A6ACF"
    strokeWidth="5"
    strokeDasharray="20.94 41.89"
    strokeDashoffset="0"
    onMouseEnter={(e) => handleMouseEnter(e, `${upcomingCount}`)}
    onMouseLeave={handleMouseLeave}
  />

  {/* Segment 2 */}
  <circle
    cx="18"
    cy="18"
    r="10"
    fill="none"
    stroke="#8593ED"
    strokeWidth="4.5"
    strokeDasharray="20.94 41.89"
    strokeDashoffset="-20.94"
    onMouseEnter={(e) => handleMouseEnter(e, `${newListedCount}`)}
    onMouseLeave={handleMouseLeave}
  />

  {/* Segment 3 */}
  <circle
    cx="18"
    cy="18"
    r="10"
    fill="none"
    stroke="#C7CEFF"
    strokeWidth="4"
    strokeDasharray="20.95 41.88"
    strokeDashoffset="-41.88"
    onMouseEnter={(e) => handleMouseEnter(e, `${ongoingCount}`)}
    onMouseLeave={handleMouseLeave}
  />
</svg>

{/* 💬 Tooltip (unchanged) */}
{hoveredSegment && hoveredSegment.label && (
  <div
    className="fixed z-50 text-xs leading-[25px] text-[15px] bg-[#37375C] text-white w-[140px] h-[109px] border border-[#37375C] rounded shadow px-4 py-4"
    style={{ top: hoveredSegment.y + 10, left: hoveredSegment.x + 10 }}>
    Afternoon<br/> IPO NSE & BSE <br/>
    {hoveredSegment.label}
  </div>
)}
    </div>

<div className='pt-5 flex gap-x-6'>
  <div className="flex items-start space-x-2">
    <span className="w-2 h-2 mt-1 rounded-full bg-[#6366F1]"></span>
    <p className="text-sm text-gray-800 leading-tight">
      Upcoming<br />{upcomingCount}
    </p>
  </div>
  <div className="flex items-start space-x-2">
    <span className="w-2 h-2 mt-1 rounded-full bg-[#6366F1]"></span>
    <p className="text-sm text-gray-800 leading-tight">
      New Listed<br />{newListedCount}
    </p>
  </div>
  <div className="flex items-start space-x-2">
    <span className="w-2 h-2 mt-1 rounded-full bg-[#6366F1]"></span>
    <p className="text-sm text-gray-800 leading-tight">
      Ongoing<br />{ongoingCount}
    </p>
  </div>
</div>

</div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
