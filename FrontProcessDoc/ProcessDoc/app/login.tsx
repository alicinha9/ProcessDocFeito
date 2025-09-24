import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function LoginScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

interface LoginForm {
    email: string;
    password: string;
}

type Field = keyof LoginForm;

const handleChange = (field: Field, value: string) => {
    setForm({ ...form, [field]: value });
};

  const login = async () => {
    try {
      const res = await fetch("http://10.0.2.2:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Sucesso ✅", "Login realizado com sucesso!");
        } else {
        Alert.alert("Erro ❌", data.error || "Falha no login");
      }
    } catch (err) {
      Alert.alert("Erro ⚠️", err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(t) => handleChange("email", t)}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={form.password}
        onChangeText={(t) => handleChange("password", t)}
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212", // mesma cor do register
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#555",
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 10,
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});