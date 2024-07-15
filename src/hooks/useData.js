import React, { useEffect, useState } from "react";

import apiClient from "../utils/api-client";
import FeaturedProducts from "../components/Home/FeaturedProducts";

const useData = (url, customConfig, deps) => {
  const [data, setData] = useState(null);
  const [errors, setError] = useState("");
  const [isLoadig, setIsLoading] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      apiClient
        .get(url, customConfig)
        .then((response) => {
          if (
            url === "/products" &&
            data &&
            data.products &&
            customConfig.params.page !== 1
          ) {
            setData((prev) => ({
              ...prev,
              products: [...prev.products, ...response.data.products],
            }));
          } else {
            setData(response.data);
          }

          setIsLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
    },
    deps ? deps : []
  );
  return { data, errors, isLoadig };
};

export default useData;
