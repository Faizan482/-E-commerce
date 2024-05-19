import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import myContext from "../../context/data/myContext"
import { toast } from "react-toastify"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, fireDb } from "../../firebase/FirebaseConfig"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import Loader from '../../components/loader/Loader'
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const context = useContext(myContext)
    const { loading, setLoading } = context

    // for authentication 
    const signUp = async () => {
        if (name === "" || email === "" || password === "") {
            toast.error("All fields are required")
            return
        }
        setLoading(true)
        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            console.log(users)
            // set user detail into firebase database 
            const user = {
                name: name,
                email: users.user.email,
                uid: users.user.uid,
                time: Timestamp.now()
            }
            console.log(user, "setuser")
            setLoading(false)
            const userRef = collection(fireDb, "user")
            await addDoc(userRef, user)
            toast.success("Signup Successfully")
            setName("")
            setEmail("")
            setPassword("")
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast.error("SignUp failed. Please check your credentials and try again.");

            setLoading(false)


        }
    }






    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader />}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={name}
                        required
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <input type="email"
                        required
                        value={email}

                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        name="password"
                        required
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg' onClick={signUp}>

                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account : <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup