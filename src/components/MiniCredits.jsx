/* global __BUILD_YEAR__ */
export default function MiniCredits() {
  return (
    <footer className="mini-credits">
      <span id="credits">
        Photography by Zachary Aumen · Fonts via Google Fonts · Icons adapted from open-source SVG sets
      </span>
      <span id="copyright">{`© Max Klot ${__BUILD_YEAR__}`}</span>
    </footer>
  )
}
