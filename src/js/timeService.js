export class TimeService{

timeStamp() {
    $('.timestamp').each(function (index,value){
let timePassed=moment($(this)[0].innerText).fromNow();
$(this).siblings(".timeCalc").html(timePassed)
    })

}}

// window.onload=function(){
//  $(".Date").each(function(index, value) {
//    let timePassed = moment($(this)).fromNow();
//    console.log(timePassed);
//  });

// }