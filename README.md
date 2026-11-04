# Catálogo de músicas · Checkpoint 3 (Mobile Development & IoT)

App Expo com login, cadastro, 100 mil músicas e a tela de detalhe de cada uma.
Usa um stack (React Navigation), AsyncStorage e FlatList.

## Como rodar

```bash
npm install
npx expo start
```

Depois leia o QR code com o Expo Go (ou aperte `a` para o emulador Android).

## Estrutura

| Arquivo | O que faz |
|---------|-----------|
| `App.tsx` | monta o stack com as 5 telas; abre na Home se já houver sessão |
| `types.ts` | tipos `Music`, `Genre` (do kit), `RootStackParamList`, `Account`, `RegisterForm` |
| `storage.ts` | todas as leituras e escritas no AsyncStorage (conta e sessão) |
| `theme.ts` | cores e estilos compartilhados |
| `data/musics.ts` | gerador das 100 mil músicas (kit, sem alterações) |
| `screens/LoginScreen.tsx` | login conferindo contra a conta guardada |
| `screens/RegisterScreen.tsx` | cadastro com validação (campos obrigatórios, senha mínima de 6, confirmação) |
| `screens/HomeScreen.tsx` | mostra quem está logado, VER MÚSICAS e SAIR |
| `screens/ListScreen.tsx` | a lista com FlatList (no kit era ScrollView + map) |
| `screens/DetailScreen.tsx` | detalhe da música, PRÓXIMA MÚSICA, VOLTAR e INÍCIO |
| `RESPOSTAS.md` | as 9 transições de navegação explicadas |
