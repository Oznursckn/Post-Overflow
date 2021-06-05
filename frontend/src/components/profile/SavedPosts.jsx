import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Post";

export default function SavedPosts({ id }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUserPosts() {
    setPosts((await axios.get(`/api/users/${id}/saved-posts`)).data);
    setLoading(false);
  }

  useEffect(() => {
    getUserPosts();
  }, [id]);

  if (loading) return null;

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} data={post} getPosts={getUserPosts} />
      ))}
      {posts.length === 0 ? (
        <p className="text-muted text-center">
          Kaydedilen Paylaşım Bulunmamaktadır
        </p>
      ) : null}
    </div>
  );
}
