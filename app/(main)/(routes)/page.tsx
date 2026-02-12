import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className= "text-white p-10 text-3xl">
     <UserButton afterSignOutUrl="/sign-in" />
     <ModeToggle/>
    </div>
  );
}
