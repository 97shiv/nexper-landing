import { Users, Star, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    icon: <Users className="w-6 h-6 text-purple-600 mb-2" />,
    title: "Full stack developer",
    desc: "Skilled professionals ready to help",
    link: "/services/Full-stack-developer",
  },
  {
    icon: <Star className="w-6 h-6 text-yellow-500 mb-2" />,
    title: "Digital marketing",
    desc: "Highly rated by our customers",
    link: "/services/Digital-marketing",
  },
  {
    icon: <Award className="w-6 h-6 text-green-600 mb-2" />,
    title: "Yoga & Fitness Trainer",
    desc: "100% satisfaction guarantee",
    link: "/services/Fitness-Trainer",
  },
  {
    icon: <Users className="w-6 h-6 text-blue-600 mb-2" />,
    title: "Doctor Consultant",
    desc: "Thousands of happy clients",
    link: "/services/Doctor-Consultant",
  },
  {
    icon: <Star className="w-6 h-6 text-pink-500 mb-2" />,
    title: "Premium Support",
    desc: "24/7 expert help",
    link: "/services/experts",
  },
];

const AutoSlideCards = () => {
  const navigate = useNavigate();

  return (
      <div className="overflow-hidden py-4">
      <div className="flex w-max animate-slide whitespace-nowrap">
        {[...cards, ...cards].map((card, i) => (
          <div
            key={i}
            onClick={() => navigate(card.link)}
            className="cursor-pointer min-w-[180px] mx-2 bg-gray/60 backdrop-blur-sm p-4 rounded-xl border border-white/70 text-center flex-shrink-0 hover:shadow-lg transition"
          >
            {card.icon}
            <h3 className="text-sm font-semibold text-white">{card.title}</h3>
            <p className="text-xs text-white">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoSlideCards;
