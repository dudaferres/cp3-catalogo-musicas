# RESPOSTAS · Checkpoint 3 · as 9 transições

Para cada transição: a ação escolhida, o que acontece com o stack e o que o botão voltar faz depois.
O contador "telas no stack" do Detalhe (`navigation.getState().routes.length`) confirma as contas.

1. **Login → Cadastro:** `navigate('Register')`. O Cadastro entra por cima do Login, que continua vivo embaixo (stack: Login, Cadastro). O voltar tira o Cadastro e mostra o Login de novo, porque quem abriu o cadastro por engano precisa conseguir voltar.

2. **Cadastro → Home (no OK do Alert):** `popToTop()` e depois `replace('Home')`. O `popToTop` desmonta o Cadastro e deixa só o Login; o `replace` troca esse Login pela Home. O stack fica só com a Home, então o voltar fecha o app em vez de mostrar formulário de cadastro ou login de quem já entrou.

3. **Login → Home:** `replace('Home')`. A Home toma o lugar do Login, que é desmontado (stack: Home). Depois de entrar, o voltar fecha o app: não faz sentido voltar para a tela de login estando logado.

4. **Home → Lista:** `navigate('List')`. A Lista entra por cima da Home, que continua viva embaixo (stack: Home, Lista). O voltar tira a Lista e mostra a Home como estava.

5. **Lista → Detalhe:** `navigate('Detail', { music })`. O Detalhe entra por cima da Lista levando a música tocada como parâmetro, e a tela lê em `route.params.music` (stack: Home, Lista, Detalhe = 3). O voltar tira o Detalhe e a Lista aparece na mesma posição de rolagem.

6. **Detalhe → PRÓXIMA MÚSICA:** `push('Detail', { music: nextMusic(music) })`. Entra mais um Detalhe por cima, mesmo sendo a mesma rota (stack: 4, 5, ...). Usamos `push` porque `navigate` só trocaria o parâmetro do Detalhe da frente, e aí o voltar não traria a música anterior. Com `push`, o voltar mostra a música anterior.

7. **Detalhe → VOLTAR:** `goBack()`. A tela de cima (este Detalhe) é desmontada e aparece a de baixo: a música anterior, ou a Lista se este era o primeiro Detalhe. Fica uma tela a menos no stack.

8. **Detalhe → INÍCIO:** `popToTop()`. Todas as telas acima da primeira são desmontadas de uma vez (todos os Detalhes e a Lista), e sobra só a Home, que é a primeira do stack depois do login. Não há mais para onde voltar: o voltar fecha o app.

9. **Home → SAIR:** primeiro apagamos a sessão no AsyncStorage (`removeItem('session')`), depois `replace('Login')`. O Login toma o lugar da Home, que é desmontada (stack: Login). O voltar fecha o app, então não dá para trazer a Home de volta depois de sair.

**Extra (abrir com sessão guardada):** o `App.tsx` lê a sessão antes de montar o stack e usa `initialRouteName` para começar na Home. O stack começa só com a Home, então INÍCIO (`popToTop`) e SAIR (`replace('Login')`) continuam funcionando igual.
