import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Mail } from "lucide-react"

export default function OrderSuccessPage() {
  const orderNumber = 'LM' + Math.random().toString(36).substr(2, 9).toUpperCase()
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-600">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold mb-2">Order #{orderNumber}</h2>
                <p className="text-gray-600">
                  Estimated delivery: 3-5 business days
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Confirmation Email</h3>
                  <p className="text-sm text-gray-600">Sent to your email address</p>
                </div>
                <div className="text-center">
                  <Package className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-medium mb-1">Order Processing\
