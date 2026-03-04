import { Link, useLocation } from 'react-router-dom';
import { Home, Heart, History, Users, Sun, Moon, Menu } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/track', label: 'Track Mood', icon: Heart },
  { path: '/social', label: 'Social', icon: Users },
  { path: '/history', label: 'History', icon: History },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [sheetOpen, setSheetOpen] = useState(false);

  const navLinkClass = (path: string) =>
    cn(
      'flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px]',
      location.pathname === path
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
    );

  return (
    <div className="min-h-screen bg-background min-h-[100dvh]">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 pt-[env(safe-area-inset-top)]">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="flex items-center justify-between h-14 min-h-[44px]">
            <Link
              to="/home"
              className="text-lg font-semibold text-foreground tracking-tight py-2 min-w-[44px] min-h-[44px] flex items-center"
              aria-label="MoodTrack Home"
            >
              <span className="text-primary">Mood</span>Track
            </Link>

            {/* Desktop nav: visible from md */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] items-center',
                    location.pathname === path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              ))}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 min-h-[44px] min-w-[44px]"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label={
                  theme === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                }
              >
                <span className="relative flex h-4 w-4 items-center justify-center">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </span>
              </Button>
            </div>

            {/* Mobile: hamburger + theme toggle */}
            <div className="flex md:hidden items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 min-h-[44px] min-w-[44px]"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label={
                  theme === 'dark'
                    ? 'Switch to light mode'
                    : 'Switch to dark mode'
                }
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </span>
              </Button>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 min-h-[44px] min-w-[44px]"
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-1 mt-6">
                    {navItems.map(({ path, label, icon: Icon }) => (
                      <Link
                        key={path}
                        to={path}
                        className={navLinkClass(path)}
                        onClick={() => setSheetOpen(false)}
                      >
                        <Icon size={20} />
                        {label}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {children}
      </main>
    </div>
  );
};

export default Layout;
