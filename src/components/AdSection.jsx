import { useEffect } from "react";

/**
 * AdSection - A professional wrapper for manual AdSense units.
 * Place this between major sections to ensure ads don't overlap content.
 */
export default function AdSection() {
  useEffect(() => {
    try {
      // Push the ad to the window object for initialization
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="w-full bg-light-50 py-12 border-t border-b border-light-200">
      <div className="container-custom flex flex-col items-center">
        {/* Label to keep it professional */}
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em] mb-4">
          Advertisement
        </span>

        {/* Ad Container */}
        <div className="w-full max-w-4xl min-h-[100px] overflow-hidden flex justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%" }}
            data-ad-client="ca-pub-8993642773275667"
            data-ad-slot="7512464015"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
}
