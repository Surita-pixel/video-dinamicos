import { Player } from "@remotion/player";
import { RemotionVideo } from "./RemotionVideo";
import { useEffect, useState, useRef } from "react";

function VideoPlayer({
  playVideo,
  videoId,
}: {
  playVideo: boolean;
  videoId: string;
}) {
  const [videoData, setVideoData] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [durationInFrames, setDurationInFrames] = useState(100);
  const durationCalculated = useRef(false);

  useEffect(() => {
    const getVideoData = async (videoId: string) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/getJsonByid?id=${videoId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setVideoData(result);
      } catch (error) {
        console.error("Failed to fetch video data:", error);

      } finally {
        setIsLoading(false);
      }
    };

    if (videoId) {
      getVideoData(videoId);
    }
  }, [videoId]);

  useEffect(() => {
    if (videoData?.captions && !durationCalculated.current) {
      const calculateDuration = () => {
        if (videoData.captions.length > 0) {
          const lastCaption = videoData.captions[videoData.captions.length - 1];
          const duration = lastCaption.end / 1000 * 30; // Assuming fps is 30
          setDurationInFrames(duration);
          durationCalculated.current = true;
        }
      };
      calculateDuration();
    }
  }, [videoData?.captions]); // Depend on videoData and captions

  return (
    <div>
      aquí se muestra el video
      {isLoading ? (
        <p>Cargando...</p>
      ) : videoData ? (
        <Player
          component={RemotionVideo}
          durationInFrames={Number(durationInFrames.toFixed(0))}
          compositionWidth={300}
          compositionHeight={450}
          fps={30}
          inputProps={{
            script: videoData?.script || "",
            imageList: videoData?.imageList || [],
            audioFile: videoData?.audioFile || "",
            captions: videoData?.captions || [],
            durationInFrames: durationInFrames
          }}
          controls={true}
        />
      ) : (
        <p>No se encontraron datos del video.</p>
      )}
    </div>
  );
}

export default VideoPlayer;