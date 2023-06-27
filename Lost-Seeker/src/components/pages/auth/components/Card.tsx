function Card() {
  return (
    <div className="bg-darkBlue p-3 mx-5 text-sm rounded-lg text-lightBlue max-w-md">
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
        voluptate, omnis, amet nam ducimus,
      </p>
      <div className="flex items-center space-x-4 mt-5">
        <div className="relative w-10 h-10 overflow-hidden bg-lightBlue rounded-full">
          <svg
            className="absolute w-12 h-12 text-white -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div className="font-medium dark:text-white">
          <div>Jese Leos</div>
          <div className="text-sm text-lightBlue">August 2014</div>
        </div>
      </div>
    </div>
  )
}
export default Card
