import ExploreServices from '@/components/dashboard/overview/Exploreservices/ExploreServices'
import OverviewHero from '@/components/dashboard/overview/OverviewHero'
import Quickactions from '@/components/dashboard/overview/Quickactions'
import RecentTransaction from '@/components/dashboard/overview/recenttransaction/RecentTransaction'

const Dashboard =async() => {
  return (
    <section className='w-full'>
      <OverviewHero />
      <RecentTransaction />
      <ExploreServices />
      <Quickactions />
    </section>
  )
}

export default Dashboard