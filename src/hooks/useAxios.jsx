import axios from "axios";
import { useState } from "react";

const useAxios = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [isError, setIsError] = useState(false);
  const fetchData = async (url, options = {}) => {
    const {
      authToken = "",
      customErrorHandler = null,
      requiresAuth = false,
    } = options;

    try {
      const headers = {};
      if (requiresAuth) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }
      setIsRequesting(true);

      const response = await axios.get(url, { headers });

      setIsRequesting(false); // Move setIsRequesting inside the try block
      return response.data;
    } catch (error) {
      if (customErrorHandler) {
        customErrorHandler(error.response);
      } else {
        throw new Error(`Error fetching data from ${url}`);
      }
    }
  };

  const postData = async (url, data, options = {}) => {
    const { authToken = "", customErrorHandler = null } = options;

    try {
      setIsRequesting(true);
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setIsRequesting(false);
      return response.data;
    } catch (error) {
      if (customErrorHandler) {
        setIsRequesting(false); // Move setIsRequesting inside the try block
        customErrorHandler(error.response);
      } else {
        throw new Error(`Error posting data to ${url}`);
      }
    }
  };
  const patchData = async (url, data, options = {}) => {
    const { authToken = "", customErrorHandler = null } = options;

    try {
      setIsRequesting(true);
      const response = await axios.patch(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      setIsRequesting(false);
      return response.data;
    } catch (error) {
      if (customErrorHandler) {
        setIsRequesting(false); // Move setIsRequesting inside the try block
        customErrorHandler(error.response);
      } else {
        throw new Error(`Error updating data to ${url}`);
      }
    }
  };

  return { fetchData, postData, patchData, isRequesting, isError };
};

export default useAxios;
