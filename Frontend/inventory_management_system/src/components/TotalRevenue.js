import React, { useEffect, useState } from 'react';

export default function TotalRevenue() {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTotalRevenue = async () => {
            try {
                const response = await fetch("http://localhost:3001/totalrevenue");
                const data = await response.json();

                if (response.ok) {
                    setTotalRevenue(data.totalRevenue);
                } else {
                    setError("Failed to fetch total revenue");
                }
            } catch (err) {
                setError("An error occurred while fetching the total revenue");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalRevenue();
    }, []);

    return (
        <div className='container-fluid p-5'>
            <h1>Total Revenue</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <p className="fs-4">Total Revenue: ${totalRevenue.toFixed(2)}</p>
            )}
        </div>
    );
}
