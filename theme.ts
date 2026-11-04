import { StyleSheet } from 'react-native';

// cores do app, num lugar só (tema escuro com rosa, como o app de referência)
export const COLORS = {
  background: '#0B0B0D',
  header: '#16161A',
  card: '#17171B',
  border: '#2A2A31',
  text: '#EDEDEF',
  muted: '#9A9AA3',
  placeholder: '#6B6B73',
  primary: '#FF2D6B',
  error: '#FF5C7A',
};

// estilos repetidos em várias telas (formulário e botões)
export const common = StyleSheet.create({
  // tela com o conteúdo centralizado na vertical
  centered: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 24, justifyContent: 'center' },
  title: { color: COLORS.primary, fontSize: 24, fontWeight: 'bold' },
  subtitle: { color: COLORS.muted, fontSize: 12, marginTop: 4, marginBottom: 28 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: COLORS.text,
    fontSize: 14,
    marginBottom: 10,
  },
  // botão principal: rosa, em formato de pílula
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 14,
  },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  // botão secundário: só a borda
  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 10,
  },
  outlineButtonText: { color: COLORS.text, fontSize: 13, fontWeight: 'bold' },
  error: { color: COLORS.error, fontSize: 13, marginTop: 12, textAlign: 'center' },
  link: {
    color: COLORS.muted,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 18,
  },
});
