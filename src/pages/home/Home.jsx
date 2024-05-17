import Layout from '../../components/layout/Layout'
import Herosection from '../../components/heroSection/Herosection';
import Filter from '../../components/filter/Filter';
import Productcard from '../../components/productCard/Productcard';
import Testimonial from '../../components/testimonial/Testimonial';
import Track from '../../components/track/Track';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart, deleteFromCArt } from '../../redux/cartSlice';
const Home = () => {
    // const cartItem = useSelector((state) => state.cart);
    // const dispatch = useDispatch()

    return (
        <Layout>

            <Herosection />
            <Filter />
            <Productcard />
            <Track />
            <Testimonial />
        </Layout>
    )
}

export default Home