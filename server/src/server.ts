import express, { response } from 'express';

const app = express();

app.use(express.json());

app.post('/usuarios', (request, response) => {
    console.log(request.body);

    const users = [
        { nome: "Leo", idade: 21},
        { nome: "Saci", idade: 13},
];

    return response.json(users);
});

app.listen(3333);