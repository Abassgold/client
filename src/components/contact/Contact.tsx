import Link from "next/link"

const Contact = () => {
  return (
    <section id="contact" className="bg-blue-500 text-white py-16 px-2">
      <div className="max-w-[70rem] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Get in Touch</h2>
        <p className="text-lg mb-6">Have questions? Reach out to our support team!</p>
        <Link href="mailto:support@bankeasy.com" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200">Contact Us</Link>
      </div>
    </section>
  )
}

export default Contact