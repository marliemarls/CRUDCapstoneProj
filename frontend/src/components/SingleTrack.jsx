// import React from "react";
import { Music, PhotoCard } from ".";
import { useState, useEffect } from "react";


const SingleTrack = () => {
  const [myData, setMyData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const curUser = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(curUser);
        const userId = currentUser.id;
        const musicResponse = await fetch(`http://localhost:8080/api/users/${userId}/getMyMusic`);
        if (!musicResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        const musicData = await musicResponse.json();
        setMyData(musicData);
        console.log(myData)
        console.log(currentUser)
    }catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>

      <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {myData === undefined ? (
            <div className="col-span-full text-center">
              <h1 className="text-2xl font-bold text-base-content">
                Music not found
              </h1>
            </div>
          ) : (
            myData.map((item, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl transition-colors duration-300 hover:shadow-2xl"
              >
                <div className="card-body bg-neutral-content rounded-md">
                  <h2 className="card-title text-center text-base-content justify-center mb-4">
                    {item.title}
                  </h2>
                  <div className="space-y-4">
                    <PhotoCard image_url={item.image_url} />
                    <Music music_url={item.music_url} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SingleTrack;
