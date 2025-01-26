//On this page, lies the logic of the Home page.
import Calendar from "./components/Calendar";
import { getServices } from "./components/Services";
import PayForm from "./components/PayForm";

export default function Page() {
  return (
    <div>
     <Calendar/>
     {getServices()}

     <PayForm/>
    </div>
  );
}