export class CommentsService {
  constructor(url) {
    this.url = url;
    
  }

  async list() {
    const response = await fetch(this.url);
    return response.json();
    console.log("async list pasado");
  }

  async save(comment) {
    console.log(comment);
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
