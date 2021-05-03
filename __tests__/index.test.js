import buildApp from '../server/index.js';

test('get /', async () => {
  const app = buildApp({ port: 5000 });
  console.log('1', app.inject);
  const response = await app.inject({
    url: '/',
  });
  expect(response.statusCode).toEqual(200);
});
