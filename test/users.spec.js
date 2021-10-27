const { it } = require("mocha");
const sinon = require('sinon');
const request = require('supertest');
const {ServerUp} = require('../src/server');
const database = require('../src/database/index');
const dbUsers = require('../src/controllers/dbOperations/user');
const dbAgenda = require ('../src/controllers/dbOperations/agenda');
const { expect } = require("chai");



describe('POST /api/v1/usuarios/signin', () => {

    ////////////////////////////////////////////
    //Arrange

    before(() => {

        //Forzamos el comportamiento de vFindOne
        //Que haga algo la primera llamada
        //Que haga algo la segunda llamada

        const vFindOne = sinon.stub();
        vFindOne.onCall(0).returns(null);
        vFindOne.onCall(1).returns(null);
    
        //El modelo falso que vamos a usar con sus respectivos metodos
        const ModeloFalso = {
          //Metodo 1
          findAll() {
            return Promise.resolve([
              {
                id: 1,
              },
            ]);
          },
          //Metodo 2
          findOne: vFindOne,
          //Metodo 3
          create: sinon.mock().atLeast(1).returns({dataValues:{id:"test"}}), // Vamos a ver que va rtornar
        };

        //Stub a la funcioón getModel
        //No se puede usar destructoring
        sinon.stub(database, 'getModel').returns(ModeloFalso);
    });

   
    it("Probamos el signin", (done) =>{

        ////////////////////////////////////////////
        //Act

        const server = ServerUp();

        const fakeUser = {
          username: "test",
          name: "test",
          email: "test3@gmail.com",
          address: "test",
          password: "test"
        }

        ////////////////////////////////////////////
        //Assert

        request(server)
            .post('/api/v1/usuarios/signin')
            .send(fakeUser)
            .expect('Content-Type', /json/)
            .expect(201)
            .expect({"Message": `El usuario ha sido creado - userId: test`})
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            });
    })
    
})

