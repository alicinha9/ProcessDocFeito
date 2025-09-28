import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function InicioScreen() {
  const router = useRouter();

  // Dados dos cards para facilitar a manutenção e escalabilidade
  const cardData = [
    {
      title: "Documentos",
      icon: require("../assets/doc.png"),
      actions: [
        { label: "Visualizar", onPress: () => alert("Visualizar documentos") },
        { label: "Cadastrar", onPress: () => router.push("/documentos") },
      ],
    },
    {
      title: "Clientes",
      icon: require("../assets/clientes.png"),
      actions: [
        { label: "Pesquisar", onPress: () => alert("Pesquisar clientes") },
        { label: "Cadastrar", onPress: () => router.push("/clientes") },
      ],
    },
    {
      title: "Processos",
      icon: require("../assets/processos.png"),
      actions: [
        { label: "Visualizar", onPress: () => alert("Visualizar processos") },
        { label: "Cadastrar", onPress: () => alert("Cadastrar processo") },
      ],
    },
    {
      title: "Pendências",
      icon: require("../assets/pendencias.png"),
      actions: [
        { label: "Visualizar", onPress: () => alert("Visualizar pendências") },
        { label: "Cadastrar", onPress: () => alert("Cadastrar pendência") },
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header com Logo e Título */}
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Process Doc</Text>
      </View>

      {/* Grade de Cards */}
      <View style={styles.grid}>
        {cardData.map((card, index) => (
          <View key={index} style={styles.card}>
            <Image source={card.icon} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>{card.title}</Text>
            <View style={styles.buttonGroup}>
              {card.actions.map((action, actionIndex) => (
                <TouchableOpacity
                  key={actionIndex}
                  style={styles.button}
                  onPress={action.onPress}
                >
                  <Text style={styles.buttonText}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E0E7FF", // Fundo azul claro, igual ao login
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30, // Mais espaço abaixo do header
  },
  logo: {
    width: 100,
    height: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0052CC", // Azul escuro para o título
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap", // Permite que os itens quebrem para a próxima linha
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#FFFFFF", // Fundo branco para os cards
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: "48%", // Levemente menor que 50% para ter um espaço no meio
    marginBottom: 20,
    // Sombra para dar profundidade
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  cardIcon: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Cor escura para o texto do card
    marginBottom: 15,
  },
  buttonGroup: {
    width: "100%", // Faz o grupo de botões ocupar toda a largura do card
  },
  button: {
    backgroundColor: "#007BFF", // Azul principal para os botões
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 8, // Espaço entre os botões
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});