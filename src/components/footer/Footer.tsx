import Link from "next/link"
import { quicklinks } from "./list"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-2">
      <section className="max-w-[70rem] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-[600] mb-4">FloZap</h3>
            <p className="text-gray-400">Your trusted platform for banking, payments, and financial services.</p>
          </div>
          <div>
            <h3 className="text-xl font-[600] mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quicklinks.map((item, index) => (
                <li key={index}><Link href={item.link} className="text-gray-400 hover:text-gray-200">{item.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-[600] mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
        <div className="h-2 border-t-[1.9px] mx-[1rem] border-zinc-700 mb-8"> </div>
          <p>© {new Date().getFullYear()} FloZap. All rights reserved.</p>
        </div>
      </section>
    </footer>
  )
}

export default Footer