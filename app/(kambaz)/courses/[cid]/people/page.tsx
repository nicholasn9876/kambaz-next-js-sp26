import { redirect } from "next/navigation";
export default function People() {
  // Added so that the data-driven course navigation is functional without hard-coding the people/table edge case
  redirect("./people/table");
}