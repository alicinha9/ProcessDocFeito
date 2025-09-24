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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Process Doc</Text>
      </View>

      {/* Grade com os 4 blocos */}
      <View style={styles.row}>
        {/* Documentos */}
        <View style={styles.card}>
          <Image source={require("../assets/doc.png")} style={styles.icon} />
          <Text style={styles.cardTitle}>Documentos</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert("Visualizar documentos")}
            >
              <Text style={styles.buttonText}>Visualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/documentos")}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Clientes */}
        <View style={styles.card}>
          <Image source={require("../assets/clientes.png")} style={styles.icon} />
          <Text style={styles.cardTitle}>Clientes</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert("Pesquisar clientes")}
            >
              <Text style={styles.buttonText}>Pesquisar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/clientes")}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        {/* Processos */}
        <View style={styles.card}>
          <Image source={require("../assets/processos.png")} style={styles.icon} />
          <Text style={styles.cardTitle}>Processos</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert("Visualizar processos")}
            >
              <Text style={styles.buttonText}>Visualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert("Cadastrar processo")}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Pendências */}
        <View style={styles.card}>
          <Image source={require("../assets/pendencias.png")} style={styles.icon} />
          <Text style={styles.cardTitle}>Pendências</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert("Visualizar pendências")}
            >
              <Text style={styles.buttonText}>Visualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => alert("Cadastrar pendência")}
            >
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#121212",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    position: "absolute",
    left: 0,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    width: "45%", // 2 blocos por linha
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonGroup: {
    flexDirection: "column",
    gap: 8,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textTransform: "uppercase",
  },
});