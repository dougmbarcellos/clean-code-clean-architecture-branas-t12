# Backend

### MongoDB

Para rodar o mongo localmente, deve ser utilizado os seguinte passos simulando um Replica Set:

- Executar `mongod`.
- Em outro terminal, executar `mongosh` e depois os comandos abaixo
  - `> use local`
  - `> db.dropDatabase()`
  - Manter o `mongosh` em execução.
- Parar o comando `mongod` e rodar `mongod --replSet rs0 --bind_ip 127.0.0.1 --port 27017`.
- No `mongosh`, rodar `rs.initiate()` para inicializar o Replica Set.
