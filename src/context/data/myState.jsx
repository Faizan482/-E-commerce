import { useEffect, useState } from "react"
import MyContext from "./myContext"
import { Timestamp, addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import { fireDb } from '../../firebase/FirebaseConfig'
const MyState = (props) => {
    const [mode, setMode] = useState('light')
    const [loading, setLoading] = useState(false)
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17,24,39)"
        } else {
            setMode('light');
            document.body.style.backgroundColor = "white"

        }
    }

    // add and get products 
    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    })

    const addProduct = async () => {
        if (products.title === null || products.price === null || products.imageUrl === null || products.category === null || products.description === null) {
            return toast.error("All fields are required")
        }
        setLoading(true)
        try {
            // ref to the fireStore db 
            const productRef = collection(fireDb, "products");
            // add product to the fireStoredb 
            await addDoc(productRef, products);
            toast.success("Product add successfully ");
            setTimeout(() => {
                window.location.href = "/dashboard"

            }, 3000)
            getProductData()
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }


    // single Product 
    const [product, setProduct] = useState([])

    const getProductData = async () => {
        setLoading(true)
        try {
            const q = query(collection(fireDb, 'products'), orderBy("time"));
            // get data from fireStore with onSnapShot Method 
            const data = onSnapshot(q, (QuerySnapShot) => {

                let productArray = [];

                QuerySnapShot.forEach((doc) => {

                    productArray.push({ ...doc.data(), id: doc.id });

                    setProduct(productArray)
                    setLoading(false)
                })
                return () => data
            })
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProductData()
    }, [])


    // updateProduct function 
    const editHandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async () => {
        setLoading(true)
        try {
            await setDoc(doc(fireDb, "products", products.id), products);
            toast.success("Product Update Successfully");
            getProductData();
            setTimeout(() => {
                window.location.href = "/dashboard"

            }, 3000)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    // delete Products function
    const deleteProduct = async (item) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDb, "products", item.id));
            toast.success("Product Delete Successfully");
            setLoading(false);
            getProductData()
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }


    return (
        <MyContext.Provider value={{ mode, toggleMode, loading, setLoading, products, setProducts, addProduct, product, deleteProduct, updateProduct, editHandle }}>{props.children}</MyContext.Provider>
    )
}

export default MyState