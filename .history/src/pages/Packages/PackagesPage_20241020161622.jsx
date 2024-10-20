import { Link } from "react-router-dom"


const PackagesPage = () => {
  return (
    <div>PackagesPage
      <Link
      to="/packages/add"
      className="bg-blue-500 text-white p-2 rounded"
      >
      add package
      </Link>
    </div>

  )
}

export default PackagesPage