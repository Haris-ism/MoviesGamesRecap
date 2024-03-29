import { useContext } from "react"
import { Switch, Route, Redirect } from "react-router-dom";
import ChangePassword from "../pages/ChangePassword"
import Register from "../pages/Register"
import About from "../pages/About"
import Games from "../pages/Games"
import GameDetail from "../pages/GameDetail"
import MovieDetail from "../pages/MovieDetail"
import Movies from "../pages/Movies"
import GamesList from "../pages/GamesList"
import Home from "../pages/Home"
import GamesForm from "../pages/GamesForm"
import GameEdit from "../pages/GameEdit"
import MovieEdit from "../pages/MovieEdit"
import MoviesForm from "../pages/MoviesForm"
import MovieList from "../pages/MovieList"
import Login from "../pages/Login"
import { UserContext } from "../context/UserContext"

const Section = () => {
  const context = useContext(UserContext)
  const user = context.user
  const PrivateRoute = ({ user, ...props }) =>
    !user ? <Redirect to="/login" /> : <Route {...props} />

  const LoginRoute = ({ user, ...props }) =>
    user ? <Redirect to="/" /> : <Route {...props} />

  return (
    <section >
      <Switch>
        <PrivateRoute exact path="/ChangePassword" user={user} component={ChangePassword} />
        <PrivateRoute exact path="/game/create" user={user} component={GamesForm} />
        <PrivateRoute exact path="/movie/create" user={user} component={MoviesForm} />
        <PrivateRoute exact path="/game/edit/:id" user={user} component={GameEdit} />
        <PrivateRoute exact path="/movie/edit/:id" user={user} component={MovieEdit} />
        <Route exact path="/game/edit" user={user} component={GamesList} />
        <Route exact path="/movie/edit" user={user} component={MovieList} />
        <Route exact path="/about" user={user} component={About} />
        <Route exact path="/game/:id" user={user} component={GameDetail} />
        <Route exact path="/movie/:id" user={user} component={MovieDetail} />
        <Route exact path="/register" user={user} component={Register} />
        <Route exact path="/game" user={user} component={Games} />
        <Route exact path="/movie" user={user} component={Movies} />
        <Route exact path="/" user={user} component={Home} />
        <LoginRoute exact path="/login" user={user} component={Login} />
      </Switch>
    </section>
  )
}

export default Section
