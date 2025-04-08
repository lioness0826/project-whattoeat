import { useState, useEffect } from "react";

export const fetchAPI = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    console.log("Fetching API:", url);

    setLoading(true);
    setError(null);

    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch data");
            return response.json();
        })
        .then((data) => {
            setData(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });
    }, [url]);

    return { data, loading, error };
};