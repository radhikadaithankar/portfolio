import Image from "next/image";

export function CISAppScreens({ priority = false }: { priority?: boolean }) {
  return (
    <div className="cis-app-screens">
      <figure>
        <Image
          src="/images/eve-teacher-home.webp"
          width={520}
          height={1125}
          alt="Eve Compass teacher home on an iPhone: check-in, the class happening now, a shortcut to take attendance, and today's briefing with periods and homework"
          sizes="(max-width: 600px) 36vw, 240px"
          preload={priority}
        />
        <figcaption>Teacher view</figcaption>
      </figure>
      <figure>
        <Image
          src="/images/eve-parent-home.webp"
          width={520}
          height={1125}
          alt="Eve Compass parent home on an iPhone: the class happening now, homework to review, attendance, homework and fees, and an insight from the assistant"
          sizes="(max-width: 600px) 36vw, 240px"
          preload={priority}
        />
        <figcaption>Parent view</figcaption>
      </figure>
    </div>
  );
}
