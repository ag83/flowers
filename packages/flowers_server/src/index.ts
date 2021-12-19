import app from './app';
import { autoFill } from './flowers/utilities';
import { SERVER_PORT } from "@flowers/common/constants/constants";


app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`);
    autoFill(); 
});

app.on('error', console.error);