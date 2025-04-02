import Home from "./components/Home"
import Feed from "./components/Feed"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./utils/store"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />} >
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
