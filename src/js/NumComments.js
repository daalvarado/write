export class NumComments {

async getComments(){
    const commentsArray=await fetch("http://localhost:3001/comments/");
    return commentsArray.json();
}    

numComments(){
    this.getComments().then(v => 
                                  $("div.numComments").html("Comments: " + v.length)   
    )
}



}


//  async list() {
//         const response = await fetch(this.url);
//         return response.json();
//     }