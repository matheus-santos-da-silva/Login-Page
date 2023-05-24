* Projeto de uma Login-Page com foco mais no back-end: 
    Tecnologias usadas: 
        -  JavaScript
        -  NodeJS
        -  Express
        -  Handlebars
        -  MySQL
        -  CSS

* Utilizei o express-handlebars para fazer a parte do front-end com as views, e também a
conexão do back-end com o front-end.

* Ainda na parte do front-end, utilizei o CSS puro para fazer a estilização básica do projeto.
Como eu falei, o projeto tem o foco no back-end, então não me estendi muito acerca da estilização,
e questões como resposividade e etc.

* O projeto conta com ferramentas de autenticação feitas com o express-session. Ao se registrar,
ou se logar, o usuário tem sua sessão iniciada, podendo depois encerrar sua sessão através da rota
de logout.

* O projeto conta também com a proteção de rotas privadas, ou seja, usei como exemplo a rota de logout,
você só consegue acessar a rota de logout se estiver com uma sessão iniciada, ou seja, se estiver logado.
    Se vc não estiver logado e tentar acessar a rota de logout, a página te redirecionará para a rota de login.