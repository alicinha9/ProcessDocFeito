import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function DocumentosScreen() {
  const router = useRouter();
  const clientesCadastrados = ["Alice", "Bruno", "Carlos"]; // Simulação
  const tipos = ["CPF", "Certidão", "Identidade", "Endereço", "Intimação", "Todos"]; // Adicionado 'Todos'
  const tiposDocumentos = ["CPF", "Certidão", "Identidade", "Endereço", "Intimação"]; // Tipos de documentos sem "Todos"

  const [cliente, setCliente] = useState("");
  const [nomeDocumento, setNomeDocumento] = useState("");
  const [numeroProcesso, setNumeroProcesso] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tipoSelecionado, setTipoSelecionado] = useState("");
  const [documentosAnexados, setDocumentosAnexados] = useState<{ [key: string]: string | null }>({});

  const buscarCliente = () => {
    const encontrado = clientesCadastrados.find(c => c.toLowerCase() === cliente.toLowerCase());
    if (encontrado) {
      Alert.alert("Cliente encontrado", `Cliente: ${encontrado}`);
    } else {
      Alert.alert("Cliente não encontrado", "Verifique o nome digitado");
    }
  };

  const anexarDocumento = (tipoDoc: string) => {
    const nomeArquivo = prompt(`Insira a URL do arquivo para "${tipoDoc}":`);
    if (nomeArquivo) {
      setDocumentosAnexados(prev => ({ ...prev, [tipoDoc]: nomeArquivo }));
    }
  };

  const handleCadastrarDocumento = () => {
    if (!cliente || !nomeDocumento || !tipoSelecionado) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    // Lógica para cadastrar o documento
    console.log("Dados do documento:", {
      cliente,
      nomeDocumento,
      numeroProcesso,
      tipoSelecionado,
      documentosAnexados,
    });
    Alert.alert("Sucesso", "Documento cadastrado com sucesso!");
    // router.push("/inicio"); // Redirecionar após o cadastro
  };

  const icones: { [key: string]: React.ComponentProps<typeof MaterialCommunityIcons>["name"] } = {
    CPF: "card-account-details",
    Certidão: "file-document",
    Identidade: "account-box",
    Endereço: "home-city",
    Intimação: "alert",
  };

  // Função para determinar quais botões mostrar
  const getBotoesParaMostrar = () => {
    if (tipoSelecionado === "Todos") {
      return tiposDocumentos; // Mostra todos os tipos de documentos
    } else if (tipoSelecionado && tipoSelecionado !== "Todos") {
      return [tipoSelecionado]; // Mostra apenas o tipo selecionado
    }
    return []; // Não mostra nenhum botão se nada estiver selecionado
  };

  const botoesParaMostrar = getBotoesParaMostrar();
  const isTodosSelected = tipoSelecionado === "Todos";

  return (
    <View style={styles.fullContainer}>
      {/* Header */} 
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#007BFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Image
            source={require("../assets/logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Process Doc</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formCard}>
          <Text style={styles.title}>Cadastro de Documento</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cliente</Text>
            <View style={styles.rowInputWithButton}>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome do cliente"
                placeholderTextColor="#888"
                value={cliente}
                onChangeText={setCliente}
              />
              <TouchableOpacity style={styles.searchButton} onPress={buscarCliente}>
                <Feather name="search" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome do Documento</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Contrato Social, Procuração"
              placeholderTextColor="#888"
              value={nomeDocumento}
              onChangeText={setNomeDocumento}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Número do Processo (Opcional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Número do processo associado"
              placeholderTextColor="#888"
              value={numeroProcesso}
              onChangeText={setNumeroProcesso}
            />
          </View>

          {/* Dropdown Tipo de Documentação */} 
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Documentação</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownOpen(!dropdownOpen)}
            >
              <Text style={{ color: tipoSelecionado ? "#333" : "#888" }}>
                {tipoSelecionado || "Selecione o tipo"}
              </Text>
              <Feather name="chevron-down" size={20} color="#888" />
            </TouchableOpacity>
            {dropdownOpen && (
              <View style={styles.dropdownList}>
                {tipos.map(t => (
                  <TouchableOpacity
                    key={t}
                    style={styles.dropdownItem}
                    onPress={() => { setTipoSelecionado(t); setDropdownOpen(false); }}
                  >
                    <Text style={styles.dropdownItemText}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Botões de Anexar Documentos - Condicionais */} 
          {botoesParaMostrar.length > 0 && (
            <View style={[
              styles.attachmentButtonsContainer,
              isTodosSelected && styles.attachmentButtonsContainerGrid
            ]}>
              {botoesParaMostrar.map(t => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.anexarButton,
                    isTodosSelected && styles.anexarButtonSmall,
                    documentosAnexados[t] && styles.anexarButtonAttached
                  ]}
                  onPress={() => anexarDocumento(t)}
                >
                  <MaterialCommunityIcons 
                    name={icones[t] || "file-document-outline"} 
                    size={isTodosSelected ? 16 : 20} 
                    color="#FFFFFF" 
                    style={{ marginRight: isTodosSelected ? 4 : 8 }} 
                  />
                  <Text style={[
                    styles.anexarButtonText,
                    isTodosSelected && styles.anexarButtonTextSmall
                  ]}>
                    {documentosAnexados[t] ? `${t} ✅` : `${t}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Botão Cadastrar Documento */} 
          <TouchableOpacity style={styles.submitButton} onPress={handleCadastrarDocumento}>
            <Text style={styles.submitButtonText}>Cadastrar Documento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#E0F2F7", // Fundo azul claro
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF", // Fundo branco para o header
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingTop: 40, // Ajuste para status bar
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginRight: 34, // Compensar o botão de voltar para centralizar
  },
  headerLogo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007BFF",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  formCard: {
    width: width * 0.9, // 90% da largura da tela para um visual mais compacto
    maxWidth: 600, // Limite máximo para telas maiores, mantendo-o "quadriculado"
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
    fontWeight: "500",
  },
  rowInputWithButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    color: "#333",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#F9F9F9",
    padding: 12,
    borderRadius: 8,
    position: "relative", // Adicionado para que o zIndex funcione corretamente
    zIndex: 1, // Garante que o dropdown base esteja acima dos elementos abaixo dele
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginTop: 5,
    position: "absolute",
    width: "100%",
    zIndex: 1000, // Aumentado para garantir que o dropdown fique acima de outros elementos
    top: "100%", // Posiciona o dropdown logo abaixo do botão
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dropdownItemText: {
    color: "#333",
    fontSize: 16,
  },
  attachmentButtonsContainer: {
    flexDirection: "column", // Padrão: coluna para um botão
    marginTop: 10,
    marginBottom: 20,
  },
  attachmentButtonsContainerGrid: {
    flexDirection: "row", // Grid para múltiplos botões pequenos
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  anexarButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%", // Botão grande ocupa largura total
    justifyContent: "flex-start", // Alinha o conteúdo à esquerda
  },
  anexarButtonSmall: {
    width: "48%", // Botões pequenos ocupam ~48% da largura (2 por linha)
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "center", // Centraliza o conteúdo nos botões pequenos
  },
  anexarButtonAttached: {
    backgroundColor: "#28A745", // Verde para anexado
  },
  anexarButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  anexarButtonTextSmall: {
    fontSize: 12, // Texto menor para botões pequenos
  },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
