import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          {onClose && (
            <button onClick={onClose} style={cancelButtonStyle}>
              Cancelar
            </button>
          )}
          <button onClick={onConfirm} style={confirmButtonStyle}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  maxWidth: "400px",
  width: "90%",
  textAlign: "center",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
};

const cancelButtonStyle = {
  backgroundColor: "#ccc",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const confirmButtonStyle = {
  backgroundColor: "#7B2CBF",
  color: "#fff",
  padding: "10px 20px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

function Carrinho() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Colar de Pérolas", preco: 29.9, entrega: 20, quantidade: 1 },
    { id: 2, nome: "Pulseira", preco: 15.9, entrega: 20, quantidade: 1 },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [produtoParaRemover, setProdutoParaRemover] = useState(null);
  const [cupom, setCupom] = useState("");
  const [cupomStatus, setCupomStatus] = useState("");

  const abrirModal = (id) => {
    setProdutoParaRemover(id);
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setProdutoParaRemover(null);
    setIsModalOpen(false);
  };

  const confirmarRemocao = () => {
    setProdutos((produtos) => produtos.filter((produto) => produto.id !== produtoParaRemover));
    fecharModal();
  };

  const aplicarCupom = () => {
    if (cupom === "PRIMEIRACOMPRA") {
      setCupomStatus("Cupom aplicado! Frete grátis.");
    } else {
      setCupomStatus("Cupom inválido!");
    }
  };

  const fecharPedido = () => {
    setIsSuccessModalOpen(true);
  };

  const subtotal = produtos.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
  const entrega = cupomStatus === "Cupom aplicado! Frete grátis." ? 0 : produtos.reduce((total, produto) => total + produto.entrega, 0);
  const total = subtotal + entrega;

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px", backgroundColor: "#f7f7f7", borderRadius: "10px" }}>
      <h2 style={{ textAlign: "center", color: "#7B2CBF", marginBottom: "20px" }}>Meu Carrinho</h2>
      <div>
        {produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              background: "#fff",
              marginBottom: "10px",
              borderRadius: "8px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              <h3>{produto.nome}</h3>
              <p>Preço: R$ {produto.preco.toFixed(2)}</p>
              <p>Entrega: R$ {produto.entrega.toFixed(2)}</p>
            </div>
            <button onClick={() => abrirModal(produto.id)} style={{ color: "#E63946", border: "none", background: "none", cursor: "pointer" }}>
              Remover
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
        <input
          type="text"
          placeholder="Insira o cupom"
          value={cupom}
          onChange={(e) => setCupom(e.target.value)}
          style={{ width: "70%", padding: "10px", marginRight: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
        />
        <button onClick={aplicarCupom} style={{ backgroundColor: "#7B2CBF", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Aplicar
        </button>
        {cupomStatus && <p style={{ marginTop: "10px", color: cupomStatus.includes("inválido") ? "red" : "green" }}>{cupomStatus}</p>}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>Subtotal: R$ {subtotal.toFixed(2)}</h4>
        <h4>Entrega: R$ {entrega.toFixed(2)}</h4>
        <h3>Total: R$ {total.toFixed(2)}</h3>
      </div>
      <button
        onClick={fecharPedido}
        style={{
          width: "100%",
          padding: "15px",
          backgroundColor: "#7B2CBF",
          color: "white",
          fontSize: "16px",
          border: "none",
          borderRadius: "8px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Fechar Pedido
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={fecharModal}
        onConfirm={confirmarRemocao}
        title="Confirmação"
        message="Tem certeza que deseja remover este produto?"
      />
      <Modal
        isOpen={isSuccessModalOpen}
        onConfirm={() => setIsSuccessModalOpen(false)}
        title="Pedido Realizado"
        message="Pedido feito com sucesso!"
      />
    </div>
  );
}

export default Carrinho;
