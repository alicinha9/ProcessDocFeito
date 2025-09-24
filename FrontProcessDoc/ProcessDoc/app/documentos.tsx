import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // ícones

export default function DocumentosScreen() {
  const clientesCadastrados = ['Alice', 'Bruno', 'Carlos'];
  const tipos = ['CPF', 'Certidão', 'Identidade', 'Endereço', 'Intimação', 'Todos'];

  const [cliente, setCliente] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tipo, setTipo] = useState('');
  const [documentos, setDocumentos] = useState<{ [key: string]: string | null }>({});

  const buscarCliente = () => {
    const encontrado = clientesCadastrados.find(c => c.toLowerCase() === cliente.toLowerCase());
    if (encontrado) Alert.alert('Cliente encontrado', `Cliente: ${encontrado}`);
    else Alert.alert('Cliente não encontrado', 'Verifique o nome digitado');
  };

  const anexarDocumento = (tipoDoc: string) => {
    const nomeArquivo = prompt(`Simulação: insira o nome do arquivo para "${tipoDoc}":`);
    if (nomeArquivo) setDocumentos(prev => ({ ...prev, [tipoDoc]: nomeArquivo }));
  };

  const adicionarDocumentos = () => {
    if (!cliente || !tipo) return Alert.alert('Erro', 'Selecione cliente e tipo de documentação!');

    if (tipo === 'Todos') {
      const todosTipos = tipos.filter(t => t !== 'Todos');
      for (const t of todosTipos) if (!documentos[t]) return Alert.alert('Erro', `Anexe o documento: ${t}`);
    } else if (!documentos[tipo]) return Alert.alert('Erro', `Anexe o documento: ${tipo}`);

    console.log('Documentos adicionados:', { cliente, tipo, documentos });
    Alert.alert('Sucesso', 'Documentos adicionados com sucesso!');
    setCliente('');
    setTipo('');
    setDocumentos({});
    setDropdownOpen(false);
  };

  const tiposParaAnexar = tipo === 'Todos' ? tipos.filter(t => t !== 'Todos') : tipo ? [tipo] : [];

  const icones: { [key: string]: React.ComponentProps<typeof MaterialCommunityIcons>['name'] } = {
    CPF: 'card-account-details',
    'Certidão': 'file-document',
    Identidade: 'account-box',
    Endereço: 'home-city',
    Intimação: 'alert',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adicionar Documentos</Text>

      {/* Cliente */}
      <Text style={styles.label}>Cliente</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Digite o nome do cliente"
          placeholderTextColor="#888"
          value={cliente}
          onChangeText={setCliente}
        />
        <TouchableOpacity style={styles.searchButton} onPress={buscarCliente}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Tipo */}
      <Text style={styles.label}>Tipo de Documentação</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownOpen(!dropdownOpen)}
      >
        <Text style={{ color: tipo ? '#fff' : '#888' }}>{tipo || 'Selecione o tipo'}</Text>
      </TouchableOpacity>
      {dropdownOpen && (
        <View style={styles.dropdownList}>
          {tipos.map(t => (
            <TouchableOpacity
              key={t}
              style={styles.dropdownItem}
              onPress={() => { setTipo(t); setDropdownOpen(false); }}
            >
              <Text style={styles.dropdownItemText}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Botões de anexar documentos */}
      {tiposParaAnexar.map(t => (
        <TouchableOpacity
          key={t}
          style={[styles.anexarButton, documentos[t] && styles.anexarButtonAttached]}
          onPress={() => anexarDocumento(t)}
        >
          <MaterialCommunityIcons name={icones[t] || 'file'} size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.anexarButtonText}>
            {documentos[t] ? `${t} anexado ✅` : `Anexar ${t}`}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Botão adicionar */}
      <TouchableOpacity style={styles.submitButton} onPress={adicionarDocumentos}>
        <Text style={styles.submitButtonText}>Adicionar Documentos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: '700', color: '#fff', marginBottom: 25 },
  label: { alignSelf: 'flex-start', fontSize: 16, color: '#fff', marginBottom: 5, marginTop: 15 },
  row: { flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 10 },
  input: {
    backgroundColor: '#1c1c1c',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
    color: '#fff',
    marginRight: 10,
  },
  searchButton: { backgroundColor: '#0d6efd', padding: 10, borderRadius: 8 },
  searchButtonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  dropdown: {
    width: '100%',
    padding: 12,
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
  },
  dropdownList: {
    width: '100%',
    backgroundColor: '#1c1c1c',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 10,
  },
  dropdownItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#333' },
  dropdownItemText: { color: '#fff' },
  anexarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#198754',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
  },
  anexarButtonAttached: { backgroundColor: '#0dcaf0' },
  anexarButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  submitButton: {
    width: '100%',
    backgroundColor: '#0d6efd',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
