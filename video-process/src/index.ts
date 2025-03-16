import ffmpeg from 'fluent-ffmpeg';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

    app.get('/', (req, res) => {

        res.send('Anita es mi novia y me encanta');

    });

    app.post('/process-video', (req, res) => {

        //Get path of the input video file from the request body

    });

const port = process.env.PORT || 3000;

app.listen(port, () => {

    console.log(`Video Process is running on port http://localhost:${port}`);


})