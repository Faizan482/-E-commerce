
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import myContext from "../../context/data/myContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
function Login() {
    const context = useContext(myContext)
    const { loading, setLoading } = context
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    const navigate = useNavigate()
    const login = async (e) => {
        setLoading(true)
        e.preventDefault();
        if (formData === '') {
            toast.error("All field are required")
        }
        try {
            const result = await signInWithEmailAndPassword(auth, formData.email, formData.password)
            toast.success("Login successfull")
            localStorage.setItem('user', JSON.stringify(result))
            navigate('/')
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={formData.email}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                        required
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        required
                        name="password"
                        value={formData.password}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                        onChange={handleChange}
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={login}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login