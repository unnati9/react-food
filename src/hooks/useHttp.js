import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);
  const respData = await response.json();

  if (!response.ok) {
    throw new Error(respData.message || "Something went wrong");
  }

  return respData;
};

const useHttp = (url, config, initialData) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialData);

  const clearData = () => {
    setData(initialData);
  };

  const sendRequest = useCallback(
    async (data) => {
      setIsLoading(true);
      try {
        const respData = await sendHttpRequest(url, { ...config, body: data });
        setData(respData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    error,
    isLoading,
    sendRequest,
    clearData,
  };
};

export default useHttp;
