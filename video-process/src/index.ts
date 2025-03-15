import ffmpeg from 'fluent-ffmpeg';
import express, { Request, Response } from 'express';

const app = express();
app.use(express.json());

    app.get('/', (req, res) => {

        res.send('Anita es mi novia y me encanta');

    });

    app.post('/process-video', (req, res) => {

        //Get path of the input video file from the request body

        const inputPathFile = req.body.inputPathFile;
        const outputPathFile = req.body.outputPathFile;

        if(!inputPathFile) {
             res.status(400).send("Bad Request: Missing input Path");
        }

        else if(!outputPathFile) {
             res.status(400).send("Bad Request: Missing output Path");
        }
    
        ffmpeg(inputPathFile)
            .outputOptions('-vf', 'scale=-1:360') //Set the output resolution to p
            .on("end", () => {
                 res.status(200).send("Video processing finished.");

    })
        .on('error', (err: any) => {
            console.log('An error occurred:' + err.message);
             res.status(500).send("An error occurred during video processing." + err.message);
    })
        .save(outputPathFile);
    });

const port = process.env.PORT || 3000;

app.listen(port, () => {

    console.log(`Video Process is running on port http://localhost:${port}`);


})