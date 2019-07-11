import * as React from "react";
import * as ReactDOM from "react-dom";
import VideoPlayer from "./components/VideoPlayer";
import { IVideo } from "./types/IVideo";
import { IState } from "./types/IState";
import VideoList from "./components/VideoList";

const APIKey: string = 'AIzaSyBeM5EFRSBeBsqKzT9mMr9uSNNcIeYCprA';
const channelId: string = 'UCzQUP1qoWDoEbmsQxvdjxgQ'; // Joe Rogan (testing)
const maxResults: number = 5;

class App extends React.Component {
    state: IState;

    private constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        } as IState;
        this.loadYoutubeVideos();
    }

    private async loadYoutubeVideos() {
        await fetch(`https://www.googleapis.com/youtube/v3/search?key=${APIKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`)
            .then(res => res.json())
            .then(
                result => {
                    this.setState({
                        videos: result.items,
                        selectedVideo: result.items[0]
                    });
                },
                error => {
                    console.log(error);
                }
            );
        return;
    }

    public render() {
        return (
            <div className="row">
                <VideoPlayer video={this.state.selectedVideo} channelId={channelId} />
                <VideoList onVideoSelect={(selectedVideo: IVideo) => { this.setState({ selectedVideo }) }}
                           videos={this.state.videos}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("youtube-videos"));
