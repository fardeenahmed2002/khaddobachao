import './css.css'
import Header from '../../components/heading/Header'
import {
  FaListAlt, FaSnowflake, FaUtensils, FaSeedling, FaRecycle, FaAppleAlt, FaLeaf, FaCarrot,
  FaTrashAlt, FaBalanceScale, FaRegCalendarCheck, FaHandHoldingHeart, FaCube,
  FaBreadSlice, FaTemperatureLow, FaBoxOpen
} from 'react-icons/fa'
import { GiHotMeal } from 'react-icons/gi'
export default function Tips() {
  const tips = [
    { icon: <FaListAlt className="text-green-600 w-6 h-6 mx-auto mb-2" />, title: '1. Plan Your Meals', img: '/1.jpeg', text: 'Avoid overbuying and ensure you use everything in your pantry by planning meals ahead.' },
    { icon: <FaBoxOpen className="text-blue-600 w-6 h-6 mx-auto mb-2" />, title: '2. Store Food Properly', img: '/2.jpeg', text: 'Proper storage can extend the shelf life of fresh foods and reduce spoilage.' },
    { icon: <FaUtensils className="text-yellow-600 w-6 h-6 mx-auto mb-2" />, title: '3. Use Leftovers Creatively', img: '/2.jpeg', text: 'Transform leftover meals into new dishes to minimize waste and save money.' },
    { icon: <FaRecycle className="text-green-700 w-6 h-6 mx-auto mb-2" />, title: '4. Compost Scraps', img: '/4.jpeg', text: 'Turn food scraps into nutrient-rich compost to reduce landfill waste and nourish your garden.' },
    { icon: <FaBalanceScale className="text-indigo-600 w-6 h-6 mx-auto mb-2" />, title: '5. Serve Correct Portions', img: '/5.jpeg', text: 'Serving smaller portions helps avoid food leftovers. You can always go back for seconds!' },
    { icon: <FaRegCalendarCheck className="text-pink-500 w-6 h-6 mx-auto mb-2" />, title: '6. Understand Expiration Dates', img: '/6.jpeg', text: 'Use “Best Before” and “Use By” dates as a guide to avoid throwing away food too early.' },
    { icon: <FaCube className="text-purple-600 w-6 h-6 mx-auto mb-2" />, title: '7. Buy in Bulk', img: '/7.jpeg', text: 'Purchase larger quantities of non-perishable items to reduce packaging waste and save money.' },
    { icon: <FaHandHoldingHeart className="text-red-500 w-6 h-6 mx-auto mb-2" />, title: '8. Donate Extra Food', img: '/8.jpeg', text: 'If you have extra food you can’t use, donate it to local food banks or shelters.' },
    { icon: <FaSnowflake className="text-cyan-600 w-6 h-6 mx-auto mb-2" />, title: '9. Freeze Food', img: '/9.jpeg', text: 'Freeze surplus food to preserve it for later use, helping to avoid waste.' },
    { icon: <GiHotMeal className="text-orange-500 w-6 h-6 mx-auto mb-2" />, title: '10. Make Leftover Soups', img: '/10.jpeg', text: 'Repurpose leftover vegetables, meats, and grains to make hearty soups and stews.' },
    { icon: <FaBreadSlice className="text-yellow-700 w-6 h-6 mx-auto mb-2" />, title: '11. Use Stale Bread', img: '/use-stale-bread.jpeg', text: 'Turn stale bread into croutons, breadcrumbs, or bread pudding instead of throwing it away.' },
    { icon: <FaAppleAlt className="text-red-600 w-6 h-6 mx-auto mb-2" />, title: '12. Ripen Fruits', img: '/ripen-fruits.jpeg', text: 'Help unripe fruits ripen by placing them in a paper bag or next to other ripe fruits.' },
    { icon: <FaBalanceScale className="text-indigo-400 w-6 h-6 mx-auto mb-2" />, title: '13. Practice Portion Control', img: '/portion-control.jpeg', text: 'Start with smaller portions and save leftovers for another meal to prevent over-serving.' },
    { icon: <FaLeaf className="text-green-500 w-6 h-6 mx-auto mb-2" />, title: '14. Grow Fresh Herbs', img: '/fresh-herbs.jpeg', text: 'Grow your own herbs at home to avoid buying excess that might go to waste.' },
    { icon: <FaTemperatureLow className="text-blue-400 w-6 h-6 mx-auto mb-2" />, title: '15. Properly Thaw Food', img: '/proper-thawing.jpeg', text: 'Always thaw food safely by placing it in the fridge or using the microwave to avoid spoilage.' },
    { icon: <FaCarrot className="text-orange-600 w-6 h-6 mx-auto mb-2" />, title: '16. Use Peels', img: '/use-peels.jpeg', text: 'Use vegetable and fruit peels for making compost or as ingredients in smoothies and soups.' },
    { icon: <FaUtensils className="text-yellow-500 w-6 h-6 mx-auto mb-2" />, title: '17. Cook One-Pot Meals', img: '/one-pot-meals.jpeg', text: 'Prepare meals that use a variety of ingredients together to reduce leftover items.' },
    { icon: <FaSeedling className="text-green-500 w-6 h-6 mx-auto mb-2" />, title: '18. Pickle Excess Vegetables', img: '/pickling.jpeg', text: 'Pickle extra vegetables before they spoil to preserve them for longer use.' },
    { icon: <FaRecycle className="text-green-400 w-6 h-6 mx-auto mb-2" />, title: '19. Make Bone Broth', img: '/use-bone-broth.jpeg', text: 'Use leftover bones and scraps to create a nutritious and flavorful broth.' },
    { icon: <FaTrashAlt className="text-red-400 w-6 h-6 mx-auto mb-2" />, title: '20. Refrigerate Leftovers Immediately', img: '/refrigerate-leftovers.jpeg', text: 'Store leftover food properly within two hours to avoid bacterial growth and extend freshness.' },
  ]
  return (
    <div className="bg-[#FFF7E6] py-12 border-x-[20px] mt-[-25px] border-[#15803D] border-double">
      <Header childern={`Food Waste Reduction Tips`} />
      <p className="text-center text-lg text-gray-600 mb-12">
        Simple, practical steps to help you reduce food waste at home and make a positive impact.
      </p>
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll gap-8 px-6">
          {tips.map((tip, index) => (
            <div key={index} className="flex-none w-[calc(25%-1rem)] bg-white p-6 rounded-lg shadow-lg text-center">
              <img src={tip.img} alt={tip.title} className="w-16 mx-auto mb-4 rounded" />
              {tip.icon}
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
