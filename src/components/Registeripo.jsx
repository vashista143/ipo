import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Registeripo = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(`http://localhost:3000/registeripo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      navigate("/manage-ipo");
    } else {
      alert("Update failed");
    }
  }

  return (
    <div className='pl-5 mt-5 mb-15'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between'>
          <div>
            <p className='text-[28px] font-semibold'>Upcomming IPO Information</p>
            <p className='text-[14px]'>Manage your IPO details</p>
          </div>
          <div className='flex gap-5 mr-25'>
            <button type="submit" className="h-[50px] w-max hover:cursor-pointer bg-[#624DE3] text-white px-4 py-2 rounded font-semibold hover:bg-[#4b38b3] transition">
              Register IPO
            </button>
            <Link to="/manage-ipo"><button className="h-[50px] w-max bg-[#624DE3] text-white px-4 py-2 rounded font-semibold hover:bg-[#4b38b3] transition">cancel</button></Link>
          </div>
        </div>
        <div className='grid grid-cols-[20%_80%] h-full w-[100%] mt-10'>
          <div className='border-r border-gray-300 pr-4 flex justify-center items-start'>
            <button className='bg-[#4F80E126] w-[90%] rounded-[5px] h-[50px] text-[#624DE3]'>
              IPO Infomration
            </button>
          </div>

          <div className='ml-20'>
            <div>
              <p className='text-[24px] font-semibold'>IPO Information</p>
              <p className='text-[14px]'>Enter IPO details</p>
            </div>
            <hr className='mt-5 text-gray-300 w-[80%]' />
            <div className='mt-5'>
              <p className='text-[16px] font-semibold'>Company Logo</p>
              <div className="col-span-2 flex items-center gap-4 mb-2 mt-2">
                <img
                  src="/logo-placeholder.png"
                  alt="Company Logo"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <div className="font-semibold text-gray-700">NSE India</div>
                  <div className="text-xs text-gray-400">National Stock Exchange</div>
                  <div className="flex gap-2 mt-2">
                    <button type="button" className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded">
                      Upload Logo
                    </button>
                    <button type="button" className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap mt-5'>
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  {...register("company")}
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Vodafone Idea"
                  required
                />
              </div>
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Band</label>
                <input
                  {...register("priceBand")}
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Not Issued"
                  required
                />
              </div>

              {/* Open Date */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Open Date</label>
                <input
                  {...register("openDate")}
                  type="date"
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Close Date */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Close Date</label>
                <input
                  {...register("closeDate")}
                  type="date"
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Issue Size */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Size</label>
                <input
                  {...register("issueSize")}
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="2300 Cr."
                  required
                />
              </div>

              {/* Issue Type */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                <select
                  {...register("issueType")}
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>Select Issue Type</option>
                  <option>Book Built</option>
                  <option>Fixed Price</option>
                </select>
              </div>

              {/* Listing Date */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Date</label>
                <input
                  {...register("listingDate")}
                  type="date"
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              {/* Status */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  {...register("status")}
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>Select Status</option>
                  <option>Ongoing</option>
                  <option>Closed</option>
                  <option>New Listed</option>
                </select>
              </div>
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">IPO Price</label>
                <input
                  {...register("ipoPrice")}
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="₹ 383"
                />
              </div>

              {/* Listing Price */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Price</label>
                <input
                  {...register("listingPrice")}
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="₹ 435"
                />
              </div>

              {/* Listing Gain */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Gain</label>
                <input
                  {...register("listingGain")}
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="13.58 %"
                />
              </div>

              {/* Listing Date (Listed) */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Date (Listed)</label>
                <input
                  {...register("listingDateListed")}
                  type="date"
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* CMP */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">CMP</label>
                <input
                  {...register("cmp")}
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="₹ 410"
                />
              </div>

              {/* Current Return */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Return</label>
                <input
                  {...register("currentReturn")}
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="7.05 %"
                />
              </div>

              {/* RHP */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">RHP</label>
                <input
                  {...register("rhp")}
                  type="url"
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter RHP PDF Link"
                />
              </div>

              {/* DRHP */}
              <div className='mr-15 mb-6'>
                <label className="block text-sm font-medium text-gray-700 mb-1">DRHP</label>
                <input
                  {...register("drhp")}
                  type="url"
                  className="w-[300px] h-[55px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter DRHP PDF Link"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Registeripo
