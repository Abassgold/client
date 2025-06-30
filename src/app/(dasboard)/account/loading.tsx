
const AccountLoading = () => {
  return (
    <section className="min-h-full text-gray-800">
  <div className="py-4 animate-pulse">
    <div className="h-6 w-1/4 bg-gray-200 rounded mb-2"></div>
    <div className="h-8 w-1/3 bg-gray-200 rounded mb-3"></div>
    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
  </div>

  <div>
    <div className="border-y border-slate-400 py-4 animate-pulse">
      <div className="h-5 w-1/5 bg-gray-200 rounded mb-3"></div>
      <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
    </div>

    <div className="border-b border-slate-400 py-4 animate-pulse">
      <div className="h-5 w-1/5 bg-gray-200 rounded mb-3"></div>
      <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
    </div>

    <div className="text-center p-4 font-[600] animate-pulse">
      <div className="flex justify-center items-center gap-2">
        <div className="h-12 w-24 bg-gray-200 rounded-2xl"></div>
        <div className="h-12 w-24 bg-gray-200 rounded-2xl"></div>
      </div>
    </div>
  </div>
</section>
  )
}

export default AccountLoading;