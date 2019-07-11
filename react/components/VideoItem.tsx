import * as React from "react";
import { IVideo } from "../types/IVideo";

const VideoItem = (prop: { video: IVideo, onVideoSelect: any }) => {
    const imgUrl = prop.video.snippet.thumbnails.default.url;

    return (
        <li className="list-group-item" onClick={() => { prop.onVideoSelect(prop.video) }}>
            <div className="media">
                <img className="img-fluid" src={imgUrl} />
                <div className="media-body p-2 media-head">
                    <h5>{prop.video.snippet.title}</h5>
                </div>
            </div>
        </li>
    );
}

export default VideoItem;

//class VideoItemComponent extends React.Component {
//    constructor(props: any, context: any) {
//        super(props, context);
//        this.state = {
//            video as IVideo,
//            onVideoSelect: Function
//        };
//    }
//    render() {
//        return  <li className="list-group-item" onClick={() => { this.props.onVideoSelect(video) }}>
//                    <div className="video-list media">
//                        <div className="media-left">
//                            <img className="media-object" src={this.props.video.imgUrl} />
//                        </div>
//                        <div className="media-body">
//                            <div className="media-heading">{video.snippet.title}</div>
//                        </div>
//                    </div>
//                </li>;   
//    }
//}
