import React from "react";
import {trash} from "../../assets/getAssets"

const ConfirmationModal = ({ handleStatus, modalClose, title }) => {
  return (
    <section>
      <input type="checkbox" id="confirmationPopup" className="modal-toggle" />
      <div id="confirmationPopup" className="modal">
        <div className="modal-box w-11/12 max-w-[640px] p-10 rounded-3xl">
          <div className="w-full mb-[26px]">
            <img src={trash} alt="" className="w-[240px] h-[240px] mx-auto" />
          </div>

          <div className="text-center w-full mb-[26px]">
            <h4 className=" text-errorColor text-4xl font-bold font-poppins ">
              Delete
            </h4>
            <p className="text-2xl text-black-600 mt-2 font-poppins">
              Are you sure?
            </p>
          </div>
          <div className="modal-action flex items-center justify-center gap-6 w-full">
            <label
              htmlFor="confirmationPopup"
              className="btn bg-basecolor hover:bg-basecolor text-white text-base font-semibold w-full max-w-[200px] rounded-xl py-4 px-10 h-full border-none"
              data-hs-overlay={modalClose || ""}
            >
              No, Thanks
            </label>
            <label
              htmlFor="confirmationPopup"
              className="btn bg-errorColor hover:bg-errorColor text-white text-base font-semibold w-full max-w-[200px] rounded-xl py-4 px-10 h-full border-none"
              data-hs-overlay={modalClose || ""}
              onClick={handleStatus}
            >
              Yes, Delete
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationModal;
