import Container from "../../components/Container/Container";
import Greating from "../../components/GreatingBlock/GreetingBlock";
import WeekSelector from "../../components/journey/WeekSelector/WeekSelector";
import JourneyDetails from "../../components/journey/JourneyDetails/JourneyDetails";
import { getPublicWeekInfo } from "@/lib/api/clientApi";

export default async function JourneyPage() {
  const weeks = await getPublicWeekInfo();
  console.log("weeks:", weeks);
  return (
    <>
      <Container>
        <Greating />
      </Container>
      <WeekSelector />
      <Container>
        <JourneyDetails />
      </Container>
    </>
  );
}
