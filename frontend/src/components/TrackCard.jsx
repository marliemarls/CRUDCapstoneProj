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
      {myData === undefined ? 
        (<h1>Music not found</h1>)
      :
      (
        myData.map((item, index) => {
          return (
            <>
              <div key={index} className="">
                <h1>{item.title}</h1>

                <div className="card bg-base-100 w-96 shadow-xl border-2 border-gray-300">
                  <PhotoCard image_url={item.image_url} />
                  <Music music_url={item.music_url} />
                </div>
              </div>
            </>
          );
        }))}
    </>
  );
};

export default TrackCard;
