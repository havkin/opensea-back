import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Web3 from 'web3';
// import { OpenSeaPort, Network, EventType } from 'opensea-js';

async function bootstrap() {
  const web3 = new Web3(
    'https://rinkeby.infura.io/v3/e4e21ad7acef4df2beb53ec965feb838',
  );
  console.log('🚀 ~ web3', web3.eth);
  const subscription = web3.eth
    .subscribe('pendingTransactions', function (error, result) {
      if (!error) console.log(result);
    })
    .on('data', function (transaction) {
      console.log(transaction);
    });

  // const seaport = new OpenSeaPort(
  //   new Web3.providers.HttpProvider(
  //     'https://rinkeby.infura.io/v3/e4e21ad7acef4df2beb53ec965feb838',
  //   ),
  //   {
  //     networkName: Network.Rinkeby,
  //   },
  // );
  // seaport.addListener(EventType.CreateOrder, ({ order, accountAddress }) => {
  //   console.info('create', { order, accountAddress });
  // });
  // seaport.addListener(EventType.CancelOrder, ({ order, accountAddress }) => {
  //   console.info('cancel');
  // });
  const app = await NestFactory.create(AppModule);
  await app.listen(3003);
}
bootstrap();
