import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // usando expo-router para navegação

export default function ClientesScreen() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [processo, setProcesso] = useState('');
  const [foto, setFoto] = useState<string | null>(null);

  const anexarFoto = () => {
    const url = prompt('Insira a URL da foto do cliente:');
    if (url) setFoto(url);
  };

  const cadastrarCliente = () => {
    if (!nome || !dataNascimento || !cpf || !endereco || !telefone || !processo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos!');
      return;
    }

    const cliente = { nome, dataNascimento, cpf, endereco, telefone, processo, foto };
    console.log('Cliente cadastrado:', cliente);
    Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!');

    setNome('');
    setDataNascimento('');
    setCpf('');
    setEndereco('');
    setTelefone('');
    setProcesso('');
    setFoto(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/inicio')}>
        <Text style={styles.backButtonText}>🏠 Início</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Cadastro de Cliente</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do cliente"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Data de Nascimento</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#888"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        placeholder="000.000.000-00"
        placeholderTextColor="#888"
        value={cpf}
        onChangeText={setCpf}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        placeholder="Rua, número, bairro"
        placeholderTextColor="#888"
        value={endereco}
        onChangeText={setEndereco}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="(00) 00000-0000"
        placeholderTextColor="#888"
        value={telefone}
        onChangeText={setTelefone}
      />

      <Text style={styles.label}>Processo</Text>
      <TextInput
        style={styles.input}
        placeholder="Número do processo"
        placeholderTextColor="#888"
        value={processo}
        onChangeText={setProcesso}
      />

      <TouchableOpacity style={styles.fotoButton} onPress={anexarFoto}>
        <Text style={styles.fotoButtonText}>Anexar Foto</Text>
      </TouchableOpacity>

      {foto && <Image source={{ uri: foto }} style={styles.foto} />}

      <TouchableOpacity style={styles.submitButton} onPress={cadastrarCliente}>
        <Text style={styles.submitButtonText}>Cadastrar Cliente</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: '#000', // fundo preto
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#333',
    borderRadius: 6,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 30,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#1c1c1c',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
    color: '#fff',
  },
  fotoButton: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#0d6efd',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  fotoButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  foto: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 5,
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#198754',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});