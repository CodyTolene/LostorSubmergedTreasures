import * as React from "react";
import * as ReactDOM from "react-dom";

const APIKey: string = 'AIzaSyBeM5EFRSBeBsqKzT9mMr9uSNNcIeYCprA';
const channelId: string = 'UCzQUP1qoWDoEbmsQxvdjxgQ'; // Joe Rogan (testing)

class App extends React.Component {
    private constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.loadYoutubeVideos();
    }
    private async loadYoutubeVideos() {
        await fetch(`https://www.googleapis.com/youtube/v3/search?key=${APIKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=20`)
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                },
                error => {
                    console.log(error);
                }
            );
        return;
    }
    public render() {
        return (
          <div>YouTube data fetched... Ready to display videos. See console.</div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("youtube-videos"));