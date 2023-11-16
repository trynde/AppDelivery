import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

const Carrinho = () => {
  // Estado para armazenar os itens no carrinho
  const [cartItems, setCartItems] = useState(itemsNoCarrinho);

  // Função para aumentar a quantidade de um item no carrinho
  const aumentarQuantidade = (index) => {
    const novosItens = [...cartItems];
    novosItens[index].quantidade++;
    setCartItems(novosItens);
  };

  // Função para diminuir a quantidade de um item no carrinho
  const diminuirQuantidade = (index) => {
    const novosItens = [...cartItems];
    if (novosItens[index].quantidade > 1) {
      novosItens[index].quantidade--;
      setCartItems(novosItens);
    }
  };

  // Função para calcular o subtotal com base nos itens no carrinho
  const calcularSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  // Exemplo de valores de frete e desconto
  const frete = 5;
  const desconto = 2;

  // Cálculos para subtotal e total
  const subtotal = calcularSubtotal();
  const total = subtotal + frete - desconto;

  // Renderização da tela
  return (
    <View>
      {/* Lista de itens no carrinho */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: item.imagem }} style={{ width: 50, height: 50 }} />
            <Text>{item.nome}</Text>
            {/* Botões para aumentar e diminuir a quantidade do item */}
            <TouchableOpacity onPress={() => aumentarQuantidade(index)}>
              <Text>+</Text>
            </TouchableOpacity>
            <Text>{item.quantidade}</Text>
            <TouchableOpacity onPress={() => diminuirQuantidade(index)}>
              <Text>-</Text>
            </TouchableOpacity>
            {/* Exibição do valor total do item */}
            <Text>{item.preco * item.quantidade}</Text>
          </View>
        )}
      />
      {/* Informações sobre subtotal, frete, desconto e total */}
      <View>
        <Text>Subtotal: {subtotal}</Text>
        <Text>Frete: {frete}</Text>
        <Text>Desconto: {desconto}</Text>
        <Text>Total: {total}</Text>
      </View>
    </View>
  );
};

export default Carrinho;