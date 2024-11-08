import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import {
    IconAdjustmentsBolt,
    IconCloud,
    IconCurrencyDollar,
    IconEaseInOut,
    IconHeart,
    IconHelp,
    IconRouteAltLeft,
    IconTerminal2,
} from "@tabler/icons-react";
import { Marquee } from "@/components-project/ui/marquee";

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/james",
    },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 3));
const secondRow = reviews.slice(Math.ceil(reviews.length / 3), Math.ceil((2 * reviews.length) / 3));
const thirdRow = reviews.slice(Math.ceil((2 * reviews.length) / 3));

const ReviewCard = ({
                        img,
                        name,
                        username,
                        body,
                    }: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-gray-50/[.1] bg-gray-600/[.10] hover:bg-gray-50/[.15] min-h-[10rem]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img}/>
                <div className="flex flex-col">
                    <figcaption className="text-md font-medium text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm text-muted">{body}</blockquote>
        </figure>
    );
};

function FeaturesSectionDemo() {
    const features = [
        {
            title: "Built for developers",
            description:
                "Built for engineers, developers, dreamers, thinkers and doers.",
            icon: <IconTerminal2/>,
        },
        {
            title: "Ease of use",
            description:
                "It's as easy as using an Apple, and as expensive as buying one.",
            icon: <IconEaseInOut/>,
        },
        {
            title: "Pricing like no other",
            description:
                "Our prices are best in the market. No cap, no lock, no credit card required.",
            icon: <IconCurrencyDollar/>,
        },
        {
            title: "100% Uptime guarantee",
            description: "We just cannot be taken down by anyone.",
            icon: <IconCloud/>,
        },
        {
            title: "Multi-tenant Architecture",
            description: "You can simply share passwords instead of buying new seats",
            icon: <IconRouteAltLeft/>,
        },
        {
            title: "24/7 Customer Support",
            description:
                "We are available a 100% of the time. Atleast our AI Agents are.",
            icon: <IconHelp/>,
        },
        {
            title: "Money back guarantee",
            description:
                "If you donot like EveryAI, we will convince you to like us.",
            icon: <IconAdjustmentsBolt/>,
        },
        {
            title: "And everything else",
            description: "I just ran out of copy ideas. Accept my sincere apologies",
            icon: <IconHeart/>,
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 pb-10  mx-auto">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index}/>
            ))}
        </div>
    );
}

const Feature = ({
                     title,
                     description,
                     icon,
                     index,
                 }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    index: number;
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r  py-10 relative group/feature border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l border-neutral-800",
                index < 4 && "lg:border-b border-neutral-800"
            )}
        >
            {index < 4 && (
                <div
                    className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-800 to-transparent pointer-events-none"/>
            )}
            {index >= 4 && (
                <div
                    className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-800 to-transparent pointer-events-none"/>
            )}
            <div className="mb-4 relative z-10 px-10 text-neutral-400">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div
                    className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center"/>
                <span
                    className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-100">
          {title}
        </span>
            </div>
            <p className="text-sm text-neutral-300 max-w-xs relative z-10 px-10">
                {description}
            </p>
        </div>
    );
};


export default async function Dashboard() {

    return (
        <>


            <section className='min-h-[82vh] mb-[10vh] flex items-center justify-center'>
                <div
                    className="px-40 flex-col items-center  mx-auto  space-y-0 md:space-y-0 md:flex-col flex justify-center'"
                >

                    <div
                        className="flex justify-between items-center w-full pl-4 pr-8 py-6 bg-black bg-grid-small-amber-50/[0.2] border border-gray-300 rounded-lg mb-20 z-40">
              <span
                  className="text-xl sm:text-2xl font-bold relative  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 px-4 text-center">
                Enroll to Paid Courses by Industry Experts</span>
                        <button
                            className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span
              className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        </span>
                            <div
                                className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 text-xl ">
                                <span>{`Explore Premium`}</span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M10.75 8.75L14.25 12L10.75 15.25"
                                    ></path>
                                </svg>
                            </div>
                            <span
                                className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
                        </button>
                    </div>

                    <div className="space-y-12 pr-6 flex flex-col justify-center items-center">

                        <h1
                            // className="text-4xl font-bold text-center md:text-5xl md:text-left"
                            className={"text-5xl sm:text-7xl font-bold relative h-full z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pt-12"}
                            style={{
                                lineHeight: "1.2"
                            }}
                        >
                            Course Canvas Grow Together!
                        </h1>
                        <p className="text-neutral-500 px-80 mx-auto text-center relative z-10 text-2xl">
                            Your free hub for collaborative learning. Join our student-friendly platform to share
                            knowledge, host
                            resources, and find answers within our vibrant community. Connect with fellow learners and
                            experts
                            today!. Join our platform to share your knowledge, host resources, and grow your audience.
                            Get your
                            doubts resolved by the community.
                        </p>
                        <button
                            className="inline-flex h-14 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-xl text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </section>

            <section className={"mx-auto mb-[10vh] px-32"}>
                <h1
                    className={"text-5xl text-center sm:text-7xl font-bold relative h-full z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pt-12 pb-16"}
                    style={{
                        lineHeight: "1.2"
                    }}
                >
                    Why Course Canvas
                </h1>
                <FeaturesSectionDemo/>
            </section>

            <section className={"min-h-[82vh]  mx-auto w-full px-32 mb-[10vh]"}>
                <h1
                    // className="text-4xl font-bold text-center md:text-5xl md:text-left"
                    className={"text-5xl text-center sm:text-7xl font-bold relative h-full z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 pt-12 pb-16"}
                    style={{
                        lineHeight: "1.2"
                    }}
                >
                    Testimonials
                </h1>

                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {thirdRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>


            </section>


            <footer className="px-2 border-t pb-6">
                <div
                    className="container flex flex-col-reverse justify-between py-10 space-y-8 md:flex-row md:space-y-0 text-muted"
                >
                    <div
                        className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:space-y-0 md:items-start"
                    >
                        <div className="mx-auto my-6 text-center  md:hidden text-white">
                            Copyright &copy; 2022, All Rights Reserved
                        </div>


                        <h2 className='!mb-6 font-semibold text-xl text-muted'>
                            Follow us on
                        </h2>

                        <div className="flex justify-center space-x-4 mt-10">
                            <div className="flex flex-col space-y-3 ">
                                <a href="#" className='flex space-x-4'>
                                    <FaFacebook className='h-8 w-8 text-blue-600'/>
                                    <span className={"text-white"}>Facebook</span>
                                </a>

                                <a href="#" className='flex space-x-4 '>
                                    <FaYoutube className='h-8 w-8 text-red-600'/>
                                    <span>Youtube</span>
                                </a>

                                <a href="#" className='flex space-x-4'>
                                    <FaXTwitter className='h-8 w-8 '/>
                                    <span>Twitter</span>
                                </a>

                                <a href="#" className='flex space-x-4'>
                                    <FaInstagram className='h-8 w-8 text-pink-600'/>
                                    <span>Instagram</span>
                                </a>

                            </div>
                        </div>
                    </div>

                    <div
                        className="flex flex-col-reverse items-center space-y-0 md:flex-col  md:items-start"
                    >

                        <h2 className='!mb-4 font-semibold text-xl text-muted'>
                            Information
                        </h2>


                        <div className="flex flex-col space-y-3 ">
                            <a href="#" className='flex space-x-4'>
                                <span className={"text-neutral-400"}>FAQ</span>
                            </a>

                            <a href="#" className='flex space-x-4 '>
                                <span className={"text-neutral-400"}>Terms and Conditions</span>
                            </a>

                            <a href="#" className='flex space-x-4'>
                                <span className={"text-neutral-400"}>Privacy Policy</span>
                            </a>


                        </div>
                        <div className="pt-10 hidden text-white md:block">
                            Copyright &copy; 2025, All Rights Reserved
                        </div>

                    </div>

                    {/*<div className="flex justify-around space-x-32">*/}
                    {/*    <div className="flex flex-col space-y-3 ">*/}
                    {/*        <a href="#" className="hover:text-theme">Home</a>*/}
                    {/*        <a href="#" className="hover:text-theme">Pricing</a>*/}
                    {/*        <a href="#" className="hover:text-theme">Products</a>*/}
                    {/*        <a href="#" className="hover:text-theme">About</a>*/}
                    {/*    </div>*/}
                    {/*    <div className="flex flex-col space-y-3 ">*/}
                    {/*        <a href="#" className="hover:text-theme">Careers</a>*/}
                    {/*        <a href="#" className="hover:text-theme">Community</a>*/}
                    {/*        <a href="#" className="hover:text-theme">Privacy Policy</a>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/* <!-- Input Container --> */}
                    <div className="flex flex-col justify-between">
                        {/*<form>*/}
                        {/*    <div className="flex space-x-3">*/}
                        {/*        <input*/}
                        {/*            type="text"*/}
                        {/*            className="flex-1 px-4 rounded-full focus:outline-none"*/}
                        {/*            placeholder="Updated in your inbox"*/}
                        {/*        />*/}
                        {/*        <button*/}
                        {/*            className="px-6 py-2 text-white rounded-full bg-theme hover:bg-brightRedLight focus:outline-none"*/}
                        {/*        >*/}
                        {/*            Go*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</form>*/}

                    </div>
                </div>
            </footer>
            {/*<div*/}
            {/*    className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_5%,black)]">*/}
            {/*</div>*/}
        </>
    )
}