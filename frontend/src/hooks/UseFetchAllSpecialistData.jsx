import { useState, useEffect } from 'react';
import axiosInstance from "../axiosConfig"

const UseFetchAllSpecialistData = (url) => {
  const [specialistData, setSpecialistData] = useState([]);
  //console.log(specialistData)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetchValue,setRefetchValue] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(url);
        
        const result = res.data;

        
        setSpecialistData(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [url,refetchValue]);
  const refetch = ()=>{
    setRefetchValue(!refetchValue)
  }

  return {
    specialistData,
    loading,
    error,
    refetch
  };
};

export default UseFetchAllSpecialistData;