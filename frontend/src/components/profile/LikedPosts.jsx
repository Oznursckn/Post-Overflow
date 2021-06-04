import { useEffect, useState } from "react";
import axios from "axios";
import Post from "../Post";

export default function LikedPosts({ id }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUserPosts() {
    setPosts((await axios.get(`/api/users/${id}/liked-posts`)).data);
    setLoading(false);
  }

  useEffect(() => {
    getUserPosts();
  }, [id]);

  if (loading) return null;

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
      {posts.length === 0 ? (
        <p className="text-muted text-center">
          Beğenilen Paylaşım Bulunmamaktadır
        </p>
      ) : null}
    </div>
  );
}
