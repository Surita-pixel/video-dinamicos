import { AbsoluteFill, Img, Sequence, staticFile, useVideoConfig, Audio } from "remotion";
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



    return (
        <div>
            <AbsoluteFill className="bg-white">
                {audioUrl && <Audio src={staticFile(audioUrl)} />}

                {imageList?.map((image: string, index: number) => (
                    <Sequence
                        key={index}
                        from={index * durationInFrames} // Use the duration prop
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
                    </Sequence>
                ))}
            </AbsoluteFill>

        </div>
    );
};