# 📓 Projeto-GRUAPIM

#### Projeto da disciplina "Desenvolvimento para Dispositivos Móveis" (GRUDSMV) - IFSP Guarulhos

# 📖 Tema 7 – Aplicação para Journaling

## 👥 HISTÓRIA DE USUÁRIO

### 📅 ÉPICO 1: Calendário Pessoal:

Disponibilizar um calendário onde os usuários possam gerenciar suas atividades e inserir tarefas.

- **História de Usuário (US01):** Eu, como usuário, gostaria de inserir tarefas e eventos diretamente no meu calendário pessoal, a fim de ter uma visão holística do meu tempo disponível e das minhas obrigações futuras.

- **Contexto:** As pessoas lidam com uma multiplicidade de demandas que causam desorganização. O calendário ajuda o usuário a manter-se focado e organizado em suas prioridades diárias, semanais e mensais

- **Critérios de Aceitação:**
  - O usuário deve poder selecionar uma data e adicionar um evento ou tarefa.
  - O sistema deve disponibilizar visualizações por dia, semana e mês.
  - Eventos passados e futuros devem ser exibidos de forma clara e visualmente distinguíveis no calendário.

### 🗂️ ÉPICO 2: Gestão de Projetos

Permitir a criação e o gerenciamento de projetos pessoais, com atribuição de tarefas e prazos.

- **História de Usuário (US02):** Eu, como usuário, gostaria de criar projetos pessoais e associar tarefas individuais a eles com prazos de entrega (deadlines), a fim de ter uma organização estruturada e contextualizada das minhas atividades maiores.

- **Contexto:** Muitos usuários utilizam várias ferramentas dispersas para gerenciar projetos. Trazer isso para a plataforma centraliza a gestão, permitindo definir metas, acompanhar o progresso e alcançar objetivos.

- **Critérios de Aceitação:**
  - ​O usuário deve poder criar um projeto inserindo título, descrição e prazo de conclusão.
  - O usuário deve poder criar tarefas e vinculá-las diretamente a um projeto existente.
  - A tela do projeto deve exibir o progresso com base na conclusão das tarefas associadas a ele.

### ✅ ÉPICO 3: Todo Lists e Tarefas

Criação de listas de tarefas para dividir atividades em etapas gerenciáveis e permitir priorização.

- **História de Usuário (US03):** Eu, como usuário, gostaria de criar listas de tarefas (todo lists), com suporte a categorização e priorização, a fim de dividir minhas atividades em etapas menores e manter meu foco nas ações mais importantes e urgentes.

- **Contexto:** O excesso de tarefas não estruturadas gera estresse. Dividir as obrigações em listas gerenciáveis aumenta a clareza mental e a eficiência.

- **Critérios de Aceitação:**
  - O usuário deve poder criar uma tarefa com título e descrição.
  - O usuário deve poder atribuir um nível de prioridade (ex: Alta, Média, Baixa) a cada tarefa.
  - O sistema deve permitir a criação e atribuição de categorias ou tags customizadas às tarefas.

### 📝 ÉPICO 4: Anotações e Diário Digital

Sistema para registro de pensamentos e reflexões integrados a datas.
​
- **História de Usuário (US04):** Eu, como usuário, gostaria de registrar pensamentos, reflexões e insights em um diário digital e associá-los a datas específicas, a fim de revisitar de forma organizada o meu progresso, promover o autoconhecimento e reduzir o meu estresse.

- **Contexto:** Escrever regularmente sobre sentimentos e metas é fundamental para a clareza mental e redução da sobrecarga de informações da sociedade complexa.

- **Critérios de Aceitação:**
  - O sistema deve fornecer um editor de texto para criação de notas e entradas de diário.
  - Toda anotação deve ser associada a uma data, permitindo ao usuário escolher a data atual ou uma data retroativa/futura. O usuário deve poder consultar o histórico de anotações organizadas cronologicamente.

### 🧩 ÉPICO 5: Visualização Integrada

Visão unificada de todas as informações da plataforma no calendário.

- **História de Usuário (US05):** Eu, como usuário, gostaria de visualizar minhas tarefas, prazos de projetos e anotações integrados de forma simultânea no calendário, a fim de acessar facilmente todas as informações relevantes em um único local coeso.

- **Contexto:** A dispersão de informações dificulta o acompanhamento eficiente. Esta funcionalidade cria a solução centralizada prometida pela aplicação, facilitando o acesso aos compromissos.

- **Critérios de Aceitação:**
  - A interface do calendário deve exibir ícones ou marcadores distintos para tarefas, eventos, prazos de projetos e anotações de diário no mesmo painel.
  - ​Ao clicar em um item integrado no calendário, o sistema deve abrir um modal ou direcionar para a tela de detalhes correspondente.

### 📱 ÉPICO 6: Sincronização e Acesso Móvel

Garantir o acesso contínuo por meio de sincronização de dados e plataformas móveis.

- **História de Usuário (US06):** Eu, como usuário, gostaria de acessar a plataforma através de um aplicativo móvel (smartphone/tablet) com sincronização de dados em nuvem, a fim de poder registrar e consultar minhas informações convenientemente, independentemente de onde eu estiver.

- **Contexto:** Devido à tendência crescente de digitalização, os usuários precisam que o journaling seja acessível em múltiplos dispositivos e integrado à sua vida cotidiana de forma conveniente.

- **Critérios de Aceitação:**
  - Quaisquer alterações (criação, edição, exclusão) feitas via navegador web devem refletir instantaneamente no aplicativo móvel, e vice-versa.
  - O aplicativo deve manter a usabilidade completa em telas de smartphones e tablets.

### ⚙️ ÉPICO 7: Personalização, Flexibilidade e Feedback

Permitir a personalização das configurações e fornecer feedback para melhoria de produtividade.

- **História de Usuário (US07):** Eu, como usuário, gostaria de personalizar as configurações de exibição do meu calendário e receber feedback automatizado sobre a conclusão de minhas atividades, a fim de adaptar a ferramenta às minhas preferências individuais e identificar áreas de melhoria na minha produtividade.

- **Contexto:** Plataformas rígidas não atendem a todos. Ajustar a plataforma às necessidades do usuário e oferecer feedback automatizado auxilia na eficácia para alcançar objetivos e metas.

- **Critérios de Aceitação:**
  - O usuário deve poder configurar preferências de exibição do calendário (ex: primeiro dia da semana, esquemas de cores).
  - O sistema deve apresentar um painel ou enviar notificações com o progresso de conclusão de tarefas e projetos, auxiliando o usuário a medir sua eficiência.
 
---

## 🚀 Como Executar o Projeto (Ambiente de Desenvolvimento)

Para facilitar o desenvolvimento e garantir a padronização do ambiente para toda a equipe, a infraestrutura deste projeto foi 100% containerizada utilizando Docker.

### Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose instalados.
- [Git](https://git-scm.com/) para clonar o repositório.

### Passo a Passo

### 1. Clone o repositório:

  ```bash
  git clone [https://github.com/lucas-oliveirah17/Projeto-GRUAPIM.git](https://github.com/lucas-oliveirah17/Projeto-GRUAPIM.git)
  cd Projeto-GRUAPIM
  ```

### 2. Inicie os containers:

Na raiz do projeto (onde está o arquivo docker-compose.yml), execute o comando abaixo. A flag --build garante que as imagens do backend e frontend sejam construídas com o código mais recente.

  ```bash
  docker compose up -d --build
  ```

### 3. Acesse a aplicação:

Com os containers em execução, os serviços estarão disponíveis nas seguintes portas:

- **Frontend (React + Vite):** http://localhost:5173 (Hot Reload ativo via mapeamento de volume)

- **Backend (API Spring Boot):** http://localhost:8080

- **Banco de Dados (PostgreSQL):** http://localhost:5433 (Verifique as credenciais no docker-compose.yml)

### Como parar a aplicação

Para interromper a execução e remover os containers, execute na raiz do projeto:

  ```bash
  docker compose down
  ```

---

## ​🗺️ PLANEJAMENTO DE IMPLEMENTAÇÃO (Roadmap de Sprints)

O desenvolvimento do MVP será estruturado em um ciclo de 2 Sprints (com duração de uma semana cada), visando entregar valor contínuo e progressivo, começando pela fundação do sistema até atingir a integração e mobilidade total. O trabalho ocorrerá em paralelo, com dois desenvolvedores atuando simultaneamente.

| Sprint | Prioridade | Atuando | Épico(s) Abordado(s) | História(s) de Usuário | Foco da Entrega no MVP |
| :---: | :---: | :---: | :--- | :---: | :--- |
| **Sprint 1** | Alta | Lucas | Todo Lists e Tarefas <br><br> Calendário Pessoal (Início) | US03 <br><br> US01 (Estrutura Básica) | Infraestrutura inicial, garantia de privacidade de dados (RNF2), criação de usuário e o motor básico de criação, priorização e categorização de tarefas. |
| **Sprint 1** | Alta | Daniel | Calendário Pessoal (Fim) <br><br> Anotações e Diário Digital | US01 (Visões) <br><br> US04 | Visualizações completas do calendário (diária/semanal/mensal) e implementação do editor de texto para o diário digital atrelado a datas |
| **Sprint 2** | Média | Lucas | Gestão de Projetos <br><br> Visualização Integrada | US02 <br><br> US05 | Agrupamento de tarefas em projetos com deadlines e o motor visual que renderiza todas as entidades (tarefas, projetos, diário) na visualização unificada do calendário. |
| **Sprint 2** | Baixa | Daniel | Personalização e Flexibilidade <br><br> Sincronização e Acesso Móvel | US07 <br><br> US06 | Finalização da interface responsiva e mobile (RNF1), painéis de feedback automatizado de produtividade e preferências visuais de personalização do usuário. |


---

## 🎓 Autores

- **Daniel Navarro Porto**

  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=plastic&logo=github&logoColor=white)](https://github.com/danielnporto)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielnporto/)

- **Lucas Silva de Oliveira**
   
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=plastic&logo=github&logoColor=white)](https://github.com/lucas-oliveirah17)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=plastic&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lucas-oliveirah17/)
