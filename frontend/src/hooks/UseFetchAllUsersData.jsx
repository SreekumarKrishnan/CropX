import { useState, useEffect, useContext } from "react";
import axiosInstance from "../axiosConfig";
import { authContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UseFetchAllUsersData = (url) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchValue, setRefetchValue] = useState(false);

  const { dispatch } = useContext(authContext);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(url);

        const result = res.data;

        setUserData(result.data);
        setLoading(false);
      } catch (error) {
        if (error.response.status) {
          dispatch({ type: "LOGOUT" });
          navigate("/login");
          location.reload();
        }
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [url, refetchValue]);

  const refetch = () => {
    setRefetchValue(!refetchValue);
  };

  return {
    userData,
    loading,
    error,
    refetch,
  };
};

export default UseFetchAllUsersData;
