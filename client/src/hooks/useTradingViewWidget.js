import { useEffect, useRef } from 'react';

const useTradingViewWidget = (scriptUrl, config, height = 600) => {
  const containerRef = useRef(null);

  // Serialize config once to use as a stable effect dependency
  const configStr = JSON.stringify(config);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean slate on every mount / config change
    container.innerHTML = '';

    // Inner widget div - TradingView injects its iframe here
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.width = '100%';
    widgetDiv.style.height = height + 'px';
    container.appendChild(widgetDiv);

    // Copyright element expected by some TradingView embed scripts
    const copyright = document.createElement('div');
    copyright.className = 'tradingview-widget-copyright';
    copyright.innerHTML =
      '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">' +
      '<span class="blue-text">Track all markets on TradingView</span></a>';
    container.appendChild(copyright);

    // TradingView embed scripts read their JSON config from the
    // script element's text content (not innerHTML, which browsers ignore
    // on programmatically-created script nodes).
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.type = 'text/javascript';
    script.async = true;
    script.textContent = configStr;
    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptUrl, configStr, height]);

  return containerRef;
};

export default useTradingViewWidget;