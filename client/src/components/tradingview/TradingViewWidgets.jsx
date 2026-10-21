
import { memo } from 'react';
import useTradingViewWidget from '../../hooks/useTradingViewWidget';

function TradingViewWidget({
  title,
  scriptUrl,
  config,
  className = '',
  height = 600,
}) {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);

  return (
    <section className={`block w-full ${className}`}>
      {title && (
        <h2 className="text-base font-semibold text-gray-300 px-4 pt-4 pb-2">
          {title}
        </h2>
      )}

      <div
        className="tradingview-widget-container w-full block"
        ref={containerRef}
        style={{ width: '100%', height: `${height}px`, display: 'block' }}
      />
    </section>
  );
}

export default memo(TradingViewWidget);
