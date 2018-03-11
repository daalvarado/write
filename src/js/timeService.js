export class TimeService{




timeStamp() {
     

    $('.timestamp').each(function (index,value){
        let now= moment();
        let pubDate = moment($(this)[0].innerText);
        let daysAgo = now.diff(pubDate, "days");
        let hourAgo = now.diff(pubDate, "hours")
        if (hourAgo>168) {
            let a = moment(pubDate).format("MMMM D, YYYY");
            $(this)
              .siblings(".timeCalc")
              .html("Published on " + a);
        } else if (hourAgo>24) {
            let a = moment(pubDate).format("dddd");
            $(this)
              .siblings(".timeCalc")
              .html("Published on " + a);
        } else {
let timePassed = moment($(this)[0].innerText).fromNow();
$(this)
  .siblings(".timeCalc")
  .html("Published " + timePassed);
        }
    })
}}

// window.onload=function(){
//  $(".Date").each(function(index, value) {
//    let timePassed = moment($(this)).fromNow();
//    console.log(timePassed);
//  });

// }