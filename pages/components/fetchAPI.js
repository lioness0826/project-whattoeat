import { useState, useEffect } from "react";

const fetchAPI = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    // Check if data by API url already fetched, if yes load from local storage, if no fetch from API.
    const cached = localStorage.getItem(url);

    if (cached) {
      console.log("Loaded from cache:", url);
      setData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    console.log("Fetching API:", url);

    setLoading(true);
    setError(null);

    fetch(url)
        .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch data");
            return response.json();
        })
        .then((data) => {
            // Save data fetched from API to local storage to reuse and prevent fetching time
            localStorage.setItem(url, JSON.stringify(data));
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

export default fetchAPI;