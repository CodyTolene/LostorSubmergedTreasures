import * as React from "react";
import { IVideo } from "../types/IVideo";
import VideoItem from "./VideoItem";

const VideoList = (prop: { videos: IVideo[], onVideoSelect: any }) => {
    if (!prop.videos) {
        return <div>Loading...</div>;
    }

    const videoItems = prop.videos.map((video: IVideo) => {
        return (
            <VideoItem
                onVideoSelect={prop.onVideoSelect}
                key={video.etag}
                video={video}
            />
        );
    });

    return (
        <ul className="col-12 col-xl-4 list-group p-2">
            {videoItems}
        </ul>
    );
}

export default VideoList;
