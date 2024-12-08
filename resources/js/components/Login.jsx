const Login = ({error, setLoginEmail, setLoginPassword, setCurrentView, handleLogin, loginEmail, loginPassword}) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-8">
            <div className="text-center">
              <img 
                src="http://www.invadems.com/storage/zLGzberJHau0XUt4ZRYZCE2l060tvVSz4aWqQOxz.png" 
                alt="Company Logo" 
                className="mx-auto h-20 mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800">Sign in to your account</h2>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                  {error}
                </div>
              )}
              
              <div className="relative">
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="block w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email address"
                />
              </div>
              
              <div className="relative">
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="block w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Sign In
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => setCurrentView('register')}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
    )
}

export default Login