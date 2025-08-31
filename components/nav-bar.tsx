import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/mode-toggle";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg py-5">
      <div className="mx-auto w-full max-w-3xl flex justify-between items-end gap-2 px-2">
        <Link
          href="/"
          className="text-lg sm:text-2xl lg:text-3xl font-bold font-title"
        >
          Seeking the Tao of
          <br />
          Programming
        </Link>

        <div className="flex gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="flex items-center gap-2">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/posts">posts</Link>
                </NavigationMenuLink>
                <ModeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}
