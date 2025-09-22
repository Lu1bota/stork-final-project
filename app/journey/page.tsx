import Container from "../../components/Container/Container";
import Greating from "../../components/GreatingBlock/GreetingBlock";
import WeekSelector from "../../components/WeekSelector/WeekSelector";
import JourneyDetails from "../../components/JourneyDetails/JourneyDetails";
import { getWeeks } from "@/lib/api/api";

export default async function JourneyPage() {
  const weeks = await getWeeks();
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
