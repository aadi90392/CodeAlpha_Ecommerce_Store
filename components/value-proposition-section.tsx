import { Diamond, Award, Headset, ShieldCheck } from "lucide-react"

export default function ValuePropositionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose LuxeMart?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our commitment to excellence and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <Diamond className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unrivaled Quality</h3>
            <p className="text-gray-600">
              Every product is meticulously selected for its superior craftsmanship and durability.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <Award className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Curated Selection</h3>
            <p className="text-gray-600">Discover unique and exclusive items that you won't find anywhere else.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <Headset className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Our dedicated team is always here to assist you with any inquiries.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <ShieldCheck className="h-12 w-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Shopping</h3>
            <p className="text-gray-600">Shop with confidence knowing your data and transactions are protected.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
