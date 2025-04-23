import React from "react";
import { Composition } from "remotion"
import { RemotionVideo } from "../_components/RemotionVideo";
function Root() {
    return <>
        <Composition
            id="Empty"
            component={RemotionVideo}
            durationInFrames={60}
            fps={30}
            width={1280}
            height={720}
        />
    </>
}

export default Root;
