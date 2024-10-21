import { useSelector } from "react-redux";
import PostList from "../components/PostList"; // Import komponen PostList

function HomePage() {
  const { authLogin = null } = useSelector((states) => states);

  return (
    <section>
      <div className="container pt-1">
        {/* Tambahkan daftar posting di bawah form */}
        <div className="mt-4">
          <PostList /> {/* Komponen untuk menampilkan daftar posting */}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
