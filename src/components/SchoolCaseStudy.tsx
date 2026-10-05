import type { Project } from "@/data/projects";

/** Unfilled fields remain undefined in the data, never visible placeholders. */
export function SchoolCaseStudy({ project }: { project: Project }) {
  const content = project.caseStudy;
  if (!content) return null;
  const assistant =
    content.aiAssistant?.filter(
      (detail) => detail.title.trim() && detail.text.trim(),
    ) ?? [];
  const nextSteps = [
    { title: "CIS Passport", text: content.nextSteps?.cisPassport },
    {
      title: "Teacher AI training",
      text: content.nextSteps?.teacherAiTraining,
    },
  ].filter((step) => step.text?.trim());

  return (
    <>
      {content.problem?.trim() && (
        <section>
          <h2>The problem</h2>
          <p>{content.problem}</p>
        </section>
      )}
      <section>
        <h2>What I built</h2>
        <p>{project.approach}</p>
        <ul className="case-scope">
          {project.scope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {project.details.map((detail) => (
          <div key={detail.title}>
            <h3>{detail.title}</h3>
            <p>{detail.text}</p>
          </div>
        ))}
      </section>
      {assistant.length > 0 && (
        <section>
          <h2>How the AI assistant works</h2>
          {assistant.map((detail) => (
            <div key={detail.title}>
              <h3>{detail.title}</h3>
              <p>{detail.text}</p>
            </div>
          ))}
        </section>
      )}
      {(content.results?.trim() || content.measurableResult?.trim()) && (
        <section className="case-delivery">
          <h2>Results</h2>
          {content.results?.trim() && <p>{content.results}</p>}
          {content.measurableResult?.trim() && (
            <p>{content.measurableResult}</p>
          )}
        </section>
      )}
      {content.privacyAndSafety?.trim() && (
        <section>
          <h2>Privacy and safety</h2>
          <p>{content.privacyAndSafety}</p>
        </section>
      )}
      {nextSteps.length > 0 && (
        <section>
          <h2>What&apos;s next</h2>
          {nextSteps.map((step) => (
            <div key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
