# 🎵 Catálogo de Músicas · Checkpoint 3
 
App mobile feito com **Expo + React Native + TypeScript** para o Checkpoint 3 da disciplina **Mobile Development & IoT** (FIAP, Prof. Paulo Reis).
 
O app tem login, cadastro, um catálogo com **100 mil músicas** e a tela de detalhe de cada uma. Ele usa navegação em **stack**, guarda a conta no celular com **AsyncStorage** e mostra a lista com **FlatList**, que não trava.
 
---
 
## 👥 Integrantes
 
| Nome | RM |
|------|----|
| Maria Eduarda Ferrés | 560418 |
| Gabriela Queiroga Cocuzza da Silva | 560035 |
| Rafael Mandel | 560333 |
| Felipe Silva do Prado Lima | 559848 |
| Davi Corrêa Paião | 560438 |
 
---
 
## ▶️ Como rodar
 
Pré-requisitos: [Node.js](https://nodejs.org) (versão LTS) e o app **Expo Go** no celular (Play Store ou App Store).
 
```bash
git clone https://github.com/dudaferres/cp3-catalogo-musicas.git
cd cp3-catalogo-musicas
npm install
npx expo start
```
 
Depois, leia o QR code que aparece no terminal:
- **Android:** pelo app Expo Go, em *Scan QR code*
- **iPhone:** pela câmera do celular
O celular e o computador precisam estar na mesma rede Wi-Fi. Se não conectar, use `npx expo start --tunnel`.
 
> No Windows, se o PowerShell bloquear o `npm` ("execução de scripts foi desabilitada"), rode os comandos no **Prompt de Comando (cmd)**.
 
---
 
## 📱 Telas
 
| Tela | O que tem | O que faz |
|------|-----------|-----------|
| **Login** | usuário, senha, ENTRAR e o link "Não tem conta? Cadastre-se" | confere usuário e senha contra a conta guardada e entra |
| **Cadastro** | usuário, senha, confirmação e CADASTRAR | valida, guarda a conta, mostra um Alert e o OK leva à Home |
| **Home** | "Olá, nome", VER MÚSICAS e SAIR | abre a lista; SAIR apaga a sessão e volta ao login |
| **Lista** | as 100 mil músicas, em FlatList | tocar numa música abre o Detalhe dela |
| **Detalhe** | gênero, título, artista, ano, duração, PRÓXIMA MÚSICA, VOLTAR e INÍCIO | PRÓXIMA abre a música seguinte; INÍCIO volta direto à Home |
 
Todas as telas usam só componentes nativos (`View`, `Text`, `TextInput`, `TouchableOpacity`, `FlatList`) e `StyleSheet`, sem biblioteca de componentes.
 
---
 
## ✅ Regras do cadastro e do login
 
**Cadastro**
- Usuário, senha e confirmação são obrigatórios
- A senha precisa ter **no mínimo 6 caracteres**
- A confirmação precisa ser igual à senha
- O erro aparece na tela, embaixo do formulário, e nada é salvo
- No sucesso: (1) a conta é guardada no AsyncStorage, (2) aparece um `Alert.alert` "Conta criada" e (3) o **OK** leva à Home
**Login**
- Confere contra a conta guardada no AsyncStorage. **Não existe nenhuma credencial escrita no código**
- Sem conta cadastrada, ou com usuário/senha errados, o app mostra o erro e não entra
- Ao entrar, a sessão (quem está logado) é guardada, e a Home mostra o nome
**SAIR** apaga a sessão e volta ao login. Depois de sair, o botão voltar não traz a Home de volta.
 
**Extra:** se o app for aberto com uma sessão guardada, ele entra direto na Home.
 
### Chaves no AsyncStorage
 
| Chave | Conteúdo |
|-------|----------|
| `account` | a conta cadastrada, em JSON: `{ "username": "...", "password": "..." }` |
| `session` | o nome de quem está logado (apagado no SAIR) |
 
> O AsyncStorage não é criptografado. Para este exercício ele serve; num app real, a senha iria para o SecureStore.
 
---
 
## ⚡ Da ScrollView para a FlatList
 
O kit da disciplina trazia a Lista com `ScrollView` + `map`. Assim, o app tenta montar as 100 mil músicas de uma vez, e a tela nunca aparece.
 
Convertemos para `FlatList`, com:
- `data={MUSICS}`: o array com as músicas
- `keyExtractor={(music) => music.id}`: uma chave estável por música (o id, nunca a posição)
- `renderItem` tipado com `ListRenderItemInfo<Music>`
A FlatList só monta as linhas que estão perto da tela e vai montando as próximas conforme a rolagem. Por isso as 100 mil músicas abrem na hora.
 
---
 
## 🧭 Navegação
 
Usamos um único **stack** (`@react-navigation/native-stack`), sem tabs nem drawer.
 
| # | Transição | Ação | Stack depois | O voltar faz |
|---|-----------|------|--------------|--------------|
| 1 | Login → Cadastro | `navigate('Register')` | Login, Cadastro | volta ao Login |
| 2 | Cadastro → Home (OK do Alert) | `popToTop()` + `replace('Home')` | Home | fecha o app |
| 3 | Login → Home | `replace('Home')` | Home | fecha o app |
| 4 | Home → Lista | `navigate('List')` | Home, Lista | volta à Home |
| 5 | Lista → Detalhe | `navigate('Detail', { music })` | Home, Lista, Detalhe | volta à Lista |
| 6 | Detalhe → PRÓXIMA MÚSICA | `push('Detail', { music: next })` | + 1 Detalhe | volta à música anterior |
| 7 | Detalhe → VOLTAR | `goBack()` | − 1 tela | — |
| 8 | Detalhe → INÍCIO | `popToTop()` | Home | fecha o app |
| 9 | Home → SAIR | apaga a sessão + `replace('Login')` | Login | fecha o app |
 
A explicação de cada escolha está no **[RESPOSTAS.md](./RESPOSTAS.md)**. No Detalhe, o contador **"telas no stack"** (`navigation.getState().routes.length`) ajuda a conferir as contas.
 
---
 
## 🗂️ Estrutura do projeto
 
```
├── App.tsx                 # monta o stack com as 5 telas; abre na Home se houver sessão
├── types.ts                # Music e Genre (kit) + RootStackParamList, Account, RegisterForm
├── storage.ts              # leituras e escritas no AsyncStorage (conta e sessão)
├── theme.ts                # cores e estilos compartilhados
├── data/
│   └── musics.ts           # gerador das 100 mil músicas (kit, sem alterações)
├── screens/
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── HomeScreen.tsx
│   ├── ListScreen.tsx      # FlatList (no kit era ScrollView + map)
│   └── DetailScreen.tsx
├── RESPOSTAS.md            # as 9 transições explicadas
└── package.json            # dependências e integrantes (author / rm)
```
 
---
 
## 🛠️ Tecnologias
 
- [Expo](https://expo.dev) (SDK 58) e [React Native](https://reactnative.dev)
- TypeScript
- [React Navigation](https://reactnavigation.org): native stack
- [AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
Todas as dependências foram instaladas com `npx expo install`, para usar as versões compatíveis com o Expo Go.
 
