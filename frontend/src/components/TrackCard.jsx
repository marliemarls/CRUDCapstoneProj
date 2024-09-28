import React from "react";
import { Music, PhotoCard } from ".";
import { useState, useEffect } from "react";

const TrackCard = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/test");
        const data = await response.json();
        setMyData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3">
      {myData === undefined ? 
        (<h1>Music not found</h1>)
      :
      (
        myData.map((item, index) => {
          return (
            <>
              <div key={index} className="card bg-base-100 w-96 p-4 m-4" >
                <h1 className="text-center font-bold">{item.title}</h1>

                <div className="card bg-base-100 w-96 shadow-xl border-1 border-gray-300 p-auto m-auto">
                  <PhotoCard image_url={item.image_url}/>
                  <Music music_url={item.music_url} />
                </div>
              </div>
            </>
          );
        }))}
        </div>
    </>
  );
};

export default TrackCard;
