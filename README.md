## Run app

- run `docker compose up -d`
- open `http://localhost:3512/`

## Run tests

- run `docker exec -it sales-client-1 npm run test`

## Few notes

- I added cart discount calculation logic in the client because of job position, but in the real case I would prefer do it on the backend and expose cart endpoint
- I did not implement adding products to the cart, instead I'm fetching all product to the cart on render. In order to test cart with different products, please delete those you don't need
- I did not implement separate state management tool because of small size of an app, but I understand that in real case having state management is better. Also I did not put cart items into context, but just drill props. It's not perfect, I know, but I spend most time for discount logic, so there are place so some refactoring
- I added tests only for cart price calculation based on discount logic. It would be also good to add UI tests for Cart behavior using React testing library