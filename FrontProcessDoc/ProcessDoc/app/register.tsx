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
import { router } from "expo-router";
import { FontAwesome, Feather, MaterialIcons } from "@expo/vector-icons";
import MaskInput, { Masks } from "react-native-mask-input";

export default function RegisterScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  type FormFields = keyof typeof form;

  const handleChange = (field: FormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    setLoading(true);
    console.log("Dados do formulário:", form);
    Alert.alert("Sucesso", "Conta criada com sucesso! Você será redirecionado para o login.");
    
    setTimeout(() => {
      setLoading(false);
      router.replace("/login");
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.registerBox}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Process Doc</Text>

        <Text style={styles.helperText}>Use um e-mail válido para recuperar sua conta.</Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome de Usuário"
            placeholderTextColor="#888"
            value={form.name}
            onChangeText={(t) => handleChange("name", t)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(t) => handleChange("email", t)}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="id-card" size={18} color="#888" style={styles.icon} />
          <MaskInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={form.cpf}
            onChangeText={(masked, unmasked) => handleChange("cpf", unmasked)}
            mask={Masks.BRL_CPF}
          />
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
            <Feather name={isPasswordVisible ? "eye" : "eye-off"} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar sua senha"
            placeholderTextColor="#888"
            secureTextEntry={!isConfirmPasswordVisible}
            value={form.confirmPassword}
            onChangeText={(t) => handleChange("confirmPassword", t)}
          />
          <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
            <Feather name={isConfirmPasswordVisible ? "eye" : "eye-off"} size={20} color="#888" />
          </TouchableOpacity>
        </View>

        <Text style={styles.dateLabel}>Data de Nascimento</Text>
        <View style={styles.dateContainer}>
            <TextInput style={styles.dateInput} placeholder="Dia" placeholderTextColor="#888" keyboardType="numeric" maxLength={2} />
            <TextInput style={styles.dateInput} placeholder="Mês" placeholderTextColor="#888" keyboardType="numeric" maxLength={2} />
            <TextInput style={[styles.dateInput, styles.yearInput]} placeholder="Ano" placeholderTextColor="#888" keyboardType="numeric" maxLength={4} />
        </View>

        <Text style={styles.termsText}>
          Ao se registrar você concorda com nossos <Text style={styles.linkText}>Termos e Condições</Text>.
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "CRIANDO..." : "CRIAR CONTA"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/login")} style={styles.footerLink}>
          <Text style={styles.footerText}>Já possui uma conta?</Text>
          <Text style={[styles.footerText, styles.linkText]}>Entre Agora!</Text>
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
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  registerBox: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: 140, // Logo aumentado
    height: 70, // Logo aumentado
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0052CC",
    marginBottom: 15,
  },
  helperText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
    marginHorizontal: 10,
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
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: "#333",
    fontSize: 16,
  },
  dateLabel: {
    alignSelf: 'flex-start',
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    backgroundColor: "#F0F4F8",
    borderWidth: 1,
    borderColor: "#D1D9E6",
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    width: '30%',
  },
  yearInput: {
    width: '35%',
  },
  termsText: {
    fontSize: 13,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  linkText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  footerLink: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: "#333",
  },
});