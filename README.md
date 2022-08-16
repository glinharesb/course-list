## Links

Site em produção (Vercel): https://course-list-glinharesb.vercel.app/

API em produção (Heroku): https://platos-db.herokuapp.com/

## Ferramentas

- Node.js 16.15.0
- Yarn 1.22.18
- Next.js (TypeScript, ESLint)
- Chakra UI
- Cypress

## Executando o projeto localmente

Execute o seguindo comando para instalar os pacotes:

```bash
npm install
# ou
yarn install
```

Execute o seguindo comando para iniciar o modo desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Por último, abra o link [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## API local

Para rodar a API localmente instale o json-server:

```bash
npm install -g json-server
# ou
yarn global add json-server
```

Execute com o seguinte comando:

```bash
npm run db
# ou
yarn db
```

Troque a constante `API_URL` no arquivo `/src/shared/constants.ts` para a seguinte URL:

```bash
http://localhost:8000
```

## Testes

Criei apenas dois testes utilizando o Cypress. Para rodar execute o seguinte comando:

```bash
npm run cypress
# ou
yarn cypress
```

## Pontos a melhorar

- Implementar testes unitários
- Implementar mais testes e2e (e melhores)
- Dividir os componentes em componentes menores
- Estilizar os Toasts de acordo com o layout
- Customizar mais o tema do Chakra UI e criar variantes para os componentes
- Trocar o fetch por useSWR
- Colocar transições (CSS) nos componentes
