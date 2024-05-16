import Layout from '../../components/layout/Layout'
import Herosection from '../../components/heroSection/Herosection';
import Filter from '../../components/filter/Filter';
import Productcard from '../../components/productCard/Productcard';
import Testimonial from '../../components/testimonial/Testimonial';
import Track from '../../components/track/Track';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCArt } from '../../redux/cartSlice';
const Home = () => {
    const cartItem = useSelector((state) => state.cart);
    console.log(cartItem)
    const dispatch = useDispatch()
    const addCart = () => {
        dispatch(addToCart("shirt"))
    }
    const deleteCart = () => {
        dispatch(deleteFromCArt("shirt"))
    }
    return (
        <Layout>
            <div className='flex gap-3 justify-center p-5'>
                <button className='bg-gray-300' onClick={() => addCart()}>add</button>
                <button className='bg-gray-300' onClick={() => deleteCart()}>delete</button>

            </div>
            <Herosection />
            <Filter />
            <Productcard />
            <Track />
            <Testimonial />
        </Layout>
    )
}

export default Home