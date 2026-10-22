import TradingViewWidgets from "../components/tradingview/TradingViewWidgets";
import {
  MARKET_OVERVIEW_SECTORS,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TV_MARKET_OVERVIEW_SCRIPT,
  STOCK_HEATMAP,
  HEATMAP_WIDGET_CONFIG,
  TOP_STORIES,
  MARKET_QUOTES,
} from "../lib/constants";

const MARKET_DATA_SECTORS = [
  {
    sectionName: "Indices",
    symbols: [
      "FOREXCOM:SPXUSD",
      "FOREXCOM:NSXUSD",
      "FOREXCOM:DJI",
      "INDEX:NKY",
      "INDEX:DEU40",
      "FOREXCOM:UKXGBP",
    ],
  },
  {
    sectionName: "Futures",
    symbols: [
      "BMFBOVESPA:ISP1!",
      "BMFBOVESPA:EUR1!",
      "CMCMARKETS:GOLD",
      "TVC:USOIL",
      "BMFBOVESPA:CCM1!",
    ],
  },
  {
    sectionName: "Bonds",
    symbols: ["EUREX:FGBL1!", "EUREX:FBTP1!", "EUREX:FGBM1!"],
  },
  {
    sectionName: "Forex",
    symbols: [
      "FX:EURUSD",
      "FX:GBPUSD",
      "FX:USDJPY",
      "FX:USDCHF",
      "FX:AUDUSD",
      "FX:USDCAD",
    ],
  },
];

function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-6 bg-gray-500 px-4 py-6 md:px-8">
      <section className="grid w-full grid-cols-1 gap-6">
        <div className="w-full overflow-hidden rounded-xl border-2 border-black bg-[#0B0F19] p-2 shadow-lg">
          <TradingViewWidgets
            title="Market Movers"
            renderMode="web-component"
            elementName="tv-market-overview"
            scriptUrl={TV_MARKET_OVERVIEW_SCRIPT}
            config={{
              mode: "market-movers",
              colorTheme: "dark",
            }}
            className="custom-chart"
            height={600}
          />
        </div>

        <div className="overflow-hidden rounded-xl border-2 border-black bg-black p-2 shadow-lg">
          <TradingViewWidgets
            title="Stock Heatmap"
            renderMode="script"
            scriptUrl={STOCK_HEATMAP}
            config={HEATMAP_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>

      <section className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border-2 border-black bg-black p-2 shadow-lg">
          <TradingViewWidgets
            title="Top Stories"
            renderMode="web-component"
            elementName="tv-news-feed"
            scriptUrl={TOP_STORIES}
            config={{}}
            height={600}
          />
        </div>

        <div className="overflow-hidden rounded-xl border-2 border-black bg-black p-2 shadow-lg">
          <TradingViewWidgets
            title="Market Data"
            renderMode="web-component"
            elementName="tv-market-data"
            scriptUrl={MARKET_QUOTES}
            sectors={MARKET_DATA_SECTORS}
            config={{}}
            height={600}
          />
        </div>
      </section>
    </main>
  );
}

export default Home;
