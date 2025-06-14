import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: 0,
    features: [
      "Access Free Courses",
      "Limited Expert Follows",
      "Community Support",
    ],
  },
  {
    name: "Pro",
    price: 499,
    features: [
      "Premium Services Access",
      "Unlimited Expert Follows",
      "Direct Messages to Experts",
      "Group Webinars Access",
    ],
  },
  {
    name: "Elite",
    price: 999,
    features: [
      "1-on-1 Expert Sessions",
      "Priority Chat Support",
      "Verified Badge Request",
      "Early Access to Events",
      "Expert Matching System",
    ],
  },
];

export default function SubscriptionPlans() {

    const handleSubscribe = (plan) => {
  alert(`Thank you for subscribing to the ${plan.name} plan!`);
  // Optionally you can still redirect or do other things here
};

  return (
    <div className="grid md:grid-cols-3 gap-6 pt-20 pb-20">
      {plans.map((plan, i) => (
        <div
          key={i}
          className="flex flex-col p-6 bg-white rounded-xl shadow border border-gray-100 text-center hover:shadow-lg transition-all duration-300"
        >
          <div className="flex-grow">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">{plan.name}</h3>
            <p className="text-3xl text-purple-600 font-semibold mb-4">
              ₹{plan.price}
              <span className="text-sm text-gray-500 font-medium"> /month</span>
            </p>

            <ul className="mt-4 space-y-2 text-gray-600 text-left">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start space-x-2">
                  <CheckCircle className="text-green-500 mt-1" size={18} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <Button
  className="mt-6 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
  onClick={() => handleSubscribe(plan)}
>
  Subscribe
</Button>
        </div>
      ))}
    </div>
  );
}
