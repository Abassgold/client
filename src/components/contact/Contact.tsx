import Link from "next/link";

const Contact = () => {
  return (
    <section
      id="contact-us"
      className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 text-white py-16 px-4"
    >
      <div className="max-w-[70rem] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Get in Touch</h2>
        <p className="text-lg mb-6">
          Have questions? Reach out to our support team!
        </p>
        <Link
          target="_blank"
          href="https://wa.me/qr/BHKITMXTHP2PE1"
          className="inline-block bg-white text-teal-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default Contact;
