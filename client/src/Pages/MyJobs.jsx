import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Loader from "../components/Loader"

const MyJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  // console.log(searchText)
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // console.log(control)
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://job-fr45.onrender.com/myJobs/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJobs(data);
        setIsLoading(false);
      });
  }, [searchText, user]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  // search functionality
  const handleSearch = () => {
    const filter = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    // console.log(filter);
    setJobs(filter);
    setIsLoading(false);
  };

 // pagination previous and next
 const nextPage = () => {
  if (indexOfLastItem < jobs.length) {
    setCurrentPage(currentPage + 1);
  }
};

// delete a books
const handleDelete = (id) => {
  // console.log(id)
  fetch(`https://job-fr45.onrender.com/job/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // setAllBooks(data);
      if(data.acknowledged === true){
        alert("Job Deleted Successfully!!")
      }
    });
};

const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

console.log(currentJobs)
// 
  return (
    <div className="container px-4 mx-auto max-w-screen-2xl xl:px-24">
      <div className="my-jobs-container">
        <h1 className="p-4 text-center ">ALL My Jobs</h1>
        <div className="p-2 mb-2 text-center search-box">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="w-full py-2 pl-3 mb-4 border focus:outline-none lg:w-6/12"
          />
          <button
            onClick={handleSearch}
            className="px-8 py-2 mb-4 font-semibold text-white rounded-sm bg-blue"
          >
            Search
          </button>
        </div>

        {/* table */}
        <section className="py-1 bg-blueGray-50">
          <div className="w-full px-4 mx-auto mt-5 mb-12 xl:w-8/12 xl:mb-0">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg ">
              <div className="px-4 py-3 mb-0 border-0 rounded-t">
                <div className="flex flex-col items-center gap-4 md:flex-row">
                  <div className="relative flex-1 flex-grow w-full max-w-full px-4">
                    <h3 className="text-base font-semibold text-blueGray-700">
                      All Jobs
                    </h3>
                  </div>
                  <div className="relative flex-1 flex-grow w-full max-w-full px-4 text-right">
                    <Link
                      to="/post-job"
                      className="px-3 py-1 mb-1 mr-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-indigo-500 rounded outline-none active:bg-indigo-600 focus:outline-none"
                    >
                      Post A New Job
                    </Link>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                        No.
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                        Title
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                        Company Name
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                        salary
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                        Edit
                      </th>
                      <th className="px-6 py-3 text-xs font-semibold text-left uppercase align-middle border border-l-0 border-r-0 border-solid bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  {/* set loding here */}
                  {isLoading ? (
                    <div className="flex items-center justify-center h-20">
                      <Loader/>
                    </div>
                  ) : (
                    <tbody>
                      {currentJobs.map((job, index) => (
                        <tr key={index}>
                          <th className="p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap text-blueGray-700 ">
                            {index + 1}
                          </th>
                          <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap ">
                            {job.jobTitle}
                          </td>
                          <td className="p-4 px-6 text-xs border-t-0 border-l-0 border-r-0 align-center whitespace-nowrap">
                            {job.companyName}
                          </td>
                          <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                            ${job.minPrice} - ${job.maxPrice}k
                          </td>
                          <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                            <button><Link to={`/edit-job/${job?._id}`}>Edit</Link></button>
                          </td>
                          <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                            <button className="px-6 py-2 text-white bg-red-700 rounded-sm" onClick={() => handleDelete(job._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
                  {/* pagination */}
        <div className="flex justify-center space-x-8 text-black">
          {currentPage > 1 && (
            <button onClick={prevPage} className="hover:underline">
              Previous
            </button>
          )}
          {indexOfLastItem < jobs.length && (
            <button onClick={nextPage} className="hover:underline">
              Next
            </button>
          )}
        </div>
        </section>
      </div>
    </div>
  );
};

export default MyJobs;
