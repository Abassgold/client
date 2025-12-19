import SmsHistory from '@/components/dashboard/virtualNumber/SmsHistory';
import UsaVirtualNumberServices from '@/components/dashboard/virtualNumber/usa/UsaVitualNumber';

const Page = () => {
  return (
    <section className='w-full'>
      <div className="bg-gradient-to-r from-slate-500/50 via-slate-600 to-slate-700 text-white p-6 md:p-8 rounded-lg shadow-lg mb-6">
            <h2 className=" text-xl md:text-2xl font-bold mb-2">Get Numbers</h2>
            <p className="text-sm md:text-lg">Generate your number for your USA virtual SIM for number verification.</p>
            <a href='https://www.tiktok.com/@_flozap/video/7573380015375666453?is_from_webapp=1&sender_device=pc&web_id=7565061289875031570' target="_blank" rel="noopener noreferrer">
            <button className='bg-teal-900 text-white p-2 rounded-md text-xs'>Watch tutorial</button>
            </a>
        </div>
      <UsaVirtualNumberServices/>
      <SmsHistory />
    </section>
  )
}
export default Page;