import { motion } from 'framer-motion';
import Hero from '../components/home/Hero';
import Featured from '../components/home/Featured';
import Categories from '../components/home/Categories';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/common/Newsletter';

const Home = () => {
    return (
        <div className="bg-primary text-text-dark">
            <Hero />
            <Featured />
            <Categories />
            <Testimonials />
            <Newsletter />
        </div>
    );
};

export default Home;
