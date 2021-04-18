let server;

export const mochaGlobalSetup = async () => {
  server = await startSomeServer({port: process.env.MONGODB_URL});
  console.log(`server running on port ${server.port}`);
};

export const mochaGlobalTeardown = async () => {
  await server.stop();
  console.log('server stopped!');
};