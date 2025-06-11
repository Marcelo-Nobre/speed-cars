# Speed Cars

Aplicação móvel desenvolvida com React Native e Expo para consulta de marcas e modelos de carros utilizando a API FIPE. O app possui autenticação de usuário e interface moderna.

## Funcionalidades

- Autenticação de usuário (login/logout)
- Navegação entre marcas de carros
- Busca de marcas com filtro em tempo real
- Visualização de modelos por marca
- Busca de modelos com filtro em tempo real
- Design responsivo com tratamento de área segura

## Tecnologias

- React Native
- Expo Router
- TypeScript
- Styled Components
- React Hook Form
- Zod (validação de formulários)
- Axios
- AsyncStorage
- Context API
- Jest
- Testing Library React Native

## Estrutura do Projeto

```
src/
  ├── app/              # Telas do Expo Router
  ├── components/       # Componentes reutilizáveis
  ├── context/         # Gerenciamento de estado global
  ├── features/        # Módulos baseados em funcionalidades
  ├── services/        # Serviços de API
  └── styles/          # Estilos globais
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
EXPO_PUBLIC_API_URL_SIGN_IN="https://test-api-y04b.onrender.com/"
EXPO_PUBLIC_API_URL_FIPE_CARS="https://parallelum.com.br/fipe/api/v1/carros/"
```

## Como Iniciar

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` com as variáveis de ambiente necessárias
4. Inicie o servidor de desenvolvimento:
```bash
npx expo start
```

## Scripts Disponíveis

- `npx expo start` - Inicia o servidor de desenvolvimento Expo
- `npm run android` - Executa no dispositivo/emulador Android
- `npm run ios` - Executa no simulador iOS
- `npm test` - Executa os testes

## Autenticação

O app utiliza sistema de autenticação baseado em token com AsyncStorage para persistência. As credenciais de login são validadas através do endpoint da API de autenticação.

## Integração com APIs

- API de Autenticação: Login e autenticação de usuário
- API FIPE: Base de dados brasileira de preços de veículos para dados de marcas e modelos de carros
