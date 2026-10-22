import { memo } from "react";
import useTradingViewWidget from "../../hooks/useTradingViewWidget";

/**
 * Reusable TradingView widget renderer.
 *
 * For web components, pass renderMode="web-component" and elementName.
 * For classic iframe/script embeds, pass renderMode="script".
 */
function TradingViewWidgets({
  title,
  scriptUrl,
  config = {},
  sectors,
  renderMode = "script",
  elementName,
  className = "",
  height = 600,
  titleClassName = "text-base font-semibold text-gray-300 px-4 pt-4 pb-2",
}) {
  const containerRef = useTradingViewWidget({
    scriptUrl,
    config,
    sectors,
    height,
    renderMode,
    elementName,
  });

  return (
    <section className={`block w-full ${className}`}>
      {title && <h2 className={titleClassName}>{title}</h2>}
      <div
        ref={containerRef}
        className="w-full"
        style={{ width: "100%", minHeight: `${height}px` }}
      />
    </section>
  );
}

export default memo(TradingViewWidgets);
