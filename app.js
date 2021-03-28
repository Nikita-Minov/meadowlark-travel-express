const express = require('express');
const exphbs = require('express-handlebars');
const port = process.env.PORT || 3001;
const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

const fortunes = [
    'Победи свои страхи, или они победят тебя',
    'Рекам нужны истоки',
    'Не бойся неведомого',
    'Тебя ждёт приятный сюрприз',
    'Будь проще везде, где только можно'
]

app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)];
    res.render('about', {fortune: randomFortune});
});

app.use((req, res) => {
    res.status(404);
    res.render('404')
});

app.use((err, req, res) => {
   console.error(err.message);
   res.status(500);
    res.render('500')
});

app.listen(port, () => console.log(
    `Express запущен на https://localhost:${port};` +
    `нажмите Ctr+C для завершения.`
));