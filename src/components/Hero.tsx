import Link from "next/link"

const Hero = () => {
  return (
    <section id="home" className=" bg-white text-gray-800 py-20 p-2">
      <div className="max-w-[70rem] mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
          <div className="flex-1 text-center md:text-start">
            <h2 className="bg-linear-to-br from-red-600 to-blue-700 text-transparent bg-clip-text text-4xl md:text-5xl font-bold mb-4">Your All-in-One Financial Solution</h2>
            <p className=" mb-8 text-gray-600">Manage Payments, Subscriptions, Crypto, Gift Cards, and Virtual Numbers with FloZap</p>
            <div className="space-x-4">
              <Link href="/register" className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full">Get Started</Link>
              <Link href="#features" className="bg-white text-sm md:text-base text-teal-600 border py-3 px-6  rounded-full hover:bg-gray-200 ring-2 ring-teal-600">Explore</Link>
            </div>
          </div>
          <div className="flex-1 w-fit ">

            <img
              className="xl:flex rounded-md bg-teal-300/5"
              src='./heropic.png'
              alt="A woman happily using FloZap"
              width={800}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero