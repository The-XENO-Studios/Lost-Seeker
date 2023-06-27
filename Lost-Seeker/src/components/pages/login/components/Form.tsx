function Form() {
  return (
    <>
      <form className="space-y-5">
        <div className="relative">
          <input
            type="email"
            id="email"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue peer placeholder:text-transparent focus:placeholder:text-lightGray focus:border-2"
            placeholder="Enter your Email"
            required
          />
          <label
            htmlFor="email"
            className="absolute text-md duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Email
          </label>
        </div>
        <div className="relative">
          <input
            type="password"
            id="password"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue peer placeholder:text-transparent focus:placeholder:text-lightGray focus:border-2"
            placeholder="Enter your Password"
            required
          />
          <label
            htmlFor="password"
            className="absolute text-md duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Password
          </label>
        </div>
      </form>
      <div></div>
    </>
  )
}
export default Form
