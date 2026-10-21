import { useEffect, useRef, memo } from "react";

/**
 * TradingViewMarketOverview
 *
 * Renders the <tv-market-overview> web component widget.
 * Symbol sectors are passed as a prop (sourced from constants.js).
 *
 * Dark theme fix: we write the element as raw innerHTML so ALL attributes
 * (including color-theme) are present in the DOM *before* the custom-element
 * script upgrades the element. Using createElement + setAttribute after
 * appending can miss the upgrade lifecycle and leave the widget in light mode.
 *
 * @param {string}        scriptUrl - URL of the TradingView module script
 * @param {object}        config    - Widget config from constants.js (colorTheme, locale, etc.)
 * @param {string}        title     - Optional heading above the widget
 * @param {Array}         sectors   - Array of { sectionName, symbols[] }
 * @param {string}        className
 * @param {number|string} height    - Height in px (default 600)
 */
function TradingViewMarketOverview({
  scriptUrl,
  config = {},
  title,
  sectors = [],
  className = "",
  height = 600,
}) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || !sectors.length || !scriptUrl) return;

    // Pull supported web-component attributes from config,
    // falling back to safe defaults when not provided.
    const colorTheme = config.colorTheme || "dark";
    const locale     = config.locale     || "en";

    // Safely encode sectors for an HTML attribute value
    const sectorsAttr = JSON.stringify(sectors).replace(/"/g, "&quot;");

    // Write the element with ALL attributes already present in the markup.
    // This guarantees every attribute is visible during the custom-element
    // upgrade lifecycle (setAttribute after appendChild can miss it).
    wrapper.innerHTML =
      '<tv-market-overview' +
      ' color-theme="'   + colorTheme  + '"' +
      ' locale="'        + locale      + '"' +
      ' symbol-sectors="' + sectorsAttr + '"' +
      ' style="width:100%;display:block;">' +
      '</tv-market-overview>';

    // Inject the module script once – browser caches subsequent loads.
    // Append AFTER innerHTML so the element exists when the script runs.
    if (!document.querySelector('script[src="' + scriptUrl + '"]')) {
      const script = document.createElement("script");
      script.type = "module";
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
    }

    return () => {
      wrapper.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptUrl, JSON.stringify(config), JSON.stringify(sectors)]);

  return (
    <section className={"block w-full " + className}>
      {title && (
        <h2 className="text-base font-semibold text-gray-300 px-4 pt-4 pb-2">
          {title}
        </h2>
      )}
      <div
        ref={wrapperRef}
        className="tradingview-widget-container w-full block"
        style={{ width: "100%", height: height + "px", display: "block" }}
      />
    </section>
  );
}

export default memo(TradingViewMarketOverview);