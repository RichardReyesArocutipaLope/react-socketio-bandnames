import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const [valor, setValor] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (event) => {
    event.preventDefault();
    if (valor.trim().length > 0) {
      socket.emit("new-banda", { nombre: valor });
      setValor("");
    }
  };

  return (
    <>
      <h3>Agregar Band</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={valor}
          onChange={(ev) => setValor(ev.target.value)}
        />
      </form>
    </>
  );
};
