"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, subscribeMotion } from "@/lib/motion-preference";
import type { ProjectMedia as Media } from "@/data/projects";

/** Source loading and automatic playback start only when the clip is visible. */
export function ProjectVideo({ media }: { media: Media }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let visible = false;
    let loaded = false;
    let userPaused = false;

    function syncPlayback() {
      if (!video) return;
      if (!visible || document.hidden || prefersReducedMotion()) {
        video.pause();
        return;
      }
      if (!userPaused)
        void video.play().catch(() => {
          // Autoplay may be blocked. Native controls still allow manual playback.
        });
    }
    function rememberPause() {
      if (visible && !document.hidden && !prefersReducedMotion())
        userPaused = true;
    }
    function rememberPlay() {
      userPaused = false;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !loaded) {
          loaded = true;
          video.src = media.src;
          video.load();
        }
        syncPlayback();
      },
      { threshold: 0.15 },
    );

    observer.observe(video);
    const unsubscribe = subscribeMotion(syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    video.addEventListener("pause", rememberPause);
    video.addEventListener("play", rememberPlay);
    return () => {
      observer.disconnect();
      unsubscribe();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.removeEventListener("pause", rememberPause);
      video.removeEventListener("play", rememberPlay);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [media.src]);

  return (
    <video
      ref={ref}
      className="project-media-frame"
      poster={media.poster}
      aria-label={media.alt}
      muted
      loop
      playsInline
      controls
      preload="none"
    />
  );
}

function ProjectGif({ media }: { media: Media }) {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let visible = false;
    function syncPlayback() {
      setPlaying(
        visible &&
          !document.hidden &&
          !prefersReducedMotion() &&
          !userPaused.current,
      );
    }
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        syncPlayback();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    const unsubscribe = subscribeMotion(syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      unsubscribe();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [media.src]);

  return (
    <>
      <div ref={ref} className="project-media-frame project-gif-frame">
        <Image
          src={playing ? media.src : media.poster}
          alt={media.alt}
          fill
          unoptimized
          sizes="(max-width: 850px) 100vw, 50vw"
        />
      </div>
      <button
        type="button"
        className="text-link"
        aria-label={`${playing ? "Pause" : "Play"} animation: ${media.alt}`}
        onClick={() => {
          userPaused.current = playing;
          setPlaying(!playing);
        }}
      >
        {playing ? "Pause animation" : "Play animation"}
      </button>
    </>
  );
}

export function ProjectMedia({ media }: { media?: Media }) {
  if (!media?.src.trim() || !media.poster.trim() || !media.alt.trim())
    return null;
  return (
    <figure className="project-media">
      {media.type === "video" ? (
        <ProjectVideo media={media} />
      ) : (
        <ProjectGif media={media} />
      )}
      {media.caption?.trim() && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}
