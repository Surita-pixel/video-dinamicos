import { getCompositions, renderMedia } from "@remotion/renderer";
import { useRef } from "react";

export const useRemotionVideo = () => {
    const videoRef = useRef(null);

    async function renderVideo(): Promise<string> {
        console.log('rendereandooo')
        try {
            const comps = await getCompositions('http://localhost:3002'); // Adjust the serve URL if needed
            if (!comps || comps.length === 0) {
                throw new Error("No compositions found in your Remotion project.");
            }

            // Assuming the first composition is the one you want to render
            const composition = comps[0];
            console.log('composition', composition)

            // Check if videoRef.current is null before proceeding
            if (!videoRef.current) {
                throw new Error("videoRef.current is null. Make sure the component is mounted.");
            }

            // Dynamically determine the output path based on the device
            const outputFilename = `video-${Date.now()}.mp4`;
            const outputLocation = `/tmp/${outputFilename}`;  // Local filesystem (adjust for your environment)

            console.log('outputLocation', outputLocation)
            // Render the video
            await renderMedia({
                composition,
                serveUrl: 'http://localhost:3002', // Adjust the serve URL if needed
                outputLocation,
                inputProps: {},
                codec: 'h264', // Specify a valid codec
            });
            console.log('finished')


            return `/api/video/${outputFilename}`;
        } catch (error) {
            console.error("Error during video rendering:", error);
            throw error; // Re-throw the error to be caught by the calling component
        }
    }
    return {renderVideo};
}