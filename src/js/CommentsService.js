export class CommentsService {
  constructor(url) {
    this.url = url;
    
  }

  async list() {
    try{
    const response = await fetch(this.url);
    return response.json();}
    catch(e) {
      console.log("There was an error fetching data:"+e);
    }
    
  }

  async save(comment) {
    
    const response = await fetch(this.url, {
      method: "post",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.json();
  }
}
