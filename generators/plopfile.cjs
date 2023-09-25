/* eslint-disable func-names */
module.exports = function (plop) {
  // cria um novo componente
  plop.setGenerator('Novo Componente', {
    description: 'Gerador para criar um novo componente React',
    prompts: [
      {
        type: 'input',
        name: 'model',
        message: 'Qual o nome do model',
      },

      {
        type: 'input',
        name: 'service',
        message: 'Qual o nome do service',
      },

      {
        type: 'input',
        name: 'vm',
        message: 'Qual o nome da variavel model',
      },

      // {
      //   type: 'input',
      //   name: 'rota',
      //   message: 'Qual o nome da rota',
      // },

      {
        type: 'list',
        name: 'tipoAcao',
        message: 'Qual tipo de ação você quer criar?',
        choices: ['service', 'full-api', 'irepository', 'repository'],
      },
    ],
    actions(dados) {
      let actions = [];

      // adiciona uma ação com base na escolha do usuário
      if (dados.tipoAcao === 'service') {
        actions = [
          {
            type: 'add',
            path: '../src/modules/{{model}}/services/{{service}}.ts',
            templateFile: 'templates/service.ts.hbs',
          },
        ];
      } else if (dados.tipoAcao === 'full-api') {
        actions = [
          {
            type: 'add',
            path: '../src/modules/{{model}}/services/{{service}}.ts',
            templateFile: 'templates/service.ts.hbs',
          },

          {
            type: 'add',
            path: '../src/modules/{{model}}/repositories/models/{{model}}PrismaRepository.ts',
            templateFile: 'templates/repository.ts.hbs',
          },

          {
            type: 'add',
            path: '../src/modules/{{model}}/repositories/IRepository/I{{model}}Repository.ts',
            templateFile: 'templates/IRepository.ts.hbs',
          },

          {
            type: 'add',
            path: '../src/modules/{{model}}/http/controller/{{model}}Controller.ts',
            templateFile: 'templates/controler.ts.hbs',
          },

          {
            type: 'add',
            path: '../src/modules/{{model}}/http/routes/{{vm}}.ts',
            templateFile: 'templates/routes.ts.hbs',
          },

          {
            type: 'add',
            path: '../src/modules/{{model}}/http/routes/index.ts',
            templateFile: 'templates/index.route.ts.hbs',
          },
        ];
      } else if (dados.tipoAcao === 'page-app') {
        actions = [
          {
            type: 'add',
            path: '../src/pages/{{name}}/index.tsx',
            templateFile: 'templates/index.tsx.hbs',
          },

          {
            type: 'add',
            path: '../src/pages/{{name}}/styles.ts',
            templateFile: 'templates/styles.ts.hbs',
          },
        ];
      }

      return actions;
    },
  });
};
