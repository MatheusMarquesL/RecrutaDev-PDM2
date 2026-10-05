# RecrutaDEV

Aplicativo mobile gamificado para triagem e gestão de talentos da área de tecnologia, desenvolvido como projeto da disciplina Programação para Dispositivos Móveis.

O projeto possui um modelo Freemium, com recursos básicos gratuitos e funcionalidades exclusivas para usuários do plano RecrutaDEV PRO.

## Integrantes

* Matheus Marques Larréa
* Andrey Muniz Benites
* Airton Dias Junior
* Pedro Henrique Batista Barbier

## Funcionalidades

### Tela 1 — Deck de Seleção

Funcionalidades implementadas:

* Visualização dos candidatos
* Swipe para direita: aprovar candidato
* Swipe para esquerda: descartar candidato
* Botão para aprovar candidato
* Botão para recusar candidato
* Contador de candidatos
* Avanço automático para o próximo candidato
* Animação do card durante o arraste
* Retorno do card ao centro quando o movimento não atinge o limite

Funcionalidades planejadas:

* Swipe para cima
* Duplo toque: priorizar candidato
* Toque simples: abrir informações do candidato
* Pinça: zoom na foto
* Revert: desfazer o último descarte
* Indicadores visuais de aprovação e recusa

### Tela 2 — Painel do Gerente

Funcionalidades planejadas:

* Lista de candidatos aprovados
* Lista de candidatos priorizados
* Visualização dos candidatos utilizando FlatList

## Plano Freemium

### Plano Free

* Swipes ilimitados
* Visualização básica dos candidatos
* Até 3 disparos de aprovação por sessão

### Plano RecrutaDEV PRO

* Visualização da pretensão salarial
* Análise completa do candidato
* Recurso de Revert
* Disparos ilimitados

Os recursos do plano Freemium ainda serão implementados.

## Cadastro de Candidatos

O aplicativo terá um sistema de CRUD para cadastro dos candidatos.

Dados cadastrados:

* Nome completo
* Idade
* Foto de perfil
* Linguagens de programação

Também será utilizado acesso à câmera e à galeria do dispositivo.

O sistema de cadastro e persistência dos candidatos ainda será implementado.

## Gestos e Animações

O aplicativo utiliza React Native Gesture Handler e React Native Reanimated para implementar interações por gestos e animações.

Atualmente está implementado:

* Gesto de arrastar o card
* Swipe para aprovação
* Swipe para recusa
* Rotação do card durante o arraste
* Retorno animado ao centro
* Animações utilizando valores compartilhados

As próximas interações serão adicionadas conforme a implementação das funcionalidades da aplicação.

## Prototipação

A prototipação será realizada no Figma, contendo:

* Tela de seleção
* Tela do painel do gerente
* Modal do plano PRO
* Comparação entre os planos Free e PRO

Link do Figma: https://www.figma.com/make/V7uRNd6GvIsFQDUcwVKLSV/RecrutaDEV-mobile-prototype?t=yGP5DuG66eEF4Xam-20&fullscreen=1

## Tecnologias

* React Native
* Expo SDK 57
* TypeScript
* Expo Router
* React Native Gesture Handler
* React Native Reanimated
* Figma
* GitHub

## Estrutura Atual

```text
RecrutaDEV/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── candidatos.tsx
├── components/
│   ├── CandidateCard.tsx
│   └── SwipeCard.tsx
├── data/
│   └── candidates.ts
└── README.md
```

## Estado Atual do Projeto

### Implementado

* Configuração do projeto Expo
* TypeScript
* Expo Router
* Navegação entre telas
* Tela inicial
* Tela de candidatos
* Dados de candidatos
* Card de candidato
* Sistema básico de aprovação e recusa
* Swipe horizontal
* Animações do card
* React Native Gesture Handler
* React Native Reanimated
* Configuração do GestureHandlerRootView

### Em desenvolvimento

* Indicadores visuais de aprovação e recusa
* Swipe vertical
* Sistema de candidatos aprovados
* Sistema de candidatos priorizados
* Tela do gerente
* CRUD de candidatos
* Persistência dos dados
* Integração com câmera e galeria
* Sistema Freemium
* Recursos PRO
* Revert
* Interface final

## Telas do Projeto

Os prints das telas serão adicionados após a implementação e finalização da interface.

## Demonstração

O vídeo demonstrando o funcionamento do aplicativo será adicionado posteriormente.

## Disciplina

Programação para Dispositivos Móveis

Professora: Milena Alegre

Data de entrega: 14/10/2026
