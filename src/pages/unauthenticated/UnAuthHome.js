import React from "react";
import HeaderImg from "../../assets/images/headerSVG.svg";
import HeroImg from "../../assets/images/heroImage.webp";
import DividerImg from "../../assets/images/deviderSVG.svg";
import { Events } from "../../components/Events";
import { Form } from "../../components/Form";
import { useLocalStorage } from "../../utilities/useLocalStorage";
import { UnAuthHeader } from "./../../components/UnAuthHeader";
import { NavLink } from "react-router-dom";
const FormFields = [
  {
    label: "Event Title",
    type: "text",
    name: "title",
  },
  {
    label: "Ticket Price",
    type: "number",
    name: "price",
  },
  {
    label: "Event Date",
    type: "datetime-local",
    name: "date",
  },
  {
    label: "Description",
    type: "textarea",
    name: "description",
  },
];
export const UnAuthHome = ({ history }) => {
  const [homeFormData, setHomeFormData] = useLocalStorage("homeFormData", {});
  console.log(homeFormData);
  return (
    <div className="relative overflow-visible h-screen">
      <img
        className="absolute   -top-0 left-8 scale-150 sm:-top-6 md:-top-8 lg:-top-10 xl:-top-20 2xl:-top-28   z-20 w-screen transform sm:scale-125 object-cover"
        src={HeaderImg}
        alt="Header Divider"
      />
      <img
        className="absolute top-4 lg:top-18 z-10  transform scale-125 object-cover h-96 sm:h-auto sm:mt-16 sm:scale-150"
        src={HeroImg}
        alt="HeroImg"
      />
      <img
        className="absolute top-96 mt-16 left-8 scale-150 sm:top-72 md:top-80 lg:top-96 lg:mt-20 xl:mt-40 2xl:mt-96   z-0 w-screen transform sm:scale-125 object-cover"
        src={HeaderImg}
        alt="Header Divider"
      />
      <div className="px-4 sm:px-6 2xl:px-0 lg:max-w-7xl mx-auto">
        {/* Header */}
        <UnAuthHeader />

        {/* hero Section */}
        <div className="relative flex flex-col  z-10 mx-auto text-center pt-14 md:pt-28 lg:pt-36 xl:pt-52 2xl:pt-80 text-gray-50 ">
          <p className="font-black text-4xl xl:text-5xl 2xl:text-6xl">
            "Somewhere, something
            <br />
            incredible is waiting to be known."
          </p>
          <p className="from-gray-100 mt-2 italic">– Sharon Begley</p>
          <button className="bg-gray-50 mt-8 rounded-full mx-auto px-4 xl:px-8 xl:py-4 py-1 text-gray-900 text-2xl xl:text-5xl font-bold focus:outline-none focus:ring ring-gray-50 ring-offset-2 ring-offset-gray-900">
            Book Now
          </button>
        </div>
        {/* events */}
        <div className="relative  z-40 mt-20">
          <Events unAuth={true} />
          <NavLink to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mt-4 mx-auto h-24 w-24 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </NavLink>
        </div>

        {/* form */}
        <div className="  w-full overflow-y-hidden">
          <img
            className="min-w-full z-0 absolute object-center transform scale-125"
            src={DividerImg}
            alt="DividerImg"
          />
        </div>
        <div className="relative flex md:space-x-8  md:px-12 space-y-8 flex-col md:flex-row w-full md:justify-between  z-10">
          <div className="flex   flex-col space-y-4 md:space-y-8">
            <p className=" text-7xl md:text-8xl font-bold text-gray-600 text-center md:text-left">
              Create an
              <br />
              event now
            </p>
            <p className="text-2xl md:text-4xl font-light text-center text-gray-500 md:text-left">
              Wanna more intenders in your
              <br />
              event Try our service!
            </p>
            <div className="bg-gray-400 text-4xl w-72 px-6 py-3 font-bold text-gray-50 hidden md:block">
              CREATE NOW
            </div>
          </div>
          <Form
            fields={FormFields}
            btnLabel="CREATE NOW"
            handleClick={(formData) => {
              setHomeFormData({
                ...formData,
                price: parseFloat(formData.price),
                date: formData.date,
              });
              history.push("/signup");
            }}
          />
        </div>

        {/* footer */}
        <div className="md:hidden w-full mt-8 flex items-center justify-center space-x-4">
          <p className="font-bold text-4xl text-gray-400">© TolanLabs.</p>
        </div>
      </div>
    </div>
  );
};
