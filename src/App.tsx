// import "./App.css";
import Layout from "./Layout";

function App() {
  return (
    <Layout>
      <div className="home">
        <div className="home-cover">
          <div className="home-left"></div>
          <div className="home-right">
            <div className="home-right-illustration">
              {/* <img src="/illustration.png" alt="Illustration" /> */}
              <div className="home-right-quick">Javascript</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
