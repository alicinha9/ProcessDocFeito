import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import { router } from "expo-router";

function getApiBase() {
  if (Platform.OS === "android") return "http://10.0.2.2:3000";
  return "http://localhost:3000";
}

export default function RegisterScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    cep: "",
    dateOfBirth: "",
    password: "",
    role: "ADVOGADO",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));


  const register = () => {
    console.log("[register] navegar para index (/)…");
    router.replace("/"); // leva para app/(tabs)/index.tsx
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <Text style={styles.label}>Nome completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={form.name}
        onChangeText={(t) => handleChange("name", t)}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(t) => handleChange("email", t)}
      />

      <Text style={styles.label}>CPF</Text>
      <MaskInput
        style={styles.input}
        placeholder="000.000.000-00"
        keyboardType="numeric"
        value={form.cpf}
        onChangeText={(_, unmasked) => handleChange("cpf", unmasked)}
        mask={Masks.BRL_CPF}
      />

      <Text style={styles.label}>CEP</Text>
      <MaskInput
        style={styles.input}
        placeholder="00000-000"
        keyboardType="numeric"
        value={form.cep}
        onChangeText={(_, unmasked) => handleChange("cep", unmasked)}
        mask={Masks.ZIP_CODE}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <MaskInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        keyboardType="numeric"
        value={form.dateOfBirth}
        onChangeText={(masked) => handleChange("dateOfBirth", masked)}
        mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        secureTextEntry
        value={form.password}
        onChangeText={(t) => handleChange("password", t)}
      />

      {/* Botão principal: navega ao "Cadastrar" */}
      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={register}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
