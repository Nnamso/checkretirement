"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Component() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [contributionAmount, setContributionAmount] = useState(500)
  const [contributionFrequency, setContributionFrequency] = useState("Monthly")
  const [savingsData, setSavingsData] = useState([])

  const calculateSavings = () => {
    const years = retirementAge - currentAge
    const annualInterestRate = 0.07 // 7% annual return
    let balance = initialInvestment
    const newSavingsData = []

    const contributionsPerYear = {
      Monthly: 12,
      Quarterly: 4,
      Yearly: 1
    }

    for (let year = 0; year <= years; year++) {
      newSavingsData.push({
        age: currentAge + year,
        savings: Math.round(balance)
      })

      const annualContribution = contributionAmount * contributionsPerYear[contributionFrequency]
      balance = balance * (1 + annualInterestRate) + annualContribution
    }

    setSavingsData(newSavingsData)
  }

  useEffect(() => {
    calculateSavings()
  }, [currentAge, retirementAge, initialInvestment, contributionAmount, contributionFrequency])

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-normal text-gray-800 mb-8">Retirement Calculator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="currentAge" className="block text-sm font-medium text-gray-700 mb-1">
              Current Age
            </label>
            <input
              id="currentAge"
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="retirementAge" className="block text-sm font-medium text-gray-700 mb-1">
              Retirement Age
            </label>
            <input
              id="retirementAge"
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="initialInvestment" className="block text-sm font-medium text-gray-700 mb-1">
              Initial Investment ($)
            </label>
            <input
              id="initialInvestment"
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="contributionAmount" className="block text-sm font-medium text-gray-700 mb-1">
              Contribution Amount ($)
            </label>
            <input
              id="contributionAmount"
              type="number"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="contributionFrequency" className="block text-sm font-medium text-gray-700 mb-1">
              Contribution Frequency
            </label>
            <select
              id="contributionFrequency"
              value={contributionFrequency}
              onChange={(e) => setContributionFrequency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>
          <button
            onClick={calculateSavings}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate
          </button>
        </div>
        <div className="h-80 bg-white rounded-lg shadow-md p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="age" stroke="#616161" />
              <YAxis stroke="#616161" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, 'Savings']}
                labelFormatter={(label) => `Age: ${label}`}
              />
              <Line type="monotone" dataKey="savings" stroke="#4285F4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {savingsData.length > 0 && (
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-normal text-gray-800">
            Estimated Savings at Retirement:
            <span className="font-bold text-blue-500 ml-2">
              ${savingsData[savingsData.length - 1].savings.toLocaleString()}
            </span>
          </h3>
        </div>
      )}
    </div>
  )
}