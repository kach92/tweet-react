
let timeConverted = function(time) {
    let sometime = new Date(time)
    console.log(sometime)
    var day, hour, minute, seconds;
    seconds = Math.floor(time / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    let date = sometime.getDate();
    let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let month = monthArray[sometime.getMonth()]
    if (day > 0) {
        return `${date} days ago`
    } else {
        if (hour > 0) {
            return `${hour} hours ago`;
        } else {
            return `${minute} mins ago`;
        }
    }


}


class User extends React.Component {
    render(){
        let username = this.props.user.name
        let userScreenName = this.props.user.screen_name

        return (
            <div class="user-container">
                {username} <span class="username-time">@{userScreenName} &#183; {this.props.children}</span>
            </div>
            )
    }
}

class Time extends React.Component {
    render(){
        let time = Date.parse(this.props.time)

        time = Date.parse(new Date()) - time
        time = timeConverted(time)
        return (
            <span>
                {time}
            </span>
            )
    }
}




class Entity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isHovering : false
        }
        this.mouseHover = this.mouseHover.bind(this)
    }

    mouseHover(){
        console.log("YESY")
        this.setState(this.toggleHoverState);

    }

    toggleHoverState(state){
        return {
            isHovering : !state.isHovering
        }
    }

    render(){
        let text = this.props.tweet.text;
        let urls = this.props.tweet.entities.urls
        let mentions = this.props.tweet.entities.user_mentions

        if(urls.length>0){
            urls.map(url_entity=>{
                if(text.includes(url_entity.url)){
                    text = text.split(" ")
                    let index = text.indexOf(url_entity.url)
                    text[index] = <a href={url_entity.url}>{url_entity.display_url}</a>
                    let result = []
                    for(let i = 0; i < text.length; i++){
                        let temp = [text[i]]
                        let empty = [" "]
                        result = result.concat(temp)
                        result = result.concat(empty)
                    }
                    result.pop()
                    text = result

                }

            })
        }

        if(mentions.length>0){
            mentions.map(mention =>{
                if(text.includes(mention.name)){
                    text = text.split(" ")
                    let index = text.indexOf("@"+mention.name)
                    text[index] = <span class="mention-container"><span class="mentions" onMouseEnter={this.mouseHover} onMouseLeave={this.mouseHover}>@{mention.name}</span>{this.state.isHovering && <div class="hover-div">blablabla</div>}</span>
                    let result = []
                    for(let i = 0; i < text.length; i++){
                        let temp = [text[i]]
                        let empty = [" "]
                        result = result.concat(temp)
                        result = result.concat(empty)
                    }
                    result.pop()
                    text = result

                }
            })
        }


        return (
            <div class="tweet-text">
                {text}
            </div>
            )
    }
}


class Tweets extends React.Component {
    render(){
        let posts = this.props.tweets.map(tweet=>
            <div class="tweet-container">
                <div class="tweet-profile-image-container"><img src={tweet.user.profile_image_url}/></div>
                <div class="tweet-content">
                    <User user={tweet.user}><Time time={tweet.created_at}/></User>

                    <Entity tweet={tweet}/>
                </div>

            </div>
            )
        return (
                posts
            )
    }
}



ReactDOM.render(
    <div class="tweets-container">
        <Tweets tweets={tweets}/>
    </div>,
    document.getElementById('root')
);
