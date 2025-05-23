import React from 'react'

const Login = () => {
  return (
    <div className='min-w-screen min-h-screen'>
        <div className="flex-center w-1/2">
        <div className="card border-white mx-auto">
            <div className="card-body">
                <h2 className="card-title">Login</h2>
                <form>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                        </div>
                        <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                        </div>
                        </form>
                        </div>
        </div>
        </div>
    </div>
  )
}

export default Login