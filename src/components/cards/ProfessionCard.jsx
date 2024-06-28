import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { errorNotify, infoNotify } from "../../utils/getNotify";
import axios from "axios";
import { base_url } from "../../utils/api";
import useReduxStore from "../../hooks/useReduxStore";
import ConfirmationModal from "../modals/ConfirmationModal";
import { useNavigate } from "react-router-dom";
import extractDate from "../../utils/extractDate";
import RequestLoader from "../loaders/RequestLoader";
const ProfessionCard = ({
  profession,
  userId,
  deleteUserProfession,
  showActions,
}) => {
  const { auth } = useReduxStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //handler function
  const handleProfessionDelete = async () => {
    deleteUserProfession({ userId, professionId: profession["_id"] });
  };

  //handle navigate to update
  const handleNavigate = (info) => {
    info.joiningDate = extractDate(profession.joiningDate);
    info.endingDate = extractDate(profession.endingDate);
    console.log(info);
    navigate("/dashboard/update-work-info", {
      state: {
        payload: info,
        userId,
      },
    });
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between">
        <div>
          <h3 className="text-xl font-semibold">{profession.instituteName}</h3>
          <p className="text-gray-700">{profession.designation}</p>
          <p className="text-gray-600">
            {new Date(profession.joiningDate).toLocaleDateString()} -
            {profession.endingDate
              ? new Date(profession.endingDate).toLocaleDateString()
              : "Present"}
          </p>
        </div>
        <div className={`flex gap-2 items-start ${!showActions?'hidden':'block'}`}>
          <button onClick={() => handleNavigate(profession)} type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 23.001H4C2.9 23.001 2 22.101 2 21.001C2 19.901 2.9 19.001 4 19.001H20C21.1 19.001 22 19.901 22 21.001C22 22.101 21.1 23.001 20 23.001ZM13.06 4.19104L16.81 7.94103L8.04 16.711C7.86 16.901 7.6 17.001 7.34 17.001H5C4.45 17.001 4 16.551 4 16.001V13.661C4 13.391 4.11 13.141 4.29 12.951L13.06 4.19104ZM17.88 6.87104L14.13 3.12104L15.96 1.29104C16.35 0.901035 16.98 0.901035 17.37 1.29104L19.71 3.63104C20.1 4.02104 20.1 4.65104 19.71 5.04104L17.88 6.87104Z"
                fill="#03BBBE"
              />
            </svg>
          </button>
          <label
            htmlFor="confirmationPopup"
            className=" cursor-pointer max-w-max "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V9C18 7.9 17.1 7 16 7H8C6.9 7 6 7.9 6 9V19ZM18 4H15.5L14.79 3.29C14.61 3.11 14.35 3 14.09 3H9.91C9.65 3 9.39 3.11 9.21 3.29L8.5 4H6C5.45 4 5 4.45 5 5C5 5.55 5.45 6 6 6H18C18.55 6 19 5.55 19 5C19 4.45 18.55 4 18 4Z"
                fill="#FF6B6B"
              />
            </svg>
          </label>
        </div>
      </div>
      <ConfirmationModal
        handleStatus={handleProfessionDelete}
      ></ConfirmationModal>
    </>
  );
};

export default ProfessionCard;
