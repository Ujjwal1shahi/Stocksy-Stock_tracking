
import { useEffect, useRef } from "react";

/**
 * Generic TradingView widget hook.
 *
 * Supported modes:
 * - "web-component": TradingView custom elements such as
 *   <tv-market-overview>, <tv-market-data>, and <tv-news-feed>.
 * - "script": Classic TradingView embeds that inject an iframe.
 *
 * @param {Object} options
 * @param {string} options.scriptUrl
 * @param {Object} [options.config={}]
 * @param {number} [options.height=600]
 * @param {"web-component"|"script"} [options.renderMode="script"]
 * @param {string} [options.elementName]
 * @param {Array} [options.sectors]
 */
export default function useTradingViewWidget({
  scriptUrl,
  config = {},
  height = 600,
  renderMode = "script",
  elementName,
  sectors,
}) {
  const containerRef = useRef(null);

  // Stable dependency values for configuration objects and arrays.
  const configString = JSON.stringify(config ?? {});
  const sectorsString = JSON.stringify(sectors ?? []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !scriptUrl) return undefined;

    let cancelled = false;

    container.replaceChildren();

    /**
     * Load or reuse a TradingView module script, then mount
     * its registered custom element.
     */
    if (renderMode === "web-component") {
      if (!elementName) {
        console.error(
          "TradingView web-component widgets require an elementName."
        );
        return undefined;
      }

      const mountWidget = () => {
        if (cancelled || !container) return;

        if (!customElements.get(elementName)) {
          console.error(
            `TradingView custom element "${elementName}" was not registered.`
          );
          return;
        }

        const widget = document.createElement(elementName);

        widget.style.display = "block";
        widget.style.width = "100%";
        widget.style.height = `${height}px`;

        // Market Overview and Market Data use symbol-sectors.
        if (sectorsString !== "[]") {
          widget.setAttribute("symbol-sectors", sectorsString);
        }

        // Apply supplied configuration as attributes.
        // Only properties supported by the specific widget
        // will have an effect.
        const parsedConfig = JSON.parse(configString);

        Object.entries(parsedConfig).forEach(([key, value]) => {
          if (value === undefined || value === null) return;

          const attributeName = key.replace(
            /[A-Z]/g,
            (letter) => `-${letter.toLowerCase()}`
          );

          const attributeValue =
            typeof value === "object"
              ? JSON.stringify(value)
              : String(value);

          widget.setAttribute(attributeName, attributeValue);
        });

        container.replaceChildren(widget);
      };

      const existingScript = Array.from(
        document.querySelectorAll('script[data-tv-module]')
      ).find((script) => script.dataset.tvModule === scriptUrl);

      const waitForElement = () => {
        if (cancelled) return;

        customElements.whenDefined(elementName).then(() => {
          mountWidget();
        });
      };

      if (customElements.get(elementName)) {
        mountWidget();
      } else if (existingScript) {
        // Reuse a script that is already loading or has loaded.
        waitForElement();
      } else {
        const script = document.createElement("script");

        script.type = "module";
        script.src = scriptUrl;
        script.dataset.tvModule = scriptUrl;

        script.onload = waitForElement;

        script.onerror = () => {
          console.error(
            "Failed to load TradingView module:",
            scriptUrl
          );
        };

        document.head.appendChild(script);
      }

      return () => {
        cancelled = true;
        container.replaceChildren();
      };
    }

    /**
     * Classic TradingView embed scripts, such as Stock Heatmap.
     * These scripts read JSON from their own script element.
     */
    if (renderMode === "script") {
      const widgetContainer = document.createElement("div");

      widgetContainer.className = "tradingview-widget-container";
      widgetContainer.style.width = "100%";
      widgetContainer.style.height = `${height}px`;

      const widget = document.createElement("div");

      widget.className = "tradingview-widget-container__widget";
      widget.style.width = "100%";
      widget.style.height = "100%";

      const script = document.createElement("script");

      script.type = "text/javascript";
      script.async = true;
      script.src = scriptUrl;
      script.textContent = JSON.stringify({
        ...JSON.parse(configString),
        width: "100%",
        height,
      });

      widgetContainer.append(widget, script);
      container.appendChild(widgetContainer);

      return () => {
        cancelled = true;
        container.replaceChildren();
      };
    }

    console.error(`Unsupported TradingView renderMode: ${renderMode}`);

    return undefined;
  }, [
    scriptUrl,
    configString,
    sectorsString,
    height,
    renderMode,
    elementName,
  ]);

  return containerRef;
}
