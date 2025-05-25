import Banner from '../components/banner/Banner';
import Popular from '../components/main-middle/Popular';
import Rated from '../components/main-middle/Rated';

const Home = () => {
    return (
        <div>
            <section>
                <Banner></Banner>
            </section>
            <main className='w-11/12 mx-auto my-4 grid grid-cols-12 font-poppins'>
                <section className='col-span-9 mx-2'><Popular/></section>
                <section className='col-span-3 mx-2'><Rated/></section>
            </main>
        </div>
    );
};

export default Home;