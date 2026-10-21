import TradingViewMarketOverview from "../components/tradingview/TradingViewMarketOverview";
import { MARKET_OVERVIEW_SECTORS, MARKET_OVERVIEW_WIDGET_CONFIG, TV_MARKET_OVERVIEW_SCRIPT } from "../lib/constants";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-500 px-4 md:px-8 py-6 gap-6">
      {/* Page heading */}
      <header>
        <h1 className="text-2xl font-bold text-gray-100">Market Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Live data powered by TradingView</p>
      </header>

      {/* Market Overview Widget — half width on md+, full on mobile */}
      <section className="w-full grid grid-cols-1 gap-6">
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shadow-lg">
          <TradingViewMarketOverview
            scriptUrl={TV_MARKET_OVERVIEW_SCRIPT}
            sectors={MARKET_OVERVIEW_SECTORS}
            className="custom-chart"
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
    </div>
  );
}

export default Home;