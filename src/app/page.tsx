import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <p>This is sample page</p>
      <p>이것은 샘플 페이지입니다</p>
      <p>これはサンプルページです</p>
      <Button
        onClick={async () => {
          "use server";
          await signOut({
            redirect: true,
            redirectTo: "/login",
          });
        }}
      >
        Sign Out
      </Button>
    </div>
  );
}
