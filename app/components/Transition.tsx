export function Transition() {
  return (
    <div
      aria-hidden
      className="relative h-40 md:h-56 w-full -mt-px -mb-px"
      style={{
        background:
          "linear-gradient(to bottom, #0D1A2A 0%, #0A1628 45%, #050B14 80%, #000000 100%)",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,155,60,0.06)_0%,transparent_70%)]" />
    </div>
  );
}
