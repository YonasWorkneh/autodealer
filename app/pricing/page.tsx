import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-balance">
            Choose your plan
          </h1>
          <p className="text-gray-500">
            Select the package that suits your needs and start posting your cars
            for sale today.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basic Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Basic</CardTitle>
              <CardDescription className="text-gray-600">
                Essential tools to manage finances, perfect for individuals and
                startups.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900">$0</div>
                <div className="text-gray-600">free</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    1x Business account & Cards
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">1x Account</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    30 transfer or direct debit
                  </span>
                </li>
              </ul>

              <Button variant="outline" className="w-full mb-4 bg-transparent">
                Current Plan
              </Button>

              <p className="text-center text-sm text-gray-500">
                30-day money-back guarantee
              </p>
            </CardContent>
          </Card>

          {/* Pro Plan - Most Popular */}
          <Card className="relative border-2 border-zinc-900 shadow-lg">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-zinc-900 text-white px-4 py-1 rounded-full flex items-center gap-1">
                <Star className="h-4 w-4 fill-current" />
                Most Popular
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Dealer</CardTitle>
              <CardDescription className="text-gray-600">
                Advanced features to track and grow your finances with ease.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <div className="text-4xl font-bold text-gray-900">
                    Birr 89
                  </div>
                  <div className="text-gray-400 line-through">Birr 100</div>
                </div>
                <div className="text-gray-600">
                  per agent, per year, billed annually
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    3x Business account & Cards
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Unlimited Accounts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    500 transfer or direct debit
                  </span>
                </li>
              </ul>

              <Button className="w-full mb-4 bg-gray-800 hover:bg-gray-900">
                Upgrade to Dealer
              </Button>

              <p className="text-center text-sm text-gray-500">
                30-day money-back guarantee
              </p>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Enterprise
              </CardTitle>
              <CardDescription className="text-gray-600">
                Comprehensive financial tools, including integrations and deep
                analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="text-4xl font-bold text-gray-900">Birr 139</div>
                <div className="text-gray-600">
                  per agent, per year, billed annually
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">
                    3x Business account & Cards
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Unlimited car posts</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Analytics & report</span>
                </li>
              </ul>

              <Button variant="outline" className="w-full mb-4 bg-transparent">
                Upgrade to Enterprise
              </Button>

              <p className="text-center text-sm text-gray-500">
                30-day money-back guarantee
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Link */}
        {/* <div className="text-center mt-12">
          <p className="text-gray-600 mb-2">More details and All features</p>
          <a href="#" className="text-blue-500 hover:text-blue-600 underline">
            View Pricing Page
          </a>
        </div> */}
      </div>
    </div>
  );
}
