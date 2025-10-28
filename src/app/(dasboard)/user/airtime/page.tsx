import RecentRecharge from '@/components/airtimes/RecentRecharge';
import { AirtimeRecharge } from '@/components/pages/AirtimeRecharge'

const Airtime = () => {
  return (
    <>
      <AirtimeRecharge />
      <div className="max-w-2xl mx-auto">
        <RecentRecharge />
      </div>
    </>
  )
}

export default Airtime;