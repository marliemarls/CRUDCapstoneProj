import React, { useContext } from "react";
import { MusicProvider } from "../store/ContextProvider";

function Playlist() {
  const { state, dispatch } = useContext(MusicProvider);

  const removeFromPlaylist = (id) => {
    dispatch({ type: "REMOVE_FROM_PLAYLIST", payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const total = state.playlist.reduce(
    (sum, item) => sum + item * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Playlist</h2>
      {state.playlist.length === 0 ? (
        <p>Your playlist is empty.</p>
      ) : (
        <>
          {state.playlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b py-2"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.quantity - 1))
                  }
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromPlaylist(item.id)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Playlist;