import Container from "@/components/Container/Container";
import { DiaryEntryDetails } from "@/components/DiaryEntryDetails/DiaryEntryDetails";
import { getDiaryEntries } from "@/lib/api/diary";


type DiaryEntryPageProps = {
    params: {
        entryId: string;
    }
} 

export default async function DiaryEntryPage({ params }: DiaryEntryPageProps) {
  const { entryId } = params;

  const entries = await getDiaryEntries();
  const selectedCardDetails = entries.find((entry) => entry._id === entryId);

  return (
    <Container>
      <p>Header</p>
      <p>Diary Header</p>
      <p>GreetingBlock</p>
      <DiaryEntryDetails selectedCardDetails={selectedCardDetails} />
    </Container>
  );
}