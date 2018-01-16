// app.js
var Twitter = require('twitter');
var config = require('./config.js');

var T = new Twitter(config);

// Set up your search parameters
var params = {
    q: '',
    from: 'humor_silly',
    count: 1,
    result_type: 'recent',
    retweeted: false,
    lang: 'en'
}

T.get('search/tweets', params, function (err, data, response) {
    let sDots = ".";
    if (!err) {
        // This is where the magic will happen
        // Loop through the returned tweets
        for (let i = 0; i < data.statuses.length; i++) {
            // Get the tweet Id from the returned data
            let id = data.statuses[i].id_str;
            console.log(id);
            let screen_name = '@' + data.statuses[i].user.screen_name;

            //build our reply object
            let statusObj = {
                status: screen_name + " Hi" + sDots,
                in_reply_to_status_id: id,
                in_reply_to_status_id_str : id
            };

            //call the post function to tweet something
            T.post('statuses/update', statusObj, function (error, tweetReply, response) {

                //if we get an error print it out
                if (error) {
                    console.log(error);
                }

                //print the text of the tweet we sent out
                console.log(tweetReply.text);
            });
            sDots = sDots + '.';
        }
    } else {
        console.log(err);
    }

    // T.stream('statuses/filter', {track: '#TechKnightsDemo'}, function(stream) {
    //     stream.on('data', function(tweet) {
    //       console.log(tweet.text);
    //     });

    //     stream.on('error', function(error) {
    //       console.log(error);
    //     });
    //   });
});