import Container from "../../components/Container/Container";
import WeekSelector from "../../components/journey/WeekSelector/WeekSelector";
import JourneyDetails from "../../components/journey/JourneyDetails/JourneyDetails";
import { getPublicWeekInfo } from "@/lib/api/clientApi";
import GreetingBlock from "../../components/GreetingBlock/GreetingBlock";

export default async function JourneyPage() {
  const weeks = await getPublicWeekInfo();
  console.log("weeks:", weeks);
  return (
    <>
      <Container>
        <GreetingBlock />
      </Container>
      <WeekSelector />
      <Container>
        <JourneyDetails />
      </Container>
    </>
  );
}
