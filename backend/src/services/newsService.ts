import axios from "axios";

class NewsService {
  private async getData(): Promise<any[]> {
    return (
      await axios.get("http://hn.algolia.com/api/v1/search", {
        params: {
          tags: "front_page",
        },
      })
    ).data.hits;
  }

  async getNews() {
    const data = await this.getData();

    const news = data.map((item) => ({
      id: Number(item.objectID),
      title: item.title,
      dateCreated: item.created_at,
      url: item.url,
    }));

    return news;
  }
}

export default new NewsService();
