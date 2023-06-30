import { Link, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from "./components/Form.tsx";
import Card from "./components/Card.tsx";
type pageType = "login" | "register";
interface Props {
  user: any;
}
function LoginPage({ user }: Props) {
  const [page, setPage] = useState<pageType>("login");
  const location: any = useLocation().pathname.replace("/", "");
  useEffect(() => {
    setPage(location);
  }, [location]);
  if (user) {
    return <Navigate to="/list" />;
  }
  return (
    <div className="md:h-full lg:mt-10 xl:mt-16">
      <div className="md:flex md:h-full max-w-screen-lg mx-auto max-h-[50rem] md:bg-white md:rounded-2xl md:drop-shadow-2xl">
        <div className="bg-blue text-white px-5 pt-28 pb-5 md:w-5/12 md:m-3 md:rounded-2xl md:p-0 md:flex md:flex-col md:justify-between">
          <div className="md:ml-5">
            <Link to="/" className="font-bold hidden md:block md:mb-28 md:mt-5">
              LostSeeker
            </Link>
            <h2 className="font-bold text-3xl md:text-4xl">
              Let us find your Valuables
            </h2>
            <p className="text-lightBlue md:mt-5">
              Find what you lost and Return what you Found
            </p>
          </div>
          <div className="hidden md:flex md:flex-col md:items-center">
            <Card />
            <div className="flex gap-x-2 mb-14 mt-5">
              <div className="w-2 rounded-full bg-white h-2 hover:scale-125"></div>
              <div className="w-2 rounded-full bg-lightBlue h-2 hover:scale-125"></div>
              <div className="w-2 rounded-full bg-lightBlue h-2 hover:scale-125"></div>
            </div>
          </div>
        </div>
        <div className="mt-10 mx-5 md:mt-5 md:flex-grow md:max-w-2xl">
          <Form page={page} />
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
