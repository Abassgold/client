// import './features.css'
interface cardDetails {
    title: string;
    description: string; 
    icon: string
}
const FeturesCard = ({ title, description, icon }: cardDetails) => {
  return (
    <div className="p-6   text-center shadow-lg bg-white rounded-lg ring-1 ring-zinc-300">
    <div className=" text-2xl md:text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-700">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
  )
}

export default FeturesCard;