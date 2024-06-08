import { auth } from '@/auth'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
export default async function Dashboard() {
    const session = await auth();

  return (
   <>


           <section className='mb-[10vh] mt-10'>
      <div
        className="px-40 flex flex-col-reverse items-center  mx-auto mt-6 space-y-0 md:space-y-0 md:flex-row"
      >
        {/* <!-- Left item --> */}
        <div className="flex flex-col space-y-12 w-8/12 pr-6">
          <h1
            className="text-4xl font-bold text-center md:text-5xl md:text-left"
          >
            Course Canvas Grow Together!
          </h1>
          <p className="max-w-3xl text-center text-lg text-black md:text-left"> 
          Your free hub for collaborative learning. Join our student-friendly platform to share knowledge, host resources, and find answers within our vibrant community. Connect with fellow learners and experts today!Join our platform to share your knowledge, host resources, and grow your audience. Get your doubts resolved by the community.
          </p>
          <div className="flex justify-center md:justify-start">
            <a
              href="/courses"
              className="p-3 px-6 pt-2 text-white bg-theme rounded-full baseline hover:bg-blue-500"
              >Get Started</a
            >
          </div>
        </div>
        <div className="w-4/12 h-[45vh] ">
          <Image src="/images/illusboy1.jpg" alt="" width={"900"} height={"900"} className='object-contain w-full h-[45vh]' />
        </div>
      </div>
    </section>
    <section className='mb-[10vh]'>
      <div
        className="px-40  flex flex-col justify-between px-4 mx-auto mt-10 space-y-12 md:space-y-0 md:flex-row"
      >
        {/* <!-- What's Different --> */}
        <div className="flex flex-col space-y-12 w-5/12 pr-6">
          <h2 className="text-4xl font-bold text-center md:text-left">
            Whats different about Course Canvas?
          </h2>
          <p className="max-w-md text-lg text-center text-black md:text-left">
          Course Canvas stands out for its commitment to fostering collaborative learning in a student-friendly environment. Unlike other platforms, Course Canvas offers a completely free space for sharing knowledge, hosting resources, and seeking answers within a vibrant community of learners and experts. Join us today and experience the difference!
          </p>
        </div>

        {/* <!-- Numbered List --> */}
        <div className="flex flex-col space-y-8 w-6/12">
          <div
            className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row"
          >
            <div className="rounded-l-full bg-theme md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div
                  className="px-4 py-2 mr-4 md:mr-0 text-white rounded-full md:py-1 bg-theme"
                >
                  01
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Learn Latest Technologies
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Learn Latest Technologies
              </h3>
              <p className="text-black">
                Course Canvas offers a wide range of courses on the latest
                technologies. Our platform is designed to help you stay updated
                with the latest trends and developments in your field.
              </p>
            </div>
          </div>

          {/* <!-- List Item 2 --> */}
          <div
            className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row"
          >
            {/* <!-- Heading --> */}
            <div className="rounded-l-full bg-theme md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div
                  className="px-4 py-2 mr-4 md:mr-0 text-white rounded-full md:py-1 bg-theme"
                >
                  02
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Help your community
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Help your community
              </h3>
              <p className="text-black">
                Course Canvas is a free platform for sharing knowledge and
                hosting resources. Join our community to help others and grow
                your audience. You can interact with fellow learners and
                experts to get your doubts resolved.
              </p>
            </div>
          </div>

          {/* <!-- List Item 3 --> */}
          <div
            className="flex flex-col space-y-3 md:space-y-0 md:space-x-6 md:flex-row"
          >
            {/* <!-- Heading --> */}
            <div className="rounded-l-full bg-theme md:bg-transparent">
              <div className="flex items-center space-x-2">
                <div
                  className="px-4 py-2 mr-4 md:mr-0 text-white rounded-full md:py-1 bg-theme"
                >
                  03
                </div>
                <h3 className="text-base font-bold md:mb-4 md:hidden">
                  Assured Content Quality
                </h3>
              </div>
            </div>

            <div>
              <h3 className="hidden mb-4 text-lg font-bold md:block">
                Assured Content Quality
              </h3>
              <p className="text-black">
                Course Canvas is committed to providing high-quality content
                that meets the needs of our users. Our platform is designed to
                help you learn and grow in your field of interest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* <section id="testimonials">
      <div className="max-w-6xl px-5 mx-auto mt-32 text-center">
        <h2 className="text-4xl font-bold text-center">
          What's Different About Manage?
        </h2>
        <div className="flex flex-col mt-24 md:flex-row md:space-x-6">
          <div
            className="flex flex-col items-center p-6 space-y-6 rounded-lg bg-gray-200 md:w-1/3"
          >
            <Image width={2} height={2} src="Image width={2} height={2}/avatar-anisha.png" className="w-16 -mt-14" alt="" />
            <h5 className="text-lg font-bold">Anisha Li</h5>
            <p className="text-sm text-black">
              “Manage has supercharged our team’s workflow. The ability to
              maintain visibility on larger milestones at all times keeps
              everyone motivated.”
            </p>
          </div>
          <div
            className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-gray-200 md:flex md:w-1/3"
          >
            <Image width={2} height={2} src="/images/avatar-ali.png" className="w-16 -mt-14" alt="" />
            <h5 className="text-lg font-bold">Ali Bravo</h5>
            <p className="text-sm text-black">
              “We have been able to cancel so many other subscriptions since
              using Manage. There is no more cross-channel confusion and
              everyone is much more focused.”
            </p>
          </div>

          <div
            className="hidden flex-col items-center p-6 space-y-6 rounded-lg bg-gray-200 md:flex md:w-1/3"
          >
            <Image width={2} height={2} src="Image width={2} height={2}/avatar-richard.png" className="w-16 -mt-14" alt="" />
            <h5 className="text-lg font-bold">Richard Watts</h5>
            <p className="text-sm text-black">
              “Manage has supercharged our team’s workflow. The ability to
              maintain visibility on larger milestones at all times keeps
              everyone motivated.”
            </p>
          </div>
        </div>

        <div className="my-16">
          <a
            href="#"
            className="p-3 px-6 pt-2 text-white bg-theme rounded-full baseline hover:bg-brightRedLight"
            >Get Started</a
          >
        </div>
      </div>
    </section> */}

   

    <footer className="bg-white shadow-sm px-2 border-t ">
      <div
        className="container flex flex-col-reverse justify-between px-6 py-10 mx-auto space-y-8 md:flex-row md:space-y-0"
      >
        {/* <!-- Logo and social links container --> */}
        <div
          className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start"
        >
          <div className="mx-auto my-6 text-center  md:hidden text-black">
            Copyright &copy; 2022, All Rights Reserved
          </div>
  

          <h2 className='text-black !mb-6 font-semibold text-xl'>
          Follow us on
          </h2>
          
          <div className="flex justify-center space-x-4 mt-10">
          <div className="flex flex-col space-y-3 ">
            <a href="#" className='flex space-x-4'>
              <FaFacebook className='h-8 w-8 text-blue-600'/>
              <span>Facebook</span>
            </a>
            
            <a href="#" className='flex space-x-4 '>
              <FaYoutube className='h-8 w-8 text-red-600'/>
              <span>Youtube</span>
            </a>
            
            <a href="#" className='flex space-x-4'>
              <FaXTwitter className='h-8 w-8 text-black-600'/>
              <span>Twitter</span>
            </a>
            
            <a href="#" className='flex space-x-4'>
              <FaInstagram className='h-8 w-8 text-pink-600'/>
              <span>Instagram</span>
            </a>
            
            </div>
          </div>
        </div>
        <div className="flex justify-around space-x-32">
          <div className="flex flex-col space-y-3 ">
            <a href="#" className="hover:text-theme">Home</a>
            <a href="#" className="hover:text-theme">Pricing</a>
            <a href="#" className="hover:text-theme">Products</a>
            <a href="#" className="hover:text-theme">About</a>
          </div>
          <div className="flex flex-col space-y-3 ">
            <a href="#" className="hover:text-theme">Careers</a>
            <a href="#" className="hover:text-theme">Community</a>
            <a href="#" className="hover:text-theme">Privacy Policy</a>
          </div>
        </div>

        {/* <!-- Input Container --> */}
        <div className="flex flex-col justify-between">
          <form>
            <div className="flex space-x-3">
              <input
                type="text"
                className="flex-1 px-4 rounded-full focus:outline-none"
                placeholder="Updated in your inbox"
              />
              <button
                className="px-6 py-2 text-white rounded-full bg-theme hover:bg-brightRedLight focus:outline-none"
              >
                Go
              </button>
            </div>
          </form>
          <div className="hidden text-black md:block">
            Copyright &copy; 2022, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>

       

   </>
  )
}