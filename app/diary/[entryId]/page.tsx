import DiaryEntryPageClient from "./DiaryEntryPage.client";

type DiaryEntryPageProps = {
    params: {
        entryId: string;
    }
} 

export default async function DiaryEntryPage({ params }: DiaryEntryPageProps) {

  const { entryId } = await params;

  return <DiaryEntryPageClient entryId={entryId} />
}