import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { router } from "expo-router"; // Import router para navegação
import { FontAwesome, Feather } from "@expo/vector-icons";

export default function LoginScreen() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  interface LoginForm {
    email: string;
    password: string;
  }

  type Field = keyof LoginForm;

  const handleChange = (field: Field, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const login = async () => {
    console.log("Tentando fazer login com:", form);
    // Lógica de login com a API viria aqui.
    // Se o login for bem-sucedido:
    Alert.alert("Process Doc", "Login realizado com sucesso!");
    router.replace('/inicio'); // Navega para a tela de início
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.loginBox}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>Process Doc</Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(t) => handleChange("email", t)}
          />
          <View style={styles.placeholderIcon} />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#888"
            secureTextEntry={!isPasswordVisible}
            value={form.password}
            onChangeText={(t) => handleChange("password", t)}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Feather
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={20}
              color="#888"
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OU SE VOCÊ NÃO POSSUI UMA CONTA</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.registerButtonText}>REGISTRE-SE AGORA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E7FF",
    padding: 20,
  },
  loginBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0052CC",
    marginBottom: 25,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
    borderWidth: 1,
    borderColor: "#D1D9E6",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  placeholderIcon: {
    width: 20,
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: "#333",
    fontSize: 16,
  },
  forgotPassword: {
    color: "#0052CC",
    fontSize: 14,
    alignSelf: "flex-start",
    marginBottom: 20,
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D9E6",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
  },
  registerButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
    borderColor: "#007BFF",
  },
  registerButtonText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});