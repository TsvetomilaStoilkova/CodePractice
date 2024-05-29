import CoreConcept from "./CoreConcept/CoreConcept";
import { CORE_CONCEPTS } from "../data";
import Section from "../components/Section"

export default function CoreConcepts() {
  return (
    <Section id="core-concepts">
      <h2>Core Concepts</h2>

      <ul>
        {CORE_CONCEPTS.map((conceptItem) => (
          <CoreConcept key={conceptItem.title} {...conceptItem} />
        ))}
      </ul>
    </Section>
  );
}
