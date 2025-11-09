import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

type Props = {
  params: { slug: string[] }; 
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  
  const queryClient = new QueryClient();
  const queryKey = ["notes", "", 1, tag];

  await queryClient.prefetchQuery({
    queryKey: queryKey,
    queryFn: () => fetchNotes("", 1, tag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;