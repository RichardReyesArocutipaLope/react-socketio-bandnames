import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => setBands(bands));
    return () => socket.off("current-bands");
  }, [socket]);

  const changeInput = (event, id) => {
    const newName = event.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) band.name = newName;
        return band;
      })
    );
  };

  const onLostFocus = (id, nombre) =>
    socket.emit("change-name-banda", { id, nombre });

  const onVote = (id) => socket.emit("votar-banda", id);
  const onDelete = (id) => socket.emit("delete-banda", id);

  const CrearRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => onVote(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={band.name}
            onChange={(event) => changeInput(event, band.id)}
            onBlur={() => onLostFocus(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => onDelete(band.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>

        <tbody>
          <CrearRows />
        </tbody>
      </table>
    </>
  );
};
