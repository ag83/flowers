import app from './app';
import { autoFill } from './flowers/utilities';

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    autoFill(); 
});

app.on('error', console.error);