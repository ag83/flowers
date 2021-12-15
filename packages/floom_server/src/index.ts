import app from './app';

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}`); 
});

app.on('error', console.error);