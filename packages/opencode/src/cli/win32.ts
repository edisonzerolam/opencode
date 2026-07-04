import { dlopen, FFIType } from "bun:ffi"

export const win32 = dlopen("kernel32.dll", {
  FreeConsole: { args: [], returns: "bool" as FFIType },
  GetCurrentProcess: { args: [], returns: "i64" as FFIType },
  TerminateProcess: { args: ["i64" as FFIType, "u32" as FFIType], returns: "bool" as FFIType },
})

const NULL = 0n

export function win32FreeConsole(): boolean {
  return !!win32.symbols.FreeConsole(NULL)
}

export function win32TerminateSelf(exitCode = 0): void {
  const hProcess = win32.symbols.GetCurrentProcess(NULL)
  win32.symbols.TerminateProcess(hProcess, exitCode)
}