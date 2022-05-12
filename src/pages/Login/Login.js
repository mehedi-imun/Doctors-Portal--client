import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading/Loading';
const Login = () => {
    let errorElement;
    const navigate = useNavigate()
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);

    }
    if (loading || googleLoading) {
        return <Loading></Loading>

    }
    if (error || googleError) {
        errorElement = <p className='text-red-600'>{error?.message || googleError?.message}</p>


    }

    if (googleUser || user) {
        return (
            navigate('/')
        );
    }
    return (
        <div className=' flex min-h-[80vh] justify-center items-center'>
            <div class=" card w-96 bg-base-100 shadow-xl">
                <div class="card-body ">
                    <h2 class="card-title justify-center ">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className="label">
                            <span class="label-text text-lg">Email</span>
                        </label>

                        <input
                            type="email" className="input  input-bordered w-full max-w-xs"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is required'
                                },
                                pattern: {
                                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                                    message: 'provide a valid email'
                                }
                            })}

                        />
                        {errors.email?.type === 'required' && <span className=' label-text-alt text-red-700'>{errors?.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className=' label-text-alt text-red-700'>{errors?.email.message}</span>}

                        <label class="label">
                            <span class="label-text text-lg">Password</span>
                        </label>
                        <input

                            type="password" className="input  input-bordered 
                            
                            w-full max-w-xs"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'password is required'

                                },
                                minLength: {
                                    value: 6,
                                    message: 'provide must be 6 character'
                                }

                            })}


                        />
                        {errors.password?.type === 'required' && <span className='  text-red-700'> {errors?.password.message} </span>}
                        {errors.password?.type === 'minLength' && <span className='  text-red-700'>{errors.password.message}</span>}

                        <p className=' ml-3 '><NavLink to='/'>  forgot password ?</NavLink></p>
                        {errorElement}
                        <input type="submit" value='Login' className="input  mt-3 input-bordered w-full max-w-xs bg-accent text-white text-xl cursor-pointer" />
                    </form>
                    <span className=' ml-3'> New to Doctors Portal?
                        <NavLink className=' text-secondary' to='/'> Create new account</NavLink>
                    </span>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()}
                        className="btn btn-outline bg-white  w-full max-w-xs  ">CONTINUE WITH GOOGLE</button>

                </div>
            </div>
        </div>
    );
};

export default Login;   