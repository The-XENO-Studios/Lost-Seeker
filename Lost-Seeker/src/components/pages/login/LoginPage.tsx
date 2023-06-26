import { Link } from "react-router-dom"
import Form from "./components/Form.tsx"
function LoginPage() {
  return (
    <div>
      <div className="bg-blue text-white px-5 pt-28 pb-5">
        <Link to="/" className="font-bold hidden    ">
          Lost Seeker
        </Link>
        <div>
          <h2 className="font-bold text-3xl">Let us find your Valuables</h2>
          <p className="text-lightBlue">
            Find what you lost and Share what you Found
          </p>
        </div>
        <div className="hidden">
          <div>{/*comments*/}</div>
          <div>{/*navigation for comments*/}</div>
        </div>
      </div>
      <div className="mt-10 mx-5">
        <Form />
      </div>
    </div>
  )
}
export default LoginPage
