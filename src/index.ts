import logger from './infrastructure/logger/logger';
import restServer from './infrastructure/presentation/rest';
import dotenv from 'dotenv';

dotenv.config();

async function main () {
  try {
    const port = '5050';
    restServer.listen({ port }, () => {
      logger.info(`Rest server ready at port ${port}`);
    });

    logger.info('Kanon Gaming Back-End Started');
  } catch (error) {
    logger.error('Exception during service startup', error);
  }
}

main();