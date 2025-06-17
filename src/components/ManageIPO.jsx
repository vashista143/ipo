import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ManageIPO = ({ searchTerm }) => {
   const navigate = useNavigate();
   const [ipodata,setipodata]=useState([])
   useEffect(() => {
    fetch("https://ipo-hel9.onrender.com/api")
    .then(res => res.json())
    .then(data => setipodata(data))
    .catch(err => console.error("Error fetching IPO data:", err)); 
   }, [])

const filteredData = ipodata.filter((ipo) =>
    ipo.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = filteredData==="" ? Math.ceil(ipodata.length / itemsPerPage) : Math.ceil(filteredData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentData = filteredData===""?ipodata.slice(startIdx, endIdx) : filteredData.slice(startIdx, endIdx);

  const deleteipo = (delid) => {
    fetch(`https://ipo-hel9.onrender.com/delete/${delid}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete");
        return res.json();
      })
      .then(() => {
        fetch("https://ipo-hel9.onrender.com/api")
          .then(res => res.json())
          .then(data => setipodata(data));
      })
      .catch(err => {
        console.error("Error deleting IPO:", err);
        alert("Failed to delete IPO");
      });
  };
  return (
    <div>
    <div className='pt-6 pb-3 pl-6 flex justify-between'>
        <span className='text-[#1F384C]'>Upcomming IPO | Dashboard</span>
        <button className='p-[10px] h-[30px] w-[100px] bg-gray-100 mr-[5%] flex items-center justify-center rounded-[3px]'>
        <Link to={`/registeripo`}>
          <span className='text-[13px] text-[#5A6ACF]'>Register IPO</span>
        </Link>
        </button>
      </div>
      <div className="overflow-x-auto max-w-full ml-5  mb-5">
        <table className="table-auto text-[14px] w-full" style={{ borderSpacing: "0 10px" }}>
          <thead className='text-[14px]'>
            <tr className='mb-[10px]'>
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Price Band</th>
              <th className="px-3 py-2">Open Date</th>
              <th className="px-3 py-2">Close Date</th>
              <th className="px-3 py-2">Issue Size</th>
              <th className="px-3 py-2">Issue Type</th>
              <th className="px-3 py-2">Listing Date</th>
              <th className="px-3 py-2">status</th>
              <th className="px-3 py-2">Action</th>
              <th className="px-3 py-2">Delete/View</th>
            </tr>
          </thead>
        <tbody className='text-[14px]'>
  {currentData.map((ipo) => (
    <tr key={ipo._id} className="text-center text-[14px] pb-[10px]">
      <td className="whitespace-nowrap">{ipo.company}</td>
      <td className="whitespace-nowrap">{ipo.priceBand}</td>
      <td className="whitespace-nowrap">{ipo.openDate.slice(0, 10)}</td>
      <td className="whitespace-nowrap">{ipo.closeDate.slice(0, 10)}</td>
      <td className="whitespace-nowrap">{ipo.issueSize}</td>
      <td className="whitespace-nowrap">{ipo.issueType}</td>
      <td className="whitespace-nowrap">{ipo.listingDate.slice(0, 10)}</td>
      <td className="whitespace-nowrap">
        <div className={` ${ipo.status === 'Ongoing' ? "border-[1px] rounded-[20px] border-green-500 text-green-600" : ''}
          ${ipo.status === 'New Listed' ? "border-[1px] rounded-[20px] border-[#BC4141] text-[#BC4141]" : ''}
          ${ipo.status === 'Coming' ? "border-[1px] rounded-[20px] border-[#e7c145] text-[#d6e646]" : ''}`}>
          {ipo.status}
        </div>
      </td>
      <td>
        <Link to={`/ipoupdate/${ipo._id}`}>
        <button className=' bg-[#624DE3] w-[82px] h-[37px] rounded-[7px] hover:cursor-pointer'>Update</button>
        </Link>
      </td>
      <td>
        <div className=''>
        <button onClick={() => deleteipo(ipo._id)}>
          <svg className='text-[#c44343] h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg></button>
        <button className='ml-3'>
          <svg className='text-[#000000] h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"/></svg>
        </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
        {totalPages > 1 && (
          <div className="flex ml-5 gap-2 mt-4">
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx + 1}
                className={`px-3 py-1 rounded ${currentPage === idx + 1 ? 'border-[1px] border-[#624DE3] text-black' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageIPO;
