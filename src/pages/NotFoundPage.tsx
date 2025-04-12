const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-6xl font-bold text-green-600">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-800">Page Not Found</p>
      <p className="mt-2 text-gray-600 text-center">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Go Back Home
      </a>
    </div>
  )
}

export default NotFoundPage;