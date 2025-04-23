import { AbsoluteFill, Img, Sequence, useVideoConfig } from "remotion";

export const RemotionVideo = ({ script, imageList, audioFile, captions }) => {
    console.log("script", imageList);
    const { fps, durationInFrames } = useVideoConfig();

    const getDurationFrame = () => {
        return Math.floor(durationInFrames / imageList.length);
    };

    return (
        <div>
            <AbsoluteFill className="bg-white">
                {imageList?.map((image: string, index: number) => (
                    <Sequence
                        key={index}
                        from={index * getDurationFrame()}
                        durationInFrames={getDurationFrame()}
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