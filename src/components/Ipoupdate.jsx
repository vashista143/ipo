import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const Ipoupdate = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [updatedata, setupdatedata] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3000/ipoupdate/${id}`)
      .then(res => res.json())
      .then(data => {
        setupdatedata(data)
        console.log(data)
      })
  }, [id])
  const onsubmit = async (data) => {
  const response = await fetch(`http://localhost:3000/ipoupdate/${id}`, {
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

    <div>
      {updatedata ? (
        <div>
          <p><strong>Company:</strong> {updatedata.company}</p>
          <form onSubmit={handleSubmit(onsubmit)} className="max-w-3xl mx-auto bg-white p-8 rounded-lg grid grid-cols-2 gap-6">
            <div className="col-span-2 flex items-center gap-4 mb-2">
              <img src="/logo-placeholder.png" alt="Company Logo" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="font-semibold text-gray-700">NSE India</div>
                <div className="text-xs text-gray-400">National Stock Exchange</div>
                <div className="flex gap-2 mt-2">
                  <button type="button" className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded">Upload Logo</button>
                  <button type="button" className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded">Delete</button>
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Company Name</label>
              <input
                {...register("company")}
                defaultValue={updatedata?.companyName || updatedata?.company}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Company Name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Price Band</label>
              <input
                {...register("priceBand")}
                defaultValue={updatedata?.priceBand}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Not Issued"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Open</label>
              <input
                {...register("openDate")}
                defaultValue={updatedata?.openDate ? updatedata.openDate.slice(0, 10) : ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Not Issued"
                type="date"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Close</label>
              <input
                {...register("closeDate")}
                defaultValue={updatedata?.closeDate ? updatedata.closeDate.slice(0, 10) : ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Not Issued"
                type="date"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Issue Size</label>
              <input
                {...register("issueSize")}
                defaultValue={updatedata?.issueSize}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="2300 Cr."
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Issue Type</label>
              <select
                {...register("issueType")}
                defaultValue={updatedata?.issueType || "Book Built"}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option>Book Built</option>
                <option>Fixed Price</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Listing Date</label>
              <input
                {...register("listingDate")}
                defaultValue={updatedata?.listingDate ? updatedata.listingDate.slice(0, 10) : ""}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="Not Issued"
                type="date"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Status</label>
              <select
                {...register("status")}
                defaultValue={updatedata?.status || "Ongoing"}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              >
                <option>Ongoing</option>
                <option>Closed</option>
                <option>New Listed</option>
              </select>
            </div>

            <input
              type="submit"
              className="bg-[#624DE3] text-white px-4 py-2 rounded cursor-pointer col-span-2"
            />
          </form>


        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Ipoupdate
