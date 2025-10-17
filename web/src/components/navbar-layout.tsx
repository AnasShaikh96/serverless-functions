// "use client"
// import { Menu, Moon, Sun, User } from "lucide-react"
// import { useTheme } from "next-themes"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// interface NavbarProps {
//   onMenuClick: () => void
//   isMobile: boolean
// }

// export function Navbar({ onMenuClick, isMobile }: NavbarProps) {
//   const { setTheme, theme } = useTheme()

//   return (
//     <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="flex h-16 items-center px-4">
//         {/* Mobile hamburger menu */}
//         {isMobile && (
//           <Button variant="ghost" size="icon" className="mr-3 md:hidden" onClick={onMenuClick}>
//             <Menu className="h-5 w-5" />
//             <span className="sr-only">Toggle menu</span>
//           </Button>
//         )}

//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
//             <span className="text-sm font-bold">D</span>
//           </div>
//           <span className="hidden font-bold sm:inline-block">Dashboard</span>
//         </div>

//         {/* Spacer */}
//         <div className="flex-1" />

//         {/* Right side controls */}
//         <div className="flex items-center space-x-2">
//           {/* Theme toggle */}
//           <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
//             <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//             <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//             <span className="sr-only">Toggle theme</span>
//           </Button>

//           {/* User dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="/diverse-user-avatars.png" alt="User" />
//                   <AvatarFallback>JD</AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">John Doe</p>
//                   <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <span>Settings</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   )
// }
