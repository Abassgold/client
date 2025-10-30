import SmsHistory from '@/components/dashboard/virtualNumber/SmsHistory';
import UsaVirtualNumberServices from '@/components/dashboard/virtualNumber/usa/UsaVitualNumber';
import VirtualNumber from '@/components/dashboard/virtualNumber/VirtualNumber'

const Page = () => {

  return (
    <section className='w-full'>
      <VirtualNumber />
      <UsaVirtualNumberServices/>
      <SmsHistory />
    </section>
  )
}
export default Page;