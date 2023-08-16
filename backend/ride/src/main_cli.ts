import CreatePassenger from './application/usecases/CreatePassenger';
import CLIController from './infra/cli/CLIController';
import NodeInputOutput from './infra/cli/NodeInputOutput';
import MongoClientAdapter from './infra/database/MongoClientAdapter';
import PassengerRepositoryDatabase from './infra/repository/PassengerRepositoryDatabase';

// Main composition root
const connection = new MongoClientAdapter();
const passengerRepository = new PassengerRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRepository);
const inputOutput = new NodeInputOutput();
new CLIController(inputOutput, createPassenger);
