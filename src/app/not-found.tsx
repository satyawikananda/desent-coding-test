import { NotFoundGlitch } from "@/components/base/app-not-found";

export default function NotFound(){
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center gap-4">
      <NotFoundGlitch />
    </div>
  )
}