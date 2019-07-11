import * as React from "react";
import { IVideo } from "../types/IVideo";

const VideoPlayer = (prop: { video: IVideo, channelId: string }) => {
    if (!prop.video) {
        return <div>Loading videos...</div>;
    }
    const videoId = prop.video.id.videoId;
    const embedUrl = `https://youtube.com/embed/${videoId}`;
    const viewUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const channelUrl = `https://www.youtube.com/channel/${prop.channelId}`;

    return (
        <div className="col-12 col-md-8 p-2">
            <div className="card">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className="embed-responsive-item" src={embedUrl}></iframe>
                </div>
                <div className="card-body">
                    <h3 className="card-title">{prop.video.snippet.title}</h3>
                    <p className="card-text">{prop.video.snippet.description}</p>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <a href={viewUrl}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className="btn btn-secondary w-100">
                                View on YouTube
                            </a>
                        </div>
                        <div className="col-12 col-md-6">
                            <a href={channelUrl}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                className="btn btn-secondary w-100">
                                View all Videos
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
