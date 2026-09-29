import Image from "next/image";

export function CISAppScreens({ priority = false }: { priority?: boolean }) {
  return (
    <div className="cis-app-screens">
      <figure>
        <Image
          src="/images/cis-teacher-preview.png"
          width={404}
          height={804}
          alt="CIS Compass public teacher app preview showing the class overview and daily briefing"
          sizes="(max-width: 600px) 36vw, 240px"
          preload={priority}
        />
        <figcaption>Teacher view</figcaption>
      </figure>
      <figure>
        <Image
          src="/images/cis-parent-preview.png"
          width={404}
          height={804}
          alt="CIS Compass public parent app preview showing attendance, homework and fees"
          sizes="(max-width: 600px) 36vw, 240px"
          preload={priority}
        />
        <figcaption>Parent view</figcaption>
      </figure>
    </div>
  );
}
