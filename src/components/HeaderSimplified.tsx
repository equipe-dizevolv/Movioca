import { Bell, Sun, Moon, User, LogOut } from "lucide-react@0.487.0";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth } from "../contexts/AuthContext";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface HeaderSimplifiedProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  title: string;
  userName?: string;
  userRole?: string;
  onLogout?: () => void;
}

export default function HeaderSimplified({
  darkMode,
  onToggleDarkMode,
  title,
  userName,
  userRole,
  onLogout,
}: HeaderSimplifiedProps) {
  const { currentUser, logout } = useAuth();

  // Usa props se fornecidas, senão usa do AuthContext
  const displayName = userName || currentUser?.name || "Usuário";
  const displayRole = userRole || currentUser?.role || "Portal";
  const handleLogout = onLogout || logout;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="bg-white dark:bg-[#1E1746] border-b border-border px-3 md:px-6 h-16 flex items-center">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-sm md:text-2xl text-foreground">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-foreground dark:text-white hover:bg-secondary">
                <Bell className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  0
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-3 py-8 text-center text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma notificação no momento</p>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="text-foreground dark:text-white hover:bg-secondary"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* User Menu - Sem troca de perfil */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 md:gap-3 hover:bg-secondary rounded-full px-2 md:px-3 py-2 h-auto">
                <Avatar className="h-8 w-8 md:h-9 md:w-9">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs md:text-sm">
                    {getInitials(displayName)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm text-foreground">
                    {displayName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {displayRole}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <div className="px-3 py-3">
                <p className="text-sm font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{displayRole}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 hover:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}