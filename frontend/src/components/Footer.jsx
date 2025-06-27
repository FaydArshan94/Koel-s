import React from "react";

const Footer = () => {
return (
    <footer className=" font-sans px-6">
        <div className="sm:h-[90vh] hidden h-[20vh] shadow-2xl overflow-hidden w-full relative text-zinc-100 pt-10 rounded-2xl sm:rounded-[3rem] items-center  mx-auto px-6 sm:flex  justify-center bg-cover bg-[url('src/assets/black-abstract-marble-stone-texture-background_1017-40615.jpg')]">
            {/* Left iPhone */}
            <div className="flex h-40 top-0 left-0 sm:top-28 sm:left-20 absolute justify-end sm:h-full">
                <img
                    src="src\assets\sir.png"
                    alt="iPhone"
                    className="sm:h-full sm:scale-110"
                />
            </div>
            {/* Center Download Section */}

            <div className="flex flex-col gap-10 w-[45%] text-center">
                <div>
                    <h1 className="text-7xl font-[MonaSans] leading-[15vh]">
                        DOWNLOAD
                    </h1>
                    <h1 className="text-9xl font-light font-[Baskville] leading-[15vh]">
                        KOEL'S
                    </h1>
                    <h1 className="text-[5.5rem] w-full font-[MonaSans] leading-[15vh]">
                        APP NOW
                    </h1>
                </div>

                <div className="flex justify-center gap-4">
                    <img
                        src="https://cdn.prod.website-files.com/643d816c18f827d213ff7ff9/646240c714f2618c4a717307_apple-badge.svg"
                        alt="App Store"
                        className="w-32 cursor-pointer transition-transform duration-200 "
                        onClick={() => {
                            // Example: Change image on click
                            const img = event.target;
                            img.src =
                                "https://cdn.prod.website-files.com/643d816c18f827d213ff7ff9/646240c714f2618c4a717307_apple-badge.svg";
                        }}
                    />

                    <img
                        src="https://cdn.prod.website-files.com/643d816c18f827d213ff7ff9/646240c714f2618c4a717305_google-play-badge.svg"
                        alt="Google Play"
                        className="w-32  cursor-pointer transition-transform duration-200"
                        onClick={() => {
                            // Example: Change image on click
                            const img = event.target;
                            img.src =
                                "https://cdn.prod.website-files.com/643d816c18f827d213ff7ff9/646240c714f2618c4a717305_google-play-badge.svg";
                        }}
                    />
                </div>
            </div>
            {/* Right iPhone */}
            <div className="flex  -top-28 right-5 absolute justify-end h-full">
                <img
                    src="src\assets\para.png"
                    alt="iPhone"
                    className="h-full scale-110"
                />
            </div>
        </div>




        {/* Bottom Footer */}
        <div className="flex sm:h-0 sm:pt-0  h-20 py-2 pt-4 bg-cover bg-[url('src/assets/black-abstract-marble-stone-texture-background_1017-40615.jpg')]  sm:rounded-none rounded-xl  sm:bg-none sm:mt-10         sm:flex-row flex-col gap-5 sm:gap-0  justify-between items-center  sm:py-10 px-6 w-full mx-auto">
            <div className="text-xs font-semibold text-zinc-100 sm:text-zinc-600 font-[MonaSans] ">
                Koels@All Rights Reserved
            </div>
            <div className="flex sm:gap- gap-10">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent capitalize sm:text-xs text-[10px] text-zinc-100 sm:text-zinc-800 font-semibold font-[MonaSans] sm:border-[1px] sm:border-zinc-300  rounded-full sm:w-28 sm:h-12 h-4 w-8 flex items-center justify-center transition-colors duration-200 hover:bg-zinc-800 hover:text-zinc-100"
                >
                    facebook
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent capitalize sm:text-xs text-[10px] text-zinc-100 sm:text-zinc-800 font-semibold font-[MonaSans] sm:border-[1px] sm:border-zinc-300  rounded-full sm:w-28 sm:h-12 h-4 w-8 flex items-center justify-center transition-colors duration-200 hover:bg-zinc-800 hover:text-zinc-100"
                >
                    instagram
                </a>
                <a
                    href="https://play.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent capitalize sm:text-xs text-[10px] text-zinc-100 sm:text-zinc-800 font-semibold font-[MonaSans] sm:border-[1px] sm:border-zinc-300  rounded-full sm:w-28 sm:h-12 h-4 w-8 flex items-center justify-center transition-colors duration-200 hover:bg-zinc-800 hover:text-zinc-100"
                >
                    playstore
                </a>
                <a
                    href="https://apple.com/app-store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-transparent capitalize sm:text-xs text-[10px] text-zinc-100 sm:text-zinc-800 font-semibold font-[MonaSans] sm:border-[1px] sm:border-zinc-300  rounded-full sm:w-28 sm:h-12 h-4 w-8 flex items-center justify-center transition-colors duration-200 hover:bg-zinc-800 hover:text-zinc-100"
                >appstore</a>
            </div>
        </div>
    </footer>
);
};

export default Footer;
