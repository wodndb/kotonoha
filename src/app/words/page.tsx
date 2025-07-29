import { getWords } from "@/data/word";
import { ColumnDef } from "@tanstack/react-table";
import { Word } from "../generated/prisma";
import { DataTable } from "./components/data-table";
import { Button } from "@/components/ui/button";
import { AddWordDialog } from "./components/add-word-dialog";

const columns: ColumnDef<Word>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "text",
    header: "Word",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
];

export default async function Page() {
  const words = await getWords();

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Words</h1>
        <Button asChild>
          <AddWordDialog />
        </Button>
      </div>
      <DataTable columns={columns} data={words} />
    </div>
  );
}
