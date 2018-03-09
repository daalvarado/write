export class timeService{

calculateTime(pubDate){
    var timePassed=moment(pubDate).fromNow();
    return timePassed;
}

}