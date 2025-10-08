// import './features.css'
interface cardDetails {
    icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}
const FeturesCard = ({   icon,
  title,
  description,
  color }: cardDetails) => {
  return (
<div className="bg-white text-center rounded-xl shadow-md p-6 border border-slate-200 hover:shadow-lg transition-shadow duration-300">
    <div className={`${color} w-12 mx-auto h-12 rounded-lg flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900  mb-2">
      {title}
    </h3>
    <p className="text-slate-600">{description}</p>
  </div>
  )
}

export default FeturesCard;