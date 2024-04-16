import useMousePosition from "@/utils/useMousePosition";

export default function Landing() {
  // const { x, y } = useMousePosition();

  return (
    <>
      <h1 className="text-lg font-bold">About</h1>

      <p>Hi, my name is Thee. I'm a full-stack developer based in Bangkok, Thailand.</p>

      {/* spawn a circle around the mouse */}
      {/* {x && y && (
        <div
          className="absolute h-4 w-4 rounded-full bg-white"
          style={{
            top: y - 2,
            left: x - 2,
          }}
        />
      )} */}
    </>
  );
}
