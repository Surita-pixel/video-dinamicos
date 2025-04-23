import { Player } from "@remotion/player";
import { RemotionVideo } from "./RemotionVideo";
import { useEffect, useState } from "react";

function VideoPlayer({
  playVideo,
  videoId,
}: {
  playVideo: boolean;
  videoId: string;
}) {
  const [videoData, setVideoData] = useState<Record<string, any> | null>(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getVideoData = async (videoId: string) => {
      setIsLoading(true); // Set loading to true when fetching data
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
        // Handle error appropriately, e.g., set an error state
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    if (videoId) {
      getVideoData(videoId);
    }
  }, [videoId]);


  return (
    <div>
      aquí se muestra el video
      {isLoading ? (
        <p>Cargando...</p>
      ) : videoData ? (
        <Player
          component={RemotionVideo}
          durationInFrames={120}
          compositionWidth={300}
          compositionHeight={450}
          fps={30}
          inputProps={{
            script: videoData.script,
            imageList: videoData.imageList,
            audioFile: videoData.audioFile,
            captions: videoData.captions,
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
