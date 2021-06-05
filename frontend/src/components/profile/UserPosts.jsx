import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Post from "../Post";

export default function UserPosts({ id }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  async function getUserPosts(reset) {
    const pagination = (
      await axios.get(`/api/users/${id}/posts`, {
        params: {
          page,
        },
      })
    ).data;
    if (reset) {
      setPosts(pagination.data);
    } else {
      console.log("Deneme");
      setPosts([...posts, ...pagination.data]);
    }
    setNumberOfPages(pagination.numberOfPages);
    setLoading(false);
  }

  useEffect(() => {
    getUserPosts();
  }, [page]);

  useEffect(() => {
    setPosts([]);
    setPage(1);
    getUserPosts(true);
  }, [id]);

  if (loading) return null;

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} data={post} getPosts={getUserPosts} />
      ))}
      {page >= numberOfPages ? null : (
        <Button onClick={() => setPage(page + 1)}>Daha Fazla Göster</Button>
      )}
    </div>
  );
}
