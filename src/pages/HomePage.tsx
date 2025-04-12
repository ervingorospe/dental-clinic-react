import { useEffect, useState } from 'react';
import { apiGET } from '@features/dashboard/api/api'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import toothbrushImg from '../assets/toothbrush.webp';

interface Category {
  id: string | number;
  name: string;
  description: string
}

const HomePage = () => {
  const [serviceCategories, setServiceCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getServiceCategories = async () => {
      try {
        const response = await apiGET(`/api/services/categories`);

        if (response.status === 200) {
          setServiceCategories(response.data.categories);
          return;
        } else {
          return toast.error(response.data.message);
        }
      } catch (error) {
        return toast.error('Something went wrong while fetching services');
      }
    }
    
    getServiceCategories()
  }, []);

  return (
    <>
      <section className="px-4 py-24 bg-green-200">
        <div className="relative flex justify-center items-center h-[200px] lg:h-[400px]">
          <div className="max-w-7xl text-center">
            <h1 className="text-center text-4xl md:text-5xl lg:text-6xl tracking-wider font-extrabold text-green-600">Where Dental Health Meets Comfort and Care.</h1>
            <h2 className="mt-4 text-center text-xl md:text-3xl lg:text-4xl tracking-wider font-extrabold text-gray-600">Gentle hands. Advanced technology.</h2>
            <div className="mt-12">
              <Link to='/login' className="px-8 py-4 text-lg tracking-wide bg-teal-600 rounded-md text-white hover:bg-teal-700 transition-all duration-300">
                Schedule Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 py-24">
        <div className="text-center">
          <h1 className="text-gray-600 text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">Services We Offer</h1>
          <hr className="border-b-2 border-green-600 max-w-lg mx-auto my-6"/>

          <div className="max-w-screen-lg mt-16 mx-auto">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow-sm sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
              {
                serviceCategories?.map((service: any) => (
                  <div
                    key={service.name}
                    className="group relative bg-white p-12 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-inset"
                  >
                    <i className="text-3xl text-green-600 mb-4 fa-solid fa-circle-check"></i>
                    <div className="">
                      <h3 className="text-2xl font-bold text-gray-600">
                        <Link to='#' className="focus:outline-hidden">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {service.name}
                        </Link>
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="grid bg-white items-center lg:grid-cols-2 gap-8 shadow-md">
          <div>
            <img src={toothbrushImg} alt="Happy smile" className="w-auto h-full" />
          </div>
          <div>
            <h3 className="text-gray-600 tracking-wide text-2xl lg:text-4xl font-extrabold">About Us</h3>
            <p className="prose max-w-2xl text-base text-gray-500 mt-6">
              We believe that a healthy smile is the foundation of overall well-being. Located in the heart of the community, our clinic combines advanced dental technology with compassionate care to deliver personalized treatment in a warm and welcoming environment.

              With a team of experienced dentists and dedicated staff, we are committed to making every visit as comfortable and stress-free as possible. Whether you're here for a routine checkup, cosmetic enhancement, or a more complex procedure, we take the time to listen, understand, and tailor each treatment to your individual needs.

              We strive not only to treat dental issues but also to educate our patients on maintaining lifelong oral health. From children to seniors, we welcome patients of all ages and are proud to be a trusted part of your family's healthcare journey.

              Let us help you smile with confidence — because your smile deserves the best care.
            </p>
            
          </div>
        </div>
      </section>
      <section className="py-24 text-center">
        <h3 className="text-2xl lg:text-4xl tracking-wide font-bold text-green-900">Smile Brighter Today — Book Your Appointment Now!</h3>
        <div className="mt-16">
          <Link to="/login" className="px-8 py-4 tracking-wide bg-teal-600 rounded-md text-white hover:bg-teal-700 transition-all duration-300">
            Book your Appointment
          </Link>
        </div>
      </section>
    </>
    
  )
}

export default HomePage;