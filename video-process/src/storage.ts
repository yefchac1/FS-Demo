// We want this file to use Google Cloud Storage to store the processed video file.
// WE want to use local storage to store the input video file.

import ffmpeg from 'fluent-ffmpeg';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';

const storage = new Storage();

const rawVideoBucket = 'test-videos-raw-yefi';
const processedVideoBucket = 'test-videos-processed-yefi';

const localRawVideo = './raw-video';
const localProcessedVideo = './processed-video';



export function setupDirectories() {
}
    /**
     * @param fileName - Name of file to download from {@link rawVideoBucket} into {@link localRawVideo} folder.
     * @returns A promise that resolves when the file has been downloaded.
     */
    
    export async function downloadVideo(fileName: string) {
        await storage.bucket(rawVideoBucket)
            .file (fileName)
            .download({ destination : `${localRawVideo}/${fileName}`});

        console.log(
            `gs://${rawVideoBucket}/${fileName} downloaded to ${localRawVideo}/${fileName}.`
        )
    }

    /**
     * @param fileName - Name of file to upload from {@link localProcessedVideo} folder to {@link processedVideoBucket}.
     * @returns A promise that resolves when the file has been uploaded.
     */

    export async function uploadVideo(fileName: string) {
        const bucket = storage.bucket(processedVideoBucket);
        await bucket.upload(`${localProcessedVideo}/${fileName}`, {
            destination: fileName
        });
        await bucket.file(fileName).makePublic();
        console.log(
            
            `${localProcessedVideo}/${fileName} uploaded to gs://${processedVideoBucket}/${fileName}.`);
    }

    /** 
    * @param rawVideoName - Name of the file to covert from {@link localRawVideo}
    * @param processedVideoName - Name of file to convert to {@link localProcessedVideo}
    * @returns A promise that resolves when the video has been converted
    */

    export function convertVideo(rawVideoName: string, processedVideoName: string) {
        return new Promise<void>((resolve, reject) => {    
            
            
            ffmpeg(`${localRawVideo}/${rawVideoName}`)
            .outputOptions('-vf', 'scale=-1:360') //Set the output resolution to 360p
            .on("end", () => {
                console.log("Video processing finished.");
                resolve();

    })
            .on('error', (err: any) => {

                console.log('An error occurred:' + err.message);
                reject(err);
            })
    .save(`${localProcessedVideo}/${processedVideoName}`);
    });


}

export async function 

     
