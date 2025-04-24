import { AbsoluteFill, Img, Sequence, staticFile, useVideoConfig, Audio, useCurrentFrame } from "remotion";
import { useState, useEffect } from "react";

export const RemotionVideo = ({ script, imageList, audioFile, captions, durationInFrames }) => {
    const { fps } = useVideoConfig();
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect(() => {
        if (audioFile) {
            let cleanedAudioUrl: string | null = null;

            if (audioFile.startsWith("/public/")) {
                cleanedAudioUrl = audioFile.substring("/public/".length);
            } else {
                cleanedAudioUrl = audioFile;
            }

            if (cleanedAudioUrl) {
                setAudioUrl(cleanedAudioUrl);
            } else {
                console.warn("Invalid audio file URL: ", audioFile);
                setAudioUrl(null);
            }

        }
    }, [audioFile]);
    const frame = useCurrentFrame()
    const getCurrentTime = ()=>{
        const currentFrame = frame/30*1000
        const currentCaption = captions.find((word)=>currentFrame>=word.start && currentFrame<=word.end)
        return currentCaption?currentCaption.text:''
    }


    return (
        <div>
            <AbsoluteFill className="bg-white">
                {audioUrl && <Audio src={staticFile(audioUrl)} />}

                {imageList?.map((image: string, index: number) => (
                    <Sequence
                        key={index}
                        from={index * durationInFrames} 
                        durationInFrames={durationInFrames}
                    >
                        <Img
                            src={image}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                        <AbsoluteFill
                            style={{
                                color: "white",
                                justifyContent: "center",
                                top: undefined,
                                bottom: 50,
                                height: 150,
                                textAlign: "center",
                                width: '100%'
                            }}

                        >
                            <h2>{getCurrentTime(    )}</h2>
                        </AbsoluteFill>
                    </Sequence>
                ))}
            </AbsoluteFill>

        </div>
    );
};