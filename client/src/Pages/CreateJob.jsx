/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaDollarSign } from "react-icons/fa";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import {AuthContext} from "../context/AuthProvider";
const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset 
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    fetch("https://job-fr45.onrender.com/post-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        if(result.acknowledged === true){
          alert("Job Posted Successfully!!")
        }
        reset(); // Reset the form
      });

    // console.log(data)
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
    { value: "Python ", label: "Python" },
  ];

  // console.log(watch("example"));

  return (
    <div className="container px-4 mx-auto max-w-screen-2xl xl:px-24">
      {/* <PageHeader title={"Post A Job"} path={"Create Job"} /> */}

      {/* form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                defaultValue="Web Developer"
                {...register("jobTitle")}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                placeholder="Ex: Microsoft"
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 2nd row */}
          <div className="create-job-flex">
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                placeholder="$20k"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                placeholder="$100k"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="create-job-flex">
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                placeholder="Ex: New York"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          {/* 4th row */}
          <div className="create-job-flex">
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                className="create-job-input"
                {...register("postingDate")}
                placeholder="Ex: 2023-11-03"
                type="date"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value="">Select Your Experience Level</option>
                <option value="NoExperience">No experience</option>
                <option value="Internship">Internship</option>
                <option value="Work remotely">Work remotely</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div className="">
            <label className="block mb-2 text-lg">Required Skill Sets:</label>
            <CreatableSelect
              className="py-4 create-job-input"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
          </div>

          {/* 6th row */}
          <div className="create-job-flex">
            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your image url: https://weshare.com/img1.jpg"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value="">Select your job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* 7th row */}
          <div className="w-full">
          <label className="block mb-2 text-lg">Job Description</label>
          <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              {...register("description")}
              placeholder="job description"
              defaultValue={"Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."}
            />
          </div>

          {/* last row */}
          <div className="w-full">
          <label className="block mb-2 text-lg">Job Posted by</label>
          <input
          type="email"
               value={user?.email}
              className="w-full pl-3 py-1.5 focus:outline-none"
              {...register("postedBy")}
              placeholder="your email"
            />
          </div>

          <input
            type="submit"
            className="block px-8 py-2 mt-12 font-semibold text-white rounded-sm cursor-pointer bg-blue"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
