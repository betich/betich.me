import useMousePosition from "@/utils/useMousePosition";

export default function Landing() {
  const { x, y } = useMousePosition();

  return (
    <main className="bg-primary cursor-none relative text-white p-20 min-h-screen w-full flex flex-col gap-4">
      <h1 className="font-bold text-4xl">hi</h1>

      {/* spawn a circle around the mouse */}
      {x && y && (
        <div
          className="absolute w-4 h-4 bg-white rounded-full"
          style={{
            top: y - 2,
            left: x - 2,
          }}
        />
      )}
    </main>
  );
}
