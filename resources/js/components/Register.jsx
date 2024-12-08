const Register = ({error, setRegisterUsername, setRegisterEmail, setRegisterPassword, setConfirmPassword, setCurrentView, handleRegister, registerUsername, registerEmail, registerPassword, confirmPassword}) => {
      return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-8">
          <div className="text-center">
            <img 
              src="http://www.invadems.com/storage/zLGzberJHau0XUt4ZRYZCE2l060tvVSz4aWqQOxz.png" 
              alt="Company Logo" 
              className="mx-auto h-20 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            
            <div className="relative">
              <input
                type="text"
                required
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                className="block w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
              />
            </div>
            
            <div className="relative">
              <input
                type="email"
                required
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="block w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
              />
            </div>
            
            <div className="relative">
              <input
                type="password"
                required
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
            </div>
            
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Register
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setCurrentView('login')}
                  className="text-blue-600 hover:text-blue-500"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
      )

}

export default Register