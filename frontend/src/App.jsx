import Layout from "./layout/Layout";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";

export default function App() {
  return (
    <Layout>
      <Header />
      <Home />
    </Layout>
  );
}