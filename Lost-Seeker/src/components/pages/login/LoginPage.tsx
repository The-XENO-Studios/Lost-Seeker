import { Link } from "react-router-dom"
import Form from "./components/Form.tsx"
function LoginPage() {
  return (
    <div>
      <div>
        <Link to="/">Lost Seeker</Link>
        <div>
          <h2>Let us find your Valuables</h2>
          <p>Find what you lost and Share what you Found</p>
        </div>
        <div>
          <div>{/*comments*/}</div>
          <div>{/*navigation for comments*/}</div>
        </div>
      </div>
      <div>
        <Form />
      </div>
    </div>
  )
}
export default LoginPage
