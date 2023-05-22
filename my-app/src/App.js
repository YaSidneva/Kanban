import {Footer} from "./component/footer/footer";
import {Header} from "./component/header/header";
import {Layout} from "./component/layout/layout";
import {Board} from "./component/board/board";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Card} from "./component/board/card/card";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Board/>
    },
    {
        path: "/tasks/:cardId",
        element: <Card/>
    }
    ])

function App() {
  return (
          <Layout>
              <Header/>
              <main>
                  <RouterProvider router={router}/>
              </main>
              <Footer/>
          </Layout>

  );
}

export default App;