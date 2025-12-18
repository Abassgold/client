import SmsHistory from '@/components/dashboard/virtualNumber/SmsHistory';
import VirtualNumber from '@/components/dashboard/virtualNumber/VirtualNumber'
import VirtualNumberServies from '@/components/dashboard/virtualNumber/VirtualNumberServies'

const Page = () => {

  return (
    <section className='w-full'>
      <VirtualNumber />
      <VirtualNumberServies />
      <SmsHistory />
    </section>
  )
}
export default Page;