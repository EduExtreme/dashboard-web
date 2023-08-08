import { LogOut } from 'lucide-react'

export function Profile() {
  return (
    <div className="grid items-center gap-3 ">
      <img
        src="https://github.com/eduextreme.png"
        className="h-10 w-10 rounded-full"
        alt=""
      />

      <div className="flex flex-1 flex-col truncate">
        <span className="text-sm font-semibold text-zinc-700">
          Eduardo André
        </span>
        <span className="truncate text-sm text-zinc-500">
          AAAAAedugexp@gmail.com
        </span>
      </div>
      <button type="button" className="ml-auto rounded p-2 hover:bg-violet-100">
        <LogOut className="h-5 w-5  text-zinc-500" />
      </button>
    </div>
  )
}
