import React, { useState } from 'react';
import './Carrinho.css';

function Carrinho() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Colar de Pérolas', preco: 29.9, entrega: 20, quantidade: 1 },
    { id: 2, nome: 'Pulseira', preco: 15.9, entrega: 20, quantidade: 1 },
  ]);

  const [cupomAplicado, setCupomAplicado] = useState(false);

  const atualizarQuantidade = (id, delta) => {
    setProdutos((produtos) =>
      produtos.map((produto) =>
        produto.id === id
          ? { ...produto, quantidade: Math.max(1, produto.quantidade + delta) }
          : produto
      )
    );
  };

  const removerProduto = (id) => {
    setProdutos((produtos) => produtos.filter((produto) => produto.id !== id));
  };

  const aplicarCupom = () => {
    setCupomAplicado(true);
  };

  const subtotal = produtos.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
  const entrega = cupomAplicado ? 0 : produtos.reduce((total, produto) => total + produto.entrega, 0);
  const total = subtotal + entrega;

  return (
    <div className="carrinho-container">
      <h2 className="carrinho-titulo">Meu Carrinho</h2>
      <div className="carrinho-lista">
        {produtos.map((produto) => (
          <div key={produto.id} className="carrinho-item">
            <div className="produto-info">
              <div className="produto-imagem"></div>
              <div>
                <h3 className="produto-nome">{produto.nome}</h3>
                <p className="produto-entrega">Entrega: R$ {produto.entrega.toFixed(2)}</p>
              </div>
            </div>
            <div className="produto-quantidade">
              <button onClick={() => atualizarQuantidade(produto.id, -1)}>-</button>
              <span>{produto.quantidade}</span>
              <button onClick={() => atualizarQuantidade(produto.id, 1)}>+</button>
            </div>
            <p className="produto-total">R$ {(produto.preco * produto.quantidade).toFixed(2)}</p>
            <button onClick={() => removerProduto(produto.id)} className="remover-produto">
              Remover
            </button>
          </div>
        ))}
      </div>
      <div className="carrinho-resumo">
        <div className="cupom-container">
          <input
            type="text"
            placeholder="Insira o cupom"
            disabled={cupomAplicado}
          />
          <button onClick={aplicarCupom} disabled={cupomAplicado}>
            Aplicar
          </button>
        </div>
        {cupomAplicado && <p className="cupom-mensagem">Cupom aplicado! Frete grátis.</p>}
        <div className="resumo-valores">
          <p>Subtotal: R$ {subtotal.toFixed(2)}</p>
          <p>Entrega: R$ {entrega.toFixed(2)}</p>
          <h3>Total: R$ {total.toFixed(2)}</h3>
        </div>
      </div>
      <button className="fechar-pedido">Fechar Pedido</button>
    </div>
  );
}

export default Carrinho;
